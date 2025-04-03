import { Router } from 'express';
import { body } from 'express-validator';
import { ResumeMakerController } from '../../tools/resumeMaker';
import { authMiddleware } from '../../middleware/auth';

const router = Router();
const resumeMakerController = new ResumeMakerController();

/**
 * @swagger
 * tags:
 *   name: Resume Maker
 *   description: Resume generation tool
 */

/**
 * @swagger
 * /api/tools/resume-maker/templates:
 *   get:
 *     summary: Get available resume templates
 *     tags: [Resume Maker]
 *     responses:
 *       200:
 *         description: List of available templates
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 templates:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       thumbnail:
 *                         type: string
 *                       description:
 *                         type: string
 */
router.get('/templates', resumeMakerController.getTemplates);

/**
 * @swagger
 * /api/tools/resume-maker/generate:
 *   post:
 *     summary: Generate a resume in PDF format
 *     tags: [Resume Maker]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - resumeData
 *               - template
 *             properties:
 *               resumeData:
 *                 type: object
 *                 required:
 *                   - personalInfo
 *                   - summary
 *                   - workExperience
 *                   - education
 *                   - skills
 *                 properties:
 *                   personalInfo:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       email:
 *                         type: string
 *                       phone:
 *                         type: string
 *                       location:
 *                         type: string
 *                       website:
 *                         type: string
 *                       linkedin:
 *                         type: string
 *                       github:
 *                         type: string
 *                   summary:
 *                     type: string
 *                   workExperience:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         title:
 *                           type: string
 *                         company:
 *                           type: string
 *                         location:
 *                           type: string
 *                         startDate:
 *                           type: string
 *                         endDate:
 *                           type: string
 *                         description:
 *                           type: array
 *                           items:
 *                             type: string
 *                   education:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         degree:
 *                           type: string
 *                         institution:
 *                           type: string
 *                         location:
 *                           type: string
 *                         graduationDate:
 *                           type: string
 *                         gpa:
 *                           type: string
 *                         achievements:
 *                           type: array
 *                           items:
 *                             type: string
 *                   skills:
 *                     type: array
 *                     items:
 *                       type: string
 *                   projects:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         title:
 *                           type: string
 *                         description:
 *                           type: string
 *                         technologies:
 *                           type: array
 *                           items:
 *                             type: string
 *                         link:
 *                           type: string
 *                   certifications:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                         issuer:
 *                           type: string
 *                         date:
 *                           type: string
 *               template:
 *                 type: string
 *                 enum: [modern, professional, minimal, creative]
 *     responses:
 *       200:
 *         description: Resume generated successfully
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: Invalid resume data
 *       401:
 *         description: Not authenticated
 */
router.post(
  '/generate',
  authMiddleware,
  [
    body('resumeData').notEmpty().withMessage('Resume data is required'),
    body('template').isIn(['modern', 'professional', 'minimal', 'creative']).withMessage('Valid template is required')
  ],
  resumeMakerController.generateResume
);

export default router; 