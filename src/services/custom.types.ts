import { ValidationError } from "@nestjs/common"
import { UserInputError } from "apollo-server-express"
import { Request } from "express"
import { GraphQLError } from "graphql"
import { IAuthUser } from "./auth.user"
import { env } from "./custom.env"

export interface IContext {
	req: Request
	user?: IAuthUser
}

type validationErrors = Record<"validation", ValidationError[]>

export const pipeExceptionFactory = (validation: ValidationError[]) =>
	new UserInputError(env.VALIDATION_ERROR, { validation })

export const gqlFormatError = (error: GraphQLError) =>
	error.message !== env.VALIDATION_ERROR
		? error
		: {
				message: env.VALIDATION_ERROR,
				extensions: {
					validation: (error.extensions as validationErrors).validation.map(err => ({
						field: err.property,
						errors: Object.values(err.constraints ?? {}),
					})),
				},
		  }
