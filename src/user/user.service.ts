import { UserEntity, UserHollow } from "$/entities"
import { INormalizedPaths } from "$/services"
import { Injectable } from "@nestjs/common"
import { UserLoginInput } from "./dto/user-login.input"
import { UserInput } from "./dto/user.input"
import { UserRepository } from "./user.repository"

@Injectable()
export class UserService {
	constructor(private readonly userRepository: UserRepository) {}

	fetchAll(fieldPaths: INormalizedPaths): Promise<UserEntity[]> {
		return this.userRepository.getPopulatedQuery(fieldPaths).getMany()
	}

	fetch(userId: string, fieldPaths: INormalizedPaths): Promise<UserEntity | undefined> {
		return this.userRepository
			.getPopulatedQuery(fieldPaths)
			.where(`${fieldPaths.root}.id = :userId`, { userId })
			.getOne()
	}

	async login({ email, password }: UserLoginInput): Promise<UserHollow> {
		const user = await this.userRepository.ifDefined({ email })
		const isSamePassword = await user.comparePassword(password)
		if (!isSamePassword) throw Error("Invalid Password")
		return user
	}

	async register(userInput: UserInput): Promise<UserHollow> {
		await this.userRepository.ifNotDefined({ email: userInput.email })
		return await this.userRepository.createAndReturn(userInput)
	}
}
