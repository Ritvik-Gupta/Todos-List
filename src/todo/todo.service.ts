import { INormalizedPaths } from "$/normalize.info"
import { Injectable } from "@nestjs/common"
import { TodoInput } from "./dto/todo.input"
import { Todo, TodoHollow } from "./todo.entity"
import { TodoRepository } from "./todo.repository"

@Injectable()
export class TodoService {
	constructor(private readonly todoRepository: TodoRepository) {}

	fetchAll(fieldPaths: INormalizedPaths): Promise<Todo[]> {
		return this.todoRepository.getPopulatedQuery(fieldPaths).getMany()
	}

	create(todoInput: TodoInput, userId: string): Promise<TodoHollow> {
		return this.todoRepository.createAndReturn({ ...todoInput, userId })
	}
}
