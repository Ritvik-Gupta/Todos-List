import { AuthGuard } from "$/auth.guard"
import { IContext } from "$/custom.types"
import { UseGuards } from "@nestjs/common"
import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql"
import { TodoInput } from "./dto/todo.input"
import { TodoEntity } from "./todo.entity"
import { TodoService } from "./todo.service"

@Resolver(TodoEntity)
export class TodoResolver {
	constructor(private readonly todoService: TodoService) {}

	@Query(() => [TodoEntity])
	fetchAllTodos(): Promise<TodoEntity[]> {
		return this.todoService.fetchAll()
	}

	@Mutation(() => TodoEntity)
	@UseGuards(AuthGuard)
	createTodo(
		@Context() ctx: IContext,
		@Args("todoInput") todoInput: TodoInput
	): Promise<TodoEntity> {
		return this.todoService.create(todoInput, ctx.user!.id)
	}
}
