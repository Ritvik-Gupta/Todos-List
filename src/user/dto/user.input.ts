import { Field, InputType } from "@nestjs/graphql"
import { IsOptional, Length } from "class-validator"
import { User } from "../user.entity"
import { UserLoginInput } from "./user-login.input"

@InputType()
export class UserInput extends UserLoginInput implements Partial<User> {
	@Field()
	@Length(5, 20)
	firstName: string

	@Field(() => String, { nullable: true })
	@Length(5, 20)
	@IsOptional()
	middleName?: string

	@Field()
	@Length(5, 20)
	lastName: string
}
