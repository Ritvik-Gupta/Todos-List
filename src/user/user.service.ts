import { Injectable } from "@nestjs/common"
import { UserLoginInput } from "./dto/user-login.input"
import { UserInput } from "./dto/user.input"
import { UserEntity } from "./user.entity"
import { UserRepository } from "./user.repository"

@Injectable()
export class UserService {
	constructor(private readonly userRepository: UserRepository) {}

	fetchAll(): Promise<UserEntity[]> {
		return this.userRepository.find()
	}

	fetch(userId: string): Promise<UserEntity | undefined> {
		return this.userRepository.findOne({ where: { id: userId } })
	}

	async login({ email, password }: UserLoginInput): Promise<UserEntity> {
		const user = await this.userRepository.ifDefined({ email })
		const isSamePassword = await user.comparePassword(password)
		if (!isSamePassword) throw Error("Invalid Password")
		return user
	}

	async register(userInput: UserInput): Promise<UserEntity> {
		await this.userRepository.ifNotDefined({ email: userInput.email })
		return await this.userRepository.createAndReturn(userInput)
	}
}
