import { TodoEntity } from "$/entities"
import { Field, InputType } from "@nestjs/graphql"
import { Length, MinLength } from "class-validator"

@InputType()
export class TodoInput implements Partial<TodoEntity> {
	@Field()
	@Length(5, 100)
	title: string

	@Field()
	@MinLength(10)
	content: string
}
