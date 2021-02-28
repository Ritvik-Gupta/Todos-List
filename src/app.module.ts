import { env } from "$/custom.env"
import { IContext } from "$/custom.types"
import { Module } from "@nestjs/common"
import { GraphQLModule } from "@nestjs/graphql"
import { TypeOrmModule } from "@nestjs/typeorm"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { TodoModule } from "./todo/todo.module"
import { UserModule } from "./user/user.module"

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: "postgres",
			url: env.DATABASE_URL,
			synchronize: true,
			logging: true,
			autoLoadEntities: true,
		}),
		GraphQLModule.forRoot({
			autoSchemaFile: "./schema.gql",
			context: ({ req }): IContext => ({ req }),
		}),
		TodoModule,
		UserModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
