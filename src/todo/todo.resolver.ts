import { AuthGuard } from "src/services/auth.guard"
import { IContext } from "src/services/custom.types"
import { UseGuards } from "@nestjs/common"
import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql"
import { TodoInput } from "./dto/todo.input"
import { Todo, TodoHollow } from "./todo.entity"
import { TodoService } from "./todo.service"
import { INormalizedPaths, Normalize } from "$/normalize.info"

@Resolver(Todo)
export class TodoResolver {
	constructor(private readonly todoService: TodoService) {}

	@Query(() => [Todo])
	fetchAllTodos(@Normalize.Paths() fieldPaths: INormalizedPaths): Promise<Todo[]> {
		return this.todoService.fetchAll(fieldPaths)
	}

	@Mutation(() => TodoHollow)
	@UseGuards(AuthGuard)
	createTodo(
		@Context() ctx: IContext,
		@Args("todoInput") todoInput: TodoInput
	): Promise<TodoHollow> {
		return this.todoService.create(todoInput, ctx.user!.id)
	}
}
