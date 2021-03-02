import { Controller, Get, Render } from "@nestjs/common"
import { IIndexProps } from "./pages"

@Controller()
export class ViewController {
	@Get()
	@Render("index")
	index(): IIndexProps {
		return { title: "Hello from Server to Index" }
	}
}
