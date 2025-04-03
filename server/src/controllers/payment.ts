import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import Stripe from 'stripe';
import { BaseController } from './base';
import { pool } from '../config/database';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

export class PaymentController extends BaseController {
  /**
   * Create a payment intent
   */
  public createPaymentIntent = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { amount, currency, description } = req.body;
      const userId = (req as any).userId;

      // Create a payment intent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: currency,
        description: description,
        metadata: {
          userId: userId.toString(),
        },
      });

      // Save payment intent to database
      await pool.query(
        'INSERT INTO payment_intents (user_id, stripe_id, amount, currency, status) VALUES ($1, $2, $3, $4, $5)',
        [userId, paymentIntent.id, amount, currency, paymentIntent.status]
      );

      res.status(200).json({
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      });
    } catch (error) {
      console.error('Payment intent creation error:', error);
      this.handleError(res, 500, 'Failed to create payment intent');
    }
  };

  /**
   * Create a subscription
   */
  public createSubscription = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { priceId, customerId } = req.body;
      const userId = (req as any).userId;

      // Create the subscription
      const subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [{ price: priceId }],
        payment_behavior: 'default_incomplete',
        expand: ['latest_invoice.payment_intent'],
      });

      // Save subscription to database
      await pool.query(
        'INSERT INTO subscriptions (user_id, stripe_id, status, price_id) VALUES ($1, $2, $3, $4)',
        [userId, subscription.id, subscription.status, priceId]
      );

      res.status(200).json({
        subscriptionId: subscription.id,
        clientSecret: (subscription.latest_invoice as any).payment_intent.client_secret,
      });
    } catch (error) {
      console.error('Subscription creation error:', error);
      this.handleError(res, 500, 'Failed to create subscription');
    }
  };

  /**
   * Handle Stripe webhook events
   */
  public handleWebhook = async (req: Request, res: Response) => {
    const sig = req.headers['stripe-signature'] as string;
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;

    try {
      // Verify webhook signature
      if (endpointSecret) {
        event = stripe.webhooks.constructEvent(
          (req as any).rawBody || req.body,
          sig,
          endpointSecret
        );
      } else {
        event = req.body;
      }

      // Handle the event
      switch (event.type) {
        case 'payment_intent.succeeded':
          await this.handlePaymentIntentSucceeded(event.data.object);
          break;
        case 'payment_intent.payment_failed':
          await this.handlePaymentIntentFailed(event.data.object);
          break;
        case 'customer.subscription.created':
        case 'customer.subscription.updated':
          await this.handleSubscriptionUpdated(event.data.object);
          break;
        case 'customer.subscription.deleted':
          await this.handleSubscriptionDeleted(event.data.object);
          break;
        default:
          console.log(`Unhandled event type ${event.type}`);
      }

      res.status(200).json({ received: true });
    } catch (error) {
      console.error('Webhook error:', error);
      this.handleError(res, 400, 'Webhook error');
    }
  };

  /**
   * Create or get a Stripe customer
   */
  public createCustomer = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, email } = req.body;
      const userId = (req as any).userId;

      // Check if user already has a Stripe customer ID
      const result = await pool.query(
        'SELECT stripe_customer_id FROM users WHERE id = $1',
        [userId]
      );

      const user = result.rows[0];
      let customerId = user?.stripe_customer_id;

      if (customerId) {
        // Customer exists, get customer data
        const customer = await stripe.customers.retrieve(customerId);
        res.status(200).json({ customerId, customer });
      } else {
        // Create a new customer
        const customer = await stripe.customers.create({
          name,
          email,
          metadata: {
            userId: userId.toString(),
          },
        });

        // Update user with customer ID
        await pool.query(
          'UPDATE users SET stripe_customer_id = $1 WHERE id = $2',
          [customer.id, userId]
        );

        res.status(200).json({ customerId: customer.id, customer });
      }
    } catch (error) {
      console.error('Customer creation error:', error);
      this.handleError(res, 500, 'Failed to create/retrieve customer');
    }
  };

  /**
   * Handle payment intent succeeded event
   */
  private async handlePaymentIntentSucceeded(
    paymentIntent: Stripe.PaymentIntent
  ) {
    try {
      // Update payment intent in database
      await pool.query(
        'UPDATE payment_intents SET status = $1 WHERE stripe_id = $2',
        ['succeeded', paymentIntent.id]
      );

      // Additional business logic here (e.g., create an order, activate a subscription)
      console.log(`Payment intent ${paymentIntent.id} succeeded`);
    } catch (error) {
      console.error('Error processing payment success:', error);
    }
  }

  /**
   * Handle payment intent failed event
   */
  private async handlePaymentIntentFailed(
    paymentIntent: Stripe.PaymentIntent
  ) {
    try {
      // Update payment intent in database
      await pool.query(
        'UPDATE payment_intents SET status = $1 WHERE stripe_id = $2',
        ['failed', paymentIntent.id]
      );

      console.log(`Payment intent ${paymentIntent.id} failed`);
    } catch (error) {
      console.error('Error processing payment failure:', error);
    }
  }

  /**
   * Handle subscription updated event
   */
  private async handleSubscriptionUpdated(
    subscription: Stripe.Subscription
  ) {
    try {
      // Update subscription in database
      await pool.query(
        'UPDATE subscriptions SET status = $1 WHERE stripe_id = $2',
        [subscription.status, subscription.id]
      );

      console.log(`Subscription ${subscription.id} updated to ${subscription.status}`);
    } catch (error) {
      console.error('Error updating subscription:', error);
    }
  }

  /**
   * Handle subscription deleted event
   */
  private async handleSubscriptionDeleted(
    subscription: Stripe.Subscription
  ) {
    try {
      // Update subscription in database
      await pool.query(
        'UPDATE subscriptions SET status = $1 WHERE stripe_id = $2',
        ['canceled', subscription.id]
      );

      console.log(`Subscription ${subscription.id} canceled`);
    } catch (error) {
      console.error('Error canceling subscription:', error);
    }
  }
} 