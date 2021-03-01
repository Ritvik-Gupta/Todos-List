import { AuthGuard } from "$/auth.guard"
import { IContext } from "$/custom.types"
import { INormalizedPaths, Normalize } from "$/normalize.info"
import { UseGuards } from "@nestjs/common"
import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql"
import { UserLoginInput } from "./dto/user-login.input"
import { UserInput } from "./dto/user.input"
import { User, UserHollow } from "./user.entity"
import { UserService } from "./user.service"

@Resolver(User)
export class UserResolver {
	constructor(private readonly userService: UserService) {}

	@Query(() => [User])
	getAllUsers(@Normalize.Paths() fieldPaths: INormalizedPaths): Promise<User[]> {
		return this.userService.fetchAll(fieldPaths)
	}

	@Query(() => User, { nullable: true })
	@UseGuards(AuthGuard)
	currentUser(
		@Context() context: IContext,
		@Normalize.Paths() fieldPaths: INormalizedPaths
	): Promise<User | undefined> {
		return this.userService.fetch(context.user!.id, fieldPaths)
	}

	@Mutation(() => UserHollow)
	login(@Args("loginInput") loginInput: UserLoginInput): Promise<UserHollow> {
		return this.userService.login(loginInput)
	}

	@Mutation(() => UserHollow)
	register(@Args("userInput") userInput: UserInput): Promise<UserHollow> {
		return this.userService.register(userInput)
	}
}
