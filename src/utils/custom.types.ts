import { IUser } from "$user"
import { Request } from "express"

export interface IContext {
	req: Request
	user?: IUser
}
