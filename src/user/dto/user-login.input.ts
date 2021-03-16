import { UserEntity } from "$/entities"
import { Field, InputType } from "@nestjs/graphql"
import { IsEmail, MinLength } from "class-validator"

@InputType()
export class UserLoginInput implements Partial<UserEntity> {
	@Field()
	@IsEmail()
	email: string

	@Field()
	@MinLength(5)
	password: string
}
