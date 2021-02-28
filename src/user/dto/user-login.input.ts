import { Field, InputType } from "@nestjs/graphql"
import { UserEntity } from "../user.entity"

@InputType()
export class UserLoginInput implements Partial<UserEntity> {
	@Field(() => String)
	email: string

	@Field(() => String)
	password: string
}
