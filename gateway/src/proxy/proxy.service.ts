import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { Request, Response } from 'express';

@Injectable()
export class ProxyService {
  constructor(private readonly httpService: HttpService) {}

  async forwardRequest(req: Request, res: Response, baseUrl: string) {
    const url = `${baseUrl}${req.url}`;
    const method = req.method.toLowerCase();
    
    const headers: Record<string, string> = {};
    for (const key in req.headers) {
      const value = req.headers[key];
      
      if (Array.isArray(value)) {
        headers[key] = value.join(', ');
      } else if (typeof value === 'string') {
        headers[key] = value;
      }
    }

    try {
      const response$ = this.httpService.request({
        url,
        method,
        headers,
        data: req.body,
      });

      const response = await lastValueFrom(response$);
      res.status(response.status).json(response.data);
    } catch (error) {
      console.error('Proxy error:', error?.response?.data || error.message);
      res
        .status(error?.response?.status || 500)
        .json(error?.response?.data || { error: 'Proxy failed' });
    }
  }
}
