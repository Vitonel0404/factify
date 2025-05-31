import { Controller, All, UseGuards, Req, Res } from '@nestjs/common';
import { ProxyService } from './proxy.service';
import { AuthAdminGuard } from './guards/auth-admin.guard';
import { Request, Response } from 'express';

@Controller('proxy')
export class ProxyController {
  constructor(private readonly proxyService: ProxyService) {}

  @All('auth/*')
  async proxyToAuth(@Req() req: Request, @Res() res: Response) {
    await this.proxyService.forwardRequest(req, res, 'http://authenticated:3000');
  }

  @All('org/*')
  @UseGuards(AuthAdminGuard)
  async proxyToOrg(@Req() req: Request, @Res() res: Response) {
    await this.proxyService.forwardRequest(req, res, 'http://organization:3000');
  }

}
