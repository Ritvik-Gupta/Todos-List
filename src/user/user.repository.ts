import { BaseRepository } from "src/services/base.repository"
import { EntityRepository } from "typeorm"
import { User } from "./user.entity"

@EntityRepository(User)
export class UserRepository extends BaseRepository<User> {
	constructor() {
		super({
			ifDefined: "User with the given credentials is already Defined",
			ifNotDefined: "User has not yet been created with the credentials",
		})
	}
}
