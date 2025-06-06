import { User } from '../../users/entities/users.entities';

import { ExecutionContext, createParamDecorator } from '@nestjs/common';

interface RequestWithUser extends Request {
  user: User;
}

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest<RequestWithUser>();
    return request.user;
  },
);
