import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"
import { GqlExecutionContext } from "@nestjs/graphql"
import { verify } from "jsonwebtoken"
import { IAuthUser } from "./auth.user"
import { env } from "./custom.env"
import { IContext } from "./custom.types"

@Injectable()
export class AuthGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean {
		const ctx = GqlExecutionContext.create(context).getContext<IContext>()
		if (ctx.req.headers.authorization === undefined) return false
		ctx.user = this.validateToken(ctx.req.headers.authorization)
		return true
	}

	private validateToken(authorization: string): IAuthUser {
		const [bearerToken, authToken] = authorization.split(" ")
		if (bearerToken !== "Bearer") throw Error("Invalid Authorization Bearer Token")
		return verify(authToken!, env.JWT_SECRET) as IAuthUser
	}
}
