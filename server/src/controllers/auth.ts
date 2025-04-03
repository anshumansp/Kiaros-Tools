import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import { pool } from '../config/database';
import { BaseController } from './base';

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

interface User {
  id: number;
  email: string;
  name: string;
  role: string;
}

export class AuthController extends BaseController {
  /**
   * Register a new user
   */
  public register = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, name } = req.body;

    try {
      // Check if user already exists
      const userExists = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
      );

      if (userExists.rows.length > 0) {
        return res.status(409).json({ message: 'User already exists' });
      }

      // Hash password
      // In a real app, you should use bcrypt to hash the password
      // For simplicity, we're not implementing that here
      
      // Create user in database
      const result = await pool.query(
        'INSERT INTO users (email, password, name, role) VALUES ($1, $2, $3, $4) RETURNING id, email, name, role',
        [email, password, name, 'user']
      );

      const user = result.rows[0];

      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET || 'your_jwt_secret',
        { expiresIn: '24h' }
      );

      res.status(201).json({
        message: 'User registered successfully',
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        }
      });
    } catch (error) {
      console.error('Registration error:', error);
      return this.handleError(res, 500, 'Server error during registration');
    }
  };

  /**
   * Login with email and password
   */
  public login = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Find user
      const result = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
      );

      if (result.rows.length === 0) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const user = result.rows[0];

      // In a real app, compare password with bcrypt
      // For simplicity, we're doing a direct comparison
      if (user.password !== password) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET || 'your_jwt_secret',
        { expiresIn: '24h' }
      );

      res.status(200).json({
        message: 'Login successful',
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      return this.handleError(res, 500, 'Server error during login');
    }
  };

  /**
   * Login or register with Google OAuth
   */
  public googleAuth = async (req: Request, res: Response) => {
    const { idToken } = req.body;

    try {
      // Verify Google token
      const ticket = await googleClient.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID
      });

      const payload = ticket.getPayload();
      if (!payload) {
        return res.status(401).json({ message: 'Invalid Google token' });
      }

      const { email, name, sub } = payload;

      // Check if user exists
      const userResult = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
      );

      let user;

      if (userResult.rows.length === 0) {
        // User doesn't exist, create a new one
        const newUserResult = await pool.query(
          'INSERT INTO users (email, google_id, name, role) VALUES ($1, $2, $3, $4) RETURNING id, email, name, role',
          [email, sub, name, 'user']
        );
        user = newUserResult.rows[0];
      } else {
        // User exists
        user = userResult.rows[0];
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET || 'your_jwt_secret',
        { expiresIn: '24h' }
      );

      res.status(200).json({
        message: 'Login successful',
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        }
      });
    } catch (error) {
      console.error('Google auth error:', error);
      return this.handleError(res, 500, 'Server error during Google authentication');
    }
  };

  /**
   * Get current user profile
   */
  public getCurrentUser = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).userId;

      const result = await pool.query(
        'SELECT id, email, name, role FROM users WHERE id = $1',
        [userId]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      const user = result.rows[0];

      res.status(200).json({
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        }
      });
    } catch (error) {
      console.error('Get current user error:', error);
      return this.handleError(res, 500, 'Server error while fetching user profile');
    }
  };

  /**
   * Logout user
   */
  public logout = (req: Request, res: Response) => {
    // JWT is stateless, so we just return success
    // In a real app, you might want to add the token to a blocklist
    res.status(200).json({ message: 'Logout successful' });
  };
} 