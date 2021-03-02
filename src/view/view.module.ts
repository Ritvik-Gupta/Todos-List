import { Module } from "@nestjs/common"
import { RenderModule } from "nest-next"
import Next from "next"
import { ViewController } from "./view.controller"

@Module({
	imports: [RenderModule.forRootAsync(Next({ dev: true, dir: "./src/view" }), { viewsDir: null })],
	controllers: [ViewController],
})
export class ViewModule {}
