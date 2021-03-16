import { Module } from "@nestjs/common"
import { GraphQLModule } from "@nestjs/graphql"
import { TypeOrmModule } from "@nestjs/typeorm"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { ENV } from "./services/custom.env"
import { gqlFormatError, IContext } from "./services/custom.types"
import { TodoModule } from "./todo/todo.module"
import { UserModule } from "./user/user.module"
import { ViewModule } from "./view/view.module"

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: "postgres",
			url: ENV.DATABASE_URL,
			synchronize: !ENV.IN_PRODUCTION,
			logging: !ENV.IN_PRODUCTION,
			autoLoadEntities: true,
		}),
		GraphQLModule.forRoot({
			autoSchemaFile: ENV.IN_PRODUCTION || "./src/schema.gql",
			context: ({ req }): IContext => ({ req }),
			formatError: gqlFormatError,
			playground: true,
		}),
		TodoModule,
		UserModule,
		ViewModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
