import { ValidationPipe } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { ENV } from "./services/custom.env"
import { pipeExceptionFactory } from "./services/custom.types"

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
