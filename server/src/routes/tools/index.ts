import { Router } from 'express';
import pdfMergerRoutes from './pdfMerger';
import resumeMakerRoutes from './resumeMaker';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Tools
 *   description: Various utility tools
 */

// PDF Merger routes
router.use('/pdf-merger', pdfMergerRoutes);

// Resume Maker routes
router.use('/resume-maker', resumeMakerRoutes);

// Add additional tool routes here as they are developed
// Example: router.use('/text-translator', textTranslatorRoutes);

export default router;