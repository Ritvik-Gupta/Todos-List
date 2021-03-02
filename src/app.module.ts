import { ENV } from "$/custom.env"
import { gqlFormatError, IContext } from "$/custom.types"
import { Module } from "@nestjs/common"
import { GraphQLModule } from "@nestjs/graphql"
import { TypeOrmModule } from "@nestjs/typeorm"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { TodoModule } from "./todo/todo.module"
import { UserModule } from "./user/user.module"
import { ViewModule } from "./view/view.module"

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: "postgres",
			url: ENV.DATABASE_URL,
			synchronize: true,
			logging: true,
			autoLoadEntities: true,
		}),
		GraphQLModule.forRoot({
			autoSchemaFile: "./src/schema.gql",
			context: ({ req }): IContext => ({ req }),
			formatError: gqlFormatError,
		}),
		TodoModule,
		UserModule,
		ViewModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
