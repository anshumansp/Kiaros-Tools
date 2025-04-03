import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import { rateLimit } from 'express-rate-limit';
import hpp from 'hpp';
import dotenv from 'dotenv';

// Import configurations - fix import errors with try/catch blocks
import { checkDatabaseConnection, initializeDatabase } from './config/database';
import { swaggerSpec } from './config/swagger';

// Load environment variables
dotenv.config();

// Create Express application
const app = express();

// Security middleware
app.use(helmet());
app.use(cors());
app.use(hpp());

// Logging middleware
app.use(morgan('dev'));

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window`
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: 'Too many requests from this IP, please try again later',
});

// Apply rate limiting to all API endpoints
app.use('/api', apiLimiter);

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Setup Swagger documentation (if available)
try {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
} catch (error) {
  console.warn('Failed to setup Swagger documentation:', error);
}

// Mount routes - handle potential missing routes
try {
  // Import routes dynamically to avoid errors if they don't exist yet
  const authRoutes = require('./routes/auth').default;
  const toolsRoutes = require('./routes/tools').default;
  const paymentRoutes = require('./routes/payment').default;

  if (authRoutes) app.use('/api/auth', authRoutes);
  if (toolsRoutes) app.use('/api/tools', toolsRoutes);
  if (paymentRoutes) app.use('/api/payment', paymentRoutes);
} catch (error) {
  console.warn('Failed to load some routes:', error);
  console.warn('Some API endpoints may not be available');
}

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ 
    message: 'Route not found',
    path: req.originalUrl
  });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Server error:', err);
  
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  
  res.status(statusCode).json({
    message: process.env.NODE_ENV === 'production' 
      ? 'An unexpected error occurred' 
      : err.message,
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
  });
});

// Start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Try to connect to database but don't fail if it's not available
    let dbConnected = false;
    try {
      dbConnected = await checkDatabaseConnection();
      
      if (dbConnected) {
        // Initialize database tables
        await initializeDatabase();
        console.log('Database connected and initialized successfully');
      } else {
        console.warn('Database connection failed. Starting server without database functionality.');
      }
    } catch (dbError) {
      console.warn('Error checking database connection:', dbError);
      console.warn('Starting server without database functionality.');
    }
    
    // Start server regardless of database connection
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`API Documentation available at http://localhost:${PORT}/api-docs`);
      
      if (!dbConnected) {
        console.warn('⚠️ Running with limited functionality - database connection failed');
      }
    });
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
};

startServer(); 