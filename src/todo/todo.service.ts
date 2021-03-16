import { TodoEntity, TodoHollow } from "$/entities"
import { INormalizedPaths } from "$/services"
import { Injectable } from "@nestjs/common"
import { TodoInput } from "./dto/todo.input"
import { TodoRepository } from "./todo.repository"

@Injectable()
export class TodoService {
	constructor(private readonly todoRepository: TodoRepository) {}

	fetchAll(fieldPaths: INormalizedPaths): Promise<TodoEntity[]> {
		return this.todoRepository.getPopulatedQuery(fieldPaths).getMany()
	}

	create(todoInput: TodoInput, userId: string): Promise<TodoHollow> {
		return this.todoRepository.createAndReturn({ ...todoInput, userId })
	}
}
