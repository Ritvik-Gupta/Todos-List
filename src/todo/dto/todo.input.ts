import { Field, InputType } from "@nestjs/graphql"
import { Todo } from "../todo.entity"
import { Length, MinLength } from "class-validator"

@InputType()
export class TodoInput implements Partial<Todo> {
	@Field()
	@Length(5, 100)
	title: string

	@Field()
	@MinLength(10)
	content: string
}
