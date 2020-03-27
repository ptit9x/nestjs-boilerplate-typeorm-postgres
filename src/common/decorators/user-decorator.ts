import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Use auth.guard before run this decorator.
 */
export const UserDecorator = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});
