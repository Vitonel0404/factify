import { Controller, All, UseGuards, Req, Res } from '@nestjs/common';
import { ProxyService } from './proxy.service';
import { AuthAdminGuard } from './guards/auth-admin.guard';
import { Request, Response } from 'express';
import { AuthGuard } from './guards/auth.guard';
import { ConfigService } from '@nestjs/config';

@Controller('proxy')
export class ProxyController {
  constructor(
    private readonly proxyService: ProxyService,
    private readonly configService: ConfigService,
  ) {}

  @All('auth/*')
  async proxyToAuth(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const cleanedUrl = req.originalUrl.replace(/^\/proxy\/auth/, '');
    req.url = cleanedUrl;
    await this.proxyService.forwardRequest(req, res, this.configService.get<string>('API_AUTHENTICATED_URL')!);
  }

  @All('org/*')
  @UseGuards(AuthAdminGuard)
  async proxyToOrg(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const cleanedUrl = req.originalUrl.replace(/^\/proxy\/org/, '');
    req.url = cleanedUrl;
    await this.proxyService.forwardRequest(req, res, this.configService.get<string>('API_ORGANIZATION_URL')!);
  }

  @All('manage/*')
  @UseGuards(AuthGuard)
  async proxyToManagement(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const cleanedUrl = req.originalUrl.replace(/^\/proxy\/manage/, '');
    req.url = cleanedUrl;   
    await this.proxyService.forwardRequest(req, res, this.configService.get<string>('API_MANAGEMENT_URL')!);
  }

  @All('products/*')
  @UseGuards(AuthGuard)
  async proxyToProducts(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const cleanedUrl = req.originalUrl.replace(/^\/proxy\/products/, '');
    req.url = cleanedUrl;
    await this.proxyService.forwardRequest(req, res, this.configService.get<string>('API_PRODUCTS_URL')!);
  }

  @All('sales/*')
  @UseGuards(AuthGuard)
  async proxyToSales(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const cleanedUrl = req.originalUrl.replace(/^\/proxy\/sales/, '');
    req.url = cleanedUrl;
    await this.proxyService.forwardRequest(req, res, this.configService.get<string>('API_SALES_URL')!);
  }

  @All('purchases/*')
  @UseGuards(AuthGuard)
  async proxyToPurchase(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const cleanedUrl = req.originalUrl.replace(/^\/proxy\/purchases/, '');
    req.url = cleanedUrl;
    await this.proxyService.forwardRequest(req, res, this.configService.get<string>('API_PURCHASES_URL')!);
  }

}
