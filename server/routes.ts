import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCalculatorInputSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API Routes for DSE Calculator
  
  // Submit calculator inputs
  app.post('/api/calculator/inputs', async (req: Request, res: Response) => {
    try {
      // Validate request body
      const validatedInput = insertCalculatorInputSchema.parse(req.body);
      
      // In a real app, we would save this to the database
      // For now, we'll just return success response
      res.status(200).json({
        success: true,
        message: 'Calculator inputs received successfully',
        data: validatedInput
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false,
          message: 'Invalid input data',
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false,
          message: 'An error occurred while processing your request' 
        });
      }
    }
  });

  // Calculate results based on inputs
  app.post('/api/calculator/calculate', (req: Request, res: Response) => {
    try {
      const { personalInfo, ownershipInfo, financing } = req.body;
      
      // Validate the inputs
      if (!personalInfo || !ownershipInfo || !financing) {
        return res.status(400).json({
          success: false,
          message: 'Missing required input sections'
        });
      }
      
      // In a real-world scenario, calculations could be performed server-side
      // For this implementation, calculations are done on the client-side
      
      res.status(200).json({
        success: true,
        message: 'Calculation request received'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'An error occurred during calculation'
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
