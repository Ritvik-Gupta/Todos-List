import { UserEntity, UserHollow } from "$/entities"
import { AuthGuard, IContext, INormalizedPaths, Normalize } from "$/services"
import { UseGuards } from "@nestjs/common"
import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql"
import { UserLoginInput } from "./dto/user-login.input"
import { UserInput } from "./dto/user.input"
import { UserService } from "./user.service"

@Resolver(() => UserEntity)
export class UserResolver {
	constructor(private readonly userService: UserService) {}

	@Query(() => [UserEntity])
	getAllUsers(@Normalize.Paths() fieldPaths: INormalizedPaths): Promise<UserEntity[]> {
		return this.userService.fetchAll(fieldPaths)
	}

	@Query(() => UserEntity, { nullable: true })
	@UseGuards(AuthGuard)
	currentUser(
		@Context() context: IContext,
		@Normalize.Paths() fieldPaths: INormalizedPaths
	): Promise<UserEntity | undefined> {
		return this.userService.fetch(context.user!.id, fieldPaths)
	}

	@Mutation(() => UserHollow)
	login(@Args("loginInput") loginInput: UserLoginInput): Promise<UserHollow> {
		return this.userService.login(loginInput)
	}

	@Mutation(() => UserHollow)
	register(@Args("registerInput") registerInput: UserInput): Promise<UserHollow> {
		return this.userService.register(registerInput)
	}
}
