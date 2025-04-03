import { Request, Response } from 'express';
import { BaseController } from '../controllers/base';
import { PDFDocument } from 'pdf-lib';

interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}

interface MulterRequest extends Request {
  files?: MulterFile[];
}

export class PDFMergerController extends BaseController {
  protected async validateRequest(req: MulterRequest): Promise<boolean> {
    if (!req.files || !Array.isArray(req.files)) {
      throw new Error('No PDF files uploaded');
    }

    if (req.files.length < 2) {
      throw new Error('At least two PDF files are required');
    }

    // Validate file types
    for (const file of req.files) {
      if (!file.mimetype || file.mimetype !== 'application/pdf') {
        throw new Error('Invalid file type. Only PDF files are allowed');
      }
    }

    return true;
  }

  protected async executeRequest(req: MulterRequest): Promise<Buffer> {
    try {
      const mergedPdf = await PDFDocument.create();

      for (const file of req.files!) {
        const pdfBytes = file.buffer;
        const pdf = await PDFDocument.load(pdfBytes);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedPdfBuffer = await mergedPdf.save();
      return Buffer.from(mergedPdfBuffer);
    } catch (error) {
      console.error('Error merging PDFs:', error);
      throw new Error('Failed to merge PDF files');
    }
  }

  public async mergePDFs(req: MulterRequest, res: Response) {
    return this.handleRequest(req, res, () => this.executeRequest(req));
  }
} 