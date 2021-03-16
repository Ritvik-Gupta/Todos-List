import { IIndexProps } from "#/pages/index"
import { ITodoProps } from "#/pages/todo/[id]"
import { Controller, Get, Render } from "@nestjs/common"

@Controller()
export class ViewController {
	@Get()
	@Render("index")
	index(): IIndexProps {
		return { title: "Hello from Server to Index" }
	}

	@Get("todo/:id")
	@Render("todo/[id]")
	todo(): ITodoProps {
		return {}
	}
}
