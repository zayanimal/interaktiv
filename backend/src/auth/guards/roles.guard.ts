import { Observable } from 'rxjs';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { map } from 'rxjs/operators';
import { UserDto } from '@users/dto/user.dto';


@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): Observable<boolean> {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());

        return context.switchToHttp().getRequest().user.pipe(
            map((user: UserDto) => roles.some((role) => role === user.role))
        );
    }
}
