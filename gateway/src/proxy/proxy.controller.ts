import { Controller, All, UseGuards, Req, Res } from '@nestjs/common';
import { ProxyService } from './proxy.service';
import { AuthAdminGuard } from './guards/auth-admin.guard';
import { Request, Response } from 'express';
import { AuthGuard } from './guards/auth.guard';

@Controller('proxy')
export class ProxyController {
  constructor(private readonly proxyService: ProxyService) {}

  @All('auth/*')
  async proxyToAuth(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const cleanedUrl = req.originalUrl.replace(/^\/proxy\/auth/, '');
    req.url = cleanedUrl;
    await this.proxyService.forwardRequest(req, res, 'http://localhost:3001');
  }

  @All('org/*')
  @UseGuards(AuthAdminGuard)
  async proxyToOrg(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const cleanedUrl = req.originalUrl.replace(/^\/proxy\/org/, '');
    req.url = cleanedUrl;
    await this.proxyService.forwardRequest(req, res, 'http://localhost:3002');
  }

  @All('manage/*')
  @UseGuards(AuthGuard)
  async proxyToManagement(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const cleanedUrl = req.originalUrl.replace(/^\/proxy\/manage/, '');
    req.url = cleanedUrl;   
    await this.proxyService.forwardRequest(req, res, 'http://localhost:3003');
  }

  @All('products/*')
  @UseGuards(AuthGuard)
  async proxyToProducts(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const cleanedUrl = req.originalUrl.replace(/^\/proxy\/products/, '');
    req.url = cleanedUrl;
    await this.proxyService.forwardRequest(req, res, 'http://localhost:3004');
  }

  @All('sales/*')
  @UseGuards(AuthGuard)
  async proxyToSales(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const cleanedUrl = req.originalUrl.replace(/^\/proxy\/sales/, '');
    req.url = cleanedUrl;
    await this.proxyService.forwardRequest(req, res, 'http://localhost:3005');
  }

  @All('purchases/*')
  @UseGuards(AuthGuard)
  async proxyToPurchase(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const cleanedUrl = req.originalUrl.replace(/^\/proxy\/purchases/, '');
    req.url = cleanedUrl;
    await this.proxyService.forwardRequest(req, res, 'http://localhost:3006');
  }

}
