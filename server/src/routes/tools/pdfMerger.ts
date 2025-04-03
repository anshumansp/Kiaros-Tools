import { Router } from 'express';
import multer from 'multer';
import { PDFMergerController } from '../../tools/pdfMerger';
import { verifyToken } from '../../middleware/auth';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });
const controller = new PDFMergerController();

/**
 * @swagger
 * /api/tools/pdf-merger/merge:
 *   post:
 *     tags: [Tools]
 *     summary: Merge multiple PDF files
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: PDF files to merge
 *     responses:
 *       200:
 *         description: PDFs merged successfully
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post('/merge', verifyToken, upload.array('files'), controller.mergePDFs.bind(controller));

export default router; 