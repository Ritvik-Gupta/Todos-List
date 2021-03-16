import {
	GetServerSidePropsContext as GetSSRPropsCtx,
	GetServerSidePropsResult as GetSSRPropsRes,
} from "next"

export type NestNextSSR<T> = (ctx: GetSSRPropsCtx & { query: T }) => Promise<GetSSRPropsRes<T>>
