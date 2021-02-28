import { BaseRepository } from "$/base.repository"
import { EntityRepository } from "typeorm"
import { TodoEntity } from "./todo.entity"

@EntityRepository(TodoEntity)
export class TodoRepository extends BaseRepository<TodoEntity> {
	constructor() {
		super({ ifDefined: "ksnv", ifNotDefined: "kdnd" })
	}
}
