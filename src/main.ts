import { pipeExceptionFactory } from "$/custom.types"
import { ValidationPipe } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"
import { ENV } from "src/services/custom.env"
import { AppModule } from "./app.module"

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			exceptionFactory: pipeExceptionFactory,
		})
	)
	await app.listen(ENV.PORT)
}
bootstrap()
