import { Field, InputType } from "@nestjs/graphql"
import { TodoEntity } from "../todo.entity"

@InputType()
export class TodoInput implements Partial<TodoEntity> {
	@Field(() => String)
	title: string

	@Field(() => String)
	content: string
}
