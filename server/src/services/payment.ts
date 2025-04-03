import Stripe from 'stripe';
import { PaymentStatus } from '../types/payment';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

export class PaymentService {
  private static instance: PaymentService;

  private constructor() {}

  public static getInstance(): PaymentService {
    if (!PaymentService.instance) {
      PaymentService.instance = new PaymentService();
    }
    return PaymentService.instance;
  }

  async createPaymentIntent(amount: number, currency: string = 'usd'): Promise<string> {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency,
        automatic_payment_methods: {
          enabled: true,
        },
      });

      return paymentIntent.client_secret!;
    } catch (error) {
      console.error('Error creating payment intent:', error);
      throw new Error('Payment initialization failed');
    }
  }

  async createSubscription(customerId: string, priceId: string): Promise<string> {
    try {
      const subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [{ price: priceId }],
        payment_behavior: 'default_incomplete',
        expand: ['latest_invoice.payment_intent'],
      });

      return subscription.id;
    } catch (error) {
      console.error('Error creating subscription:', error);
      throw new Error('Subscription creation failed');
    }
  }

  async handleWebhook(event: Stripe.Event): Promise<PaymentStatus> {
    try {
      switch (event.type) {
        case 'payment_intent.succeeded':
          return {
            status: 'success',
            message: 'Payment successful',
            data: event.data.object,
          };

        case 'payment_intent.payment_failed':
          return {
            status: 'failed',
            message: 'Payment failed',
            data: event.data.object,
          };

        default:
          return {
            status: 'unknown',
            message: 'Unhandled event type',
            data: event.type,
          };
      }
    } catch (error) {
      console.error('Error handling webhook:', error);
      throw new Error('Webhook processing failed');
    }
  }

  async createCustomer(email: string, name: string): Promise<string> {
    try {
      const customer = await stripe.customers.create({
        email,
        name,
      });

      return customer.id;
    } catch (error) {
      console.error('Error creating customer:', error);
      throw new Error('Customer creation failed');
    }
  }
} 