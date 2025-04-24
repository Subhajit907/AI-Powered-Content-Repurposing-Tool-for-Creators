import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from "multer";
import { generateRepurposedContent } from "./services/geminiService";
import { repurposeContentSchema } from "@shared/schema";
import fs from "fs";
import path from "path";
import os from "os";
import { setupAuth, isAuthenticated } from "./auth";

// Set up multer for file uploads
const upload = multer({
  dest: os.tmpdir(),
  limits: {
    fileSize: 500 * 1024 * 1024, // 500MB limit
  },
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication
  setupAuth(app);
  
  // Video upload endpoint - public, no authentication required
  app.post('/api/videos/upload', upload.single('video'), async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ 
          success: false, 
          error: 'No video file uploaded' 
        });
      }

      const { originalname, path: tempPath, size } = req.file;
      
      // In a production app, we'd process the video to get its duration and generate a transcript
      // For demo purposes, we'll just use random values
      const duration = Math.floor(Math.random() * 900) + 60; // 1-15 minutes
      const transcript = "This is an automatically generated transcript of the uploaded video. In a real implementation, we would use a transcription service or library to extract the actual speech from the video.";

      // Store video metadata in our storage associated with the logged-in user
      const video = await storage.createVideo({
        userId: req.user?.id,
        fileName: originalname,
        fileSize: size,
        duration,
        transcript,
      });

      // In a real app, we would move the file to permanent storage
      // For now, we'll just delete the temp file
      fs.unlinkSync(tempPath);

      return res.status(200).json({
        success: true,
        data: {
          videoId: video.id,
          transcript,
          duration,
        }
      });
    } catch (error) {
      console.error('Upload error:', error);
      return res.status(500).json({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Upload failed'
      });
    }
  });

  // Content repurposing endpoint - public, no authentication required
  app.post('/api/content/repurpose', async (req: Request, res: Response) => {
    try {
      const validatedData = repurposeContentSchema.parse(req.body);
      
      // Call the Gemini API to repurpose the content
      const repurposedContent = await generateRepurposedContent(validatedData.transcript);
      
      // If a videoId is provided, store the generated content
      if (validatedData.videoId) {
        for (const content of repurposedContent.contents) {
          await storage.createGeneratedContent({
            videoId: validatedData.videoId,
            platform: content.platform,
            title: content.title,
            script: content.script,
            captions: content.captions,
          });
        }
      }
      
      return res.status(200).json(repurposedContent);
    } catch (error) {
      console.error('Repurposing error:', error);
      return res.status(500).json({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Content repurposing failed'
      });
    }
  });

  // Get video by id - public, no authentication required
  app.get('/api/videos/:id', async (req: Request, res: Response) => {
    try {
      const videoId = parseInt(req.params.id);
      if (isNaN(videoId)) {
        return res.status(400).json({ success: false, error: 'Invalid video ID' });
      }
      
      const video = await storage.getVideo(videoId);
      if (!video) {
        return res.status(404).json({ success: false, error: 'Video not found' });
      }
      
      return res.status(200).json({ success: true, data: video });
    } catch (error) {
      console.error('Error getting video:', error);
      return res.status(500).json({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to retrieve video'
      });
    }
  });

  // Get generated content for a video - public, no authentication required
  app.get('/api/videos/:id/content', async (req: Request, res: Response) => {
    try {
      const videoId = parseInt(req.params.id);
      if (isNaN(videoId)) {
        return res.status(400).json({ success: false, error: 'Invalid video ID' });
      }
      
      const content = await storage.getGeneratedContentByVideoId(videoId);
      
      return res.status(200).json({ 
        success: true, 
        data: { contents: content } 
      });
    } catch (error) {
      console.error('Error getting content:', error);
      return res.status(500).json({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to retrieve content'
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
