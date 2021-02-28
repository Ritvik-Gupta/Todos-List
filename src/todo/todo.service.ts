import { Injectable } from "@nestjs/common"
import { TodoInput } from "./dto/todo.input"
import { TodoEntity } from "./todo.entity"
import { TodoRepository } from "./todo.repository"

@Injectable()
export class TodoService {
	constructor(private readonly todoRepository: TodoRepository) {}

	fetchAll(): Promise<TodoEntity[]> {
		return this.todoRepository.find()
	}

	create(todoInput: TodoInput, userId: string): Promise<TodoEntity> {
		return this.todoRepository.createAndReturn({ ...todoInput, userId })
	}
}
