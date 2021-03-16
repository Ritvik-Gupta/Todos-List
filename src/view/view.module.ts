import { Module } from "@nestjs/common"
import { RenderModule } from "nest-next"
import Next from "next"
import { ViewController } from "./view.controller"

@Module({
	imports: [RenderModule.forRootAsync(Next({ dev: false, dir: "./client" }), { viewsDir: null })],
	controllers: [ViewController],
})
export class ViewModule {}
