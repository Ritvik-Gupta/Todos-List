import { BaseRepository } from "src/services/base.repository"
import { EntityRepository } from "typeorm"
import { Todo } from "./todo.entity"

@EntityRepository(Todo)
export class TodoRepository extends BaseRepository<Todo> {
	constructor() {
		super({ ifDefined: "ksnv", ifNotDefined: "kdnd" })
	}
}
