import { Controller, All, UseGuards, Req, Res } from '@nestjs/common';
import { ProxyService } from './proxy.service';
import { AuthAdminGuard } from './guards/auth-admin.guard';
import { Request, Response } from 'express';

@Controller('proxy')
export class ProxyController {
  constructor(private readonly proxyService: ProxyService) {}

  @All('auth/*')
  async proxyToAuth(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    console.log('Request URL:', req.url);
    console.log('Request Method:', req.method);
    console.log('Request Body:', req.body);
    const cleanedUrl = req.originalUrl.replace(/^\/proxy\/auth/, '');
    req.url = cleanedUrl;
    await this.proxyService.forwardRequest(req, res, 'http://authenticated:3000');
  }

  @All('org/*')
  @UseGuards(AuthAdminGuard)
  async proxyToOrg(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const cleanedUrl = req.originalUrl.replace(/^\/proxy\/org/, '');
    req.url = cleanedUrl;
    await this.proxyService.forwardRequest(req, res, 'http://organization:3000');
  }

}
