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
    const hasBody = !!req.body;

    const headers = this.prepareHeaders(req.headers, baseUrl, hasBody);
    

    console.log(`[Proxy] Forwarding ${method.toUpperCase()} ${req.originalUrl} -> ${url}`);
    console.log('[Proxy] Headers:', headers);
    console.log('[Proxy] Body:', req.body);

    try {
      const response$ = this.httpService.request({
        url,
        method,
        headers,
        data: req.body,
        timeout: 60000,
        maxRedirects: 0
      });

      const response = await lastValueFrom(response$);

      return res.status(response.status).json(response.data);

    } catch (error) {
      console.error('[Proxy] Error:', {
        url,
        error: error.response?.data || error.message,
        status: error.response?.status
      });
      
      const status = error.response?.status || 500;
      const data = error.response?.data || { 
        error: 'Proxy failed',
        details: error.message,
        originalUrl: url
      };
      
      return res.status(status).json(data);
    }
  }

  private prepareHeaders( originalHeaders: Record<string, any>, baseUrl: string, hasBody: boolean ): Record<string, string> {
    const headers: Record<string, string> = {};
    
    // Copiar headers válidos
    for (const key in originalHeaders) {
      if (this.shouldForwardHeader(key)) {
        const value = originalHeaders[key];
        headers[key] = Array.isArray(value) ? value.join(', ') : String(value);
      }
    }
    
    // Asegurar headers importantes
    headers['host'] = new URL(baseUrl).host;
    headers['accept-encoding'] = 'identity'; // Evitar compresión
    headers['connection'] = 'close'; // Evitar keep-alive issues
    
    if (!headers['content-type'] && hasBody) {
      headers['content-type'] = 'application/json';
    }
    
    return headers;
  }

  private shouldForwardHeader(key: string): boolean {
    const lowerKey = key.toLowerCase();
    // Excluir headers problemáticos
    return ![
      'host',
      'connection',
      'content-length',
      'accept-encoding'
    ].includes(lowerKey);
  }
}