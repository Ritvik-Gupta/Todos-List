import { BaseRepository } from "$/base.repository"
import { EntityRepository } from "typeorm"
import { UserEntity } from "./user.entity"

@EntityRepository(UserEntity)
export class UserRepository extends BaseRepository<UserEntity> {
	constructor() {
		super({
			ifDefined: "User with the given credentials is already Defined",
			ifNotDefined: "User has not yet been created with the credentials",
		})
	}
}
