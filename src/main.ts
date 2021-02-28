import { env } from "$/custom.env"
import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	await app.listen(env.PORT)
}
bootstrap()
