import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { UserRepository } from "./user.repository"
import { UserResolver } from "./user.resolver"
import { UserService } from "./user.service"

@Module({
	imports: [TypeOrmModule.forFeature([UserRepository])],
	providers: [UserService, UserResolver],
})
export class UserModule {}
