import "dotenv/config"

export namespace env {
	export const PORT = process.env.PORT!
	export const JWT_SECRET = process.env.JWT_SECRET!
	export const JWT_EXPIRY = process.env.JWT_EXPIRY!
	export const HASH_SALT = parseInt(process.env.HASH_SALT!)
	export const DATABASE_URL = process.env.DATABASE_URL!
}