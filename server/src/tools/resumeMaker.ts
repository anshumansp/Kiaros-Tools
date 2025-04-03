import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { BaseController } from '../controllers/base';
import fs from 'fs';
import path from 'path';

interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
    website?: string;
    linkedin?: string;
    github?: string;
  };
  summary: string;
  workExperience: Array<{
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string[];
  }>;
  education: Array<{
    degree: string;
    institution: string;
    location: string;
    graduationDate: string;
    gpa?: string;
    achievements?: string[];
  }>;
  skills: string[];
  projects?: Array<{
    title: string;
    description: string;
    technologies: string[];
    link?: string;
  }>;
  certifications?: Array<{
    name: string;
    issuer: string;
    date: string;
  }>;
}

interface ResumeRequest extends Request {
  body: {
    resumeData: ResumeData;
    template: string;
  };
}

export class ResumeMakerController extends BaseController {
  protected async validateRequest(req: ResumeRequest): Promise<boolean> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new Error('Invalid resume data');
    }

    const { resumeData, template } = req.body;

    if (!resumeData || !resumeData.personalInfo || !resumeData.workExperience || !resumeData.education) {
      throw new Error('Missing required resume sections');
    }

    // Validate template
    const validTemplates = ['modern', 'professional', 'minimal', 'creative'];
    if (!validTemplates.includes(template)) {
      throw new Error('Invalid template selected');
    }

    return true;
  }

  protected async executeRequest(req: ResumeRequest): Promise<Buffer> {
    try {
      const { resumeData, template } = req.body;
      
      // In a real implementation, this would generate a PDF based on the template and data
      // For this example, we're using a simplified approach
      
      // Generate HTML from the resume data
      const html = this.generateResumeHTML(resumeData, template);
      
      // Convert HTML to PDF (in a real implementation, you'd use a library like puppeteer)
      // For this example, we're just returning the HTML as a buffer
      return Buffer.from(html);
    } catch (error) {
      console.error('Error generating resume:', error);
      throw new Error('Failed to generate resume');
    }
  }

  /**
   * Generate a resume in PDF format
   */
  public generateResume = async (req: Request, res: Response) => {
    return this.handleRequest(req as ResumeRequest, res, () => this.executeRequest(req as ResumeRequest));
  };

  /**
   * Get available resume templates
   */
  public getTemplates = async (req: Request, res: Response) => {
    try {
      // In a real implementation, you would fetch templates from a database or file system
      const templates = [
        {
          id: 'modern',
          name: 'Modern',
          thumbnail: '/images/templates/modern.png',
          description: 'A clean, modern resume template with a sidebar'
        },
        {
          id: 'professional',
          name: 'Professional',
          thumbnail: '/images/templates/professional.png',
          description: 'Traditional resume format suitable for corporate environments'
        },
        {
          id: 'minimal',
          name: 'Minimal',
          thumbnail: '/images/templates/minimal.png',
          description: 'Simple and straightforward design with minimal styling'
        },
        {
          id: 'creative',
          name: 'Creative',
          thumbnail: '/images/templates/creative.png',
          description: 'Bold design for creative professionals'
        },
      ];

      res.status(200).json({ templates });
    } catch (error) {
      console.error('Error fetching templates:', error);
      this.handleError(res, 500, 'Failed to fetch resume templates');
    }
  };

  /**
   * Generate HTML from resume data and template
   */
  private generateResumeHTML(resumeData: ResumeData, template: string): string {
    // In a real implementation, you would use a templating engine
    // or React server components to generate HTML
    
    // This is a simplified version
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${resumeData.personalInfo.name} - Resume</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
          }
          
          .template-${template} .header {
            text-align: center;
            margin-bottom: 20px;
          }
          
          .template-${template} h1 {
            color: #2a5885;
          }
          
          .template-${template} .section {
            margin-bottom: 20px;
          }
          
          .template-${template} .section-title {
            color: #2a5885;
            border-bottom: 1px solid #ddd;
            padding-bottom: 5px;
            margin-bottom: 10px;
          }
          
          .template-${template} .job {
            margin-bottom: 15px;
          }
          
          .template-${template} .job-header {
            display: flex;
            justify-content: space-between;
          }
          
          .template-${template} .job-title {
            font-weight: bold;
          }
          
          .template-${template} .job-company {
            font-style: italic;
          }
          
          .template-${template} ul {
            padding-left: 20px;
          }
          
          .template-${template} .skills {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
          }
          
          .template-${template} .skill {
            background-color: #f0f0f0;
            padding: 5px 10px;
            border-radius: 5px;
          }
        </style>
      </head>
      <body class="template-${template}">
        <div class="header">
          <h1>${resumeData.personalInfo.name}</h1>
          <p>
            ${resumeData.personalInfo.email} | 
            ${resumeData.personalInfo.phone} | 
            ${resumeData.personalInfo.location}
            ${resumeData.personalInfo.website ? ` | <a href="${resumeData.personalInfo.website}">${resumeData.personalInfo.website}</a>` : ''}
            ${resumeData.personalInfo.linkedin ? ` | <a href="${resumeData.personalInfo.linkedin}">LinkedIn</a>` : ''}
            ${resumeData.personalInfo.github ? ` | <a href="${resumeData.personalInfo.github}">GitHub</a>` : ''}
          </p>
        </div>
        
        <div class="section">
          <h2 class="section-title">Summary</h2>
          <p>${resumeData.summary}</p>
        </div>
        
        <div class="section">
          <h2 class="section-title">Work Experience</h2>
          ${resumeData.workExperience.map(job => `
            <div class="job">
              <div class="job-header">
                <span class="job-title">${job.title}</span>
                <span>${job.startDate} - ${job.endDate}</span>
              </div>
              <div class="job-company">${job.company}, ${job.location}</div>
              <ul>
                ${job.description.map(desc => `<li>${desc}</li>`).join('')}
              </ul>
            </div>
          `).join('')}
        </div>
        
        <div class="section">
          <h2 class="section-title">Education</h2>
          ${resumeData.education.map(edu => `
            <div class="job">
              <div class="job-header">
                <span class="job-title">${edu.degree}</span>
                <span>${edu.graduationDate}</span>
              </div>
              <div class="job-company">${edu.institution}, ${edu.location}</div>
              ${edu.gpa ? `<p>GPA: ${edu.gpa}</p>` : ''}
              ${edu.achievements ? `
                <ul>
                  ${edu.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                </ul>
              ` : ''}
            </div>
          `).join('')}
        </div>
        
        <div class="section">
          <h2 class="section-title">Skills</h2>
          <div class="skills">
            ${resumeData.skills.map(skill => `<span class="skill">${skill}</span>`).join('')}
          </div>
        </div>
        
        ${resumeData.projects ? `
          <div class="section">
            <h2 class="section-title">Projects</h2>
            ${resumeData.projects.map(project => `
              <div class="job">
                <div class="job-header">
                  <span class="job-title">${project.title}</span>
                  ${project.link ? `<a href="${project.link}">View Project</a>` : ''}
                </div>
                <p>${project.description}</p>
                <p><strong>Technologies:</strong> ${project.technologies.join(', ')}</p>
              </div>
            `).join('')}
          </div>
        ` : ''}
        
        ${resumeData.certifications ? `
          <div class="section">
            <h2 class="section-title">Certifications</h2>
            <ul>
              ${resumeData.certifications.map(cert => `
                <li><strong>${cert.name}</strong> - ${cert.issuer} (${cert.date})</li>
              `).join('')}
            </ul>
          </div>
        ` : ''}
      </body>
      </html>
    `;
    
    return html;
  }
} 