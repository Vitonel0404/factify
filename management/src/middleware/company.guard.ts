import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class CompanyGuard implements CanActivate {
  constructor () {}
  async canActivate(context: ExecutionContext,): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request.headers['x-tenant-id'] || request.headers['x-tenant-id'] == undefined) throw new UnauthorizedException();
    return true
  }

 
}
