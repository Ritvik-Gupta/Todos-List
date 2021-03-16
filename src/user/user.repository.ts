import { UserEntity } from "$/entities"
import { BaseRepository } from "$/services"
import { EntityRepository } from "typeorm"

@EntityRepository(UserEntity)
export class UserRepository extends BaseRepository<UserEntity> {
	constructor() {
		super({
			ifDefined: "User with the given credentials is already Defined",
			ifNotDefined: "User has not yet been created with the credentials",
		})
	}
}
