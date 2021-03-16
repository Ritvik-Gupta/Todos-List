import { TodoEntity, TodoHollow } from "$/entities"
import { AuthGuard, IContext, INormalizedPaths, Normalize } from "$/services"
import { UseGuards } from "@nestjs/common"
import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql"
import { TodoInput } from "./dto/todo.input"
import { TodoService } from "./todo.service"
@Resolver(() => TodoEntity)
export class TodoResolver {
	constructor(private readonly todoService: TodoService) {}

	@Query(() => [TodoEntity])
	fetchAllTodos(@Normalize.Paths() fieldPaths: INormalizedPaths): Promise<TodoEntity[]> {
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
