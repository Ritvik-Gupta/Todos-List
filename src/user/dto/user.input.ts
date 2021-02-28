import { Field, InputType } from "@nestjs/graphql"
import { UserEntity } from "../user.entity"

@InputType()
export class UserInput implements Partial<UserEntity> {
	@Field(() => String)
	firstName: string

	@Field(() => String, { nullable: true })
	middleName?: string

	@Field(() => String)
	lastName: string

	@Field(() => String)
	email: string

	@Field(() => String)
	password: string
}
