import { TodoEntity } from "$/entities"
import { BaseRepository } from "$/services"
import { EntityRepository } from "typeorm"

@EntityRepository(TodoEntity)
export class TodoRepository extends BaseRepository<TodoEntity> {
	constructor() {
		super({ ifDefined: "ksnv", ifNotDefined: "kdnd" })
	}
}
