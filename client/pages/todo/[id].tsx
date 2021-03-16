import { NextPage } from "next"
import { useRouter } from "next/router"

export interface ITodoProps {}

const Todo: NextPage<ITodoProps> = () => {
	const router = useRouter()
	console.log(router.query)

	return <div>Todo Page</div>
}

export default Todo
