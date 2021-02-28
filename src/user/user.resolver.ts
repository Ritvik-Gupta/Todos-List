import { AuthGuard } from "$/auth.guard"
import { IContext } from "$/custom.types"
import { UseGuards } from "@nestjs/common"
import { Args, Context, Info, Mutation, Query, Resolver } from "@nestjs/graphql"
import { GraphQLResolveInfo } from "graphql"
import { UserLoginInput } from "./dto/user-login.input"
import { UserInput } from "./dto/user.input"
import { UserEntity } from "./user.entity"
import { UserService } from "./user.service"

@Resolver(UserEntity)
export class UserResolver {
	constructor(private readonly userService: UserService) {}

	@Query(() => [UserEntity])
	getAllUsers(@Info() info: GraphQLResolveInfo): Promise<UserEntity[]> {
		console.log(JSON.stringify(info, null, "\t"))
		return this.userService.fetchAll()
	}

	@Query(() => UserEntity, { nullable: true })
	@UseGuards(AuthGuard)
	currentUser(@Context() context: IContext): Promise<UserEntity | undefined> {
		return this.userService.fetch(context.user!.id)
	}

	@Mutation(() => String)
	login(@Args("loginInput") loginInput: UserLoginInput): Promise<UserEntity> {
		return this.userService.login(loginInput)
	}

	@Mutation(() => String)
	register(@Args("userInput") userInput: UserInput): Promise<UserEntity> {
		return this.userService.register(userInput)
	}
}
