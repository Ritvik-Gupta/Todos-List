import { Field, InputType } from "@nestjs/graphql"
import { IsEmail, MinLength } from "class-validator"
import { User } from "../user.entity"

@InputType()
export class UserLoginInput implements Partial<User> {
	@Field()
	@IsEmail()
	email: string

	@Field()
	@MinLength(5)
	password: string
}
