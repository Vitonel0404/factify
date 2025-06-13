import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { jwtConstants } from '../constants/jwt.constant';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService:JwtService) { }

    async canActivate(context: ExecutionContext,): Promise<boolean> {

        const request = context.switchToHttp().getRequest();

        const token = this.extractTokenFromHeader(request);

        if (!token) throw new UnauthorizedException();

        try {
            const secret = jwtConstants.secret;
            const user = await this.jwtService.verifyAsync(token, {secret});
            request.user = user;
            request.headers['x-tenant-id'] = user.tenant;
            return true;
        } catch (error) {
            throw new ForbiddenException('Invalid token');
        }
    }
 
    private extractTokenFromHeader(request: Request): string | undefined | null{
        const cookieArray = request.headers?.authorization?.split(';').map(cookie => cookie.trim()) ?? [];
        if (cookieArray.length == 0) return null
        const token = cookieArray[0].split(' ')[1];
        return token;
    }
}