import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { jwtConstants } from '../constants/jwt.constant';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) { }

    async canActivate(context: ExecutionContext,): Promise<boolean> {

        const request = context.switchToHttp().getRequest();

        const token = this.extractTokenFromHeader(request);

        if (!token) throw new UnauthorizedException();

        try {
            const secret = jwtConstants.secret;
            const _token: any = await this.verifyUserWithAuthService(token);
            const user = await this.jwtService.verifyAsync(_token, { secret });
            request.user = user;
            request.headers['x-tenant-id'] = user.tenant;
            request.headers['branch'] = user.id_branch;
            return true;
        } catch (error) {
            throw new ForbiddenException('Invalid token');
        }
    }

    private extractTokenFromHeader(request: Request): string | undefined | null {
        const cookieArray = request.headers?.authorization?.split(';').map(cookie => cookie.trim()) ?? [];
        if (cookieArray.length == 0) return null
        const token = cookieArray[0].split(' ')[1];
        return token;
    }

    private async verifyUserWithAuthService(token: string): Promise<any> {

        const url = this.configService.get<string>('API_AUTHENTICATED_URL');
        if (!url) throw new Error('URL de autenticación no definida');

        try {
            const response = await lastValueFrom(
                this.httpService.get(url+'/auth/verify', {
                    headers: { Authorization: `Bearer ${token}` },
                }),
            );
            const _token = response.data;
            return _token;

        } catch (error) {
            throw new UnauthorizedException('Usuario no autorizado en AuthService');
        }
    }
}