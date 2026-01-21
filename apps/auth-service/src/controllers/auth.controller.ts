import { Request, Response } from 'express';
import * as authService from '../services/auth.service.js';

export const register = async (req: Request, res: Response) => {
  try {
    const ip = req.ip;
    const userAgent = req.headers['user-agent'];
    const result = await authService.register(req.body, { ip, userAgent });
    res.status(201).json(result);
  } catch (error: any) {
    console.log('error', error);
    res.status(400).json({
      message: error.message || 'Registration failed',
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const ip = req.ip;
    const userAgent = req.headers['user-agent'];

    const result = await authService.login(req.body, { ip, userAgent });
    res.status(200).json(result);
  } catch (error: any) {
    res.status(401).json({
      message: error.message || 'Invalid credentials',
    });
  }
};
