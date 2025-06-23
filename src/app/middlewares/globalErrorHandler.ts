import { RequestHandler } from 'express';

// Not Found Route Handler
export const notFoundHandler: RequestHandler = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `🔍 Route Not Found: ${req.originalUrl}`,
  });
};