import { Router } from 'express';
import { body } from 'express-validator';
import { PaymentController } from '../controllers/payment';
import { authMiddleware } from '../middleware/auth';

const router = Router();
const paymentController = new PaymentController();

/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Payment processing operations
 */

/**
 * @swagger
 * /api/payment/create-payment-intent:
 *   post:
 *     summary: Create a payment intent
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - currency
 *               - description
 *             properties:
 *               amount:
 *                 type: number
 *                 description: Amount in cents (e.g., 1000 for $10.00)
 *               currency:
 *                 type: string
 *                 default: usd
 *                 enum: [usd, eur, gbp]
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Payment intent created successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Not authenticated
 */
router.post(
  '/create-payment-intent',
  authMiddleware,
  [
    body('amount').isNumeric().withMessage('Amount must be a number'),
    body('currency').isIn(['usd', 'eur', 'gbp']).withMessage('Currency must be one of: usd, eur, gbp'),
    body('description').trim().isLength({ min: 3 }).withMessage('Description must be at least 3 characters')
  ],
  paymentController.createPaymentIntent
);

/**
 * @swagger
 * /api/payment/subscription:
 *   post:
 *     summary: Create a subscription
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - priceId
 *               - customerId
 *             properties:
 *               priceId:
 *                 type: string
 *                 description: Stripe Price ID
 *               customerId:
 *                 type: string
 *                 description: Stripe Customer ID
 *     responses:
 *       200:
 *         description: Subscription created successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Not authenticated
 */
router.post(
  '/subscription',
  authMiddleware,
  [
    body('priceId').notEmpty().withMessage('Price ID is required'),
    body('customerId').notEmpty().withMessage('Customer ID is required')
  ],
  paymentController.createSubscription
);

/**
 * @swagger
 * /api/payment/webhook:
 *   post:
 *     summary: Handle Stripe webhook events
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Webhook processed successfully
 *       400:
 *         description: Invalid webhook payload
 */
router.post('/webhook', paymentController.handleWebhook);

/**
 * @swagger
 * /api/payment/customer:
 *   post:
 *     summary: Create or get a Stripe customer
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: Customer created/retrieved successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Not authenticated
 */
router.post(
  '/customer',
  authMiddleware,
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('name').optional().isString().withMessage('Name must be a string')
  ],
  paymentController.createCustomer
);

export default router; 