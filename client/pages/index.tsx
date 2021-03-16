import { useGetAllUsersQuery } from "#/graphql/generated"
import { NestNextSSR } from "#/utils/custom.types"
import { NextPage } from "next"
import { Fragment } from "react"

export interface IIndexProps {
	title: string
}

const Index: NextPage<IIndexProps> = ({ title }) => {
	const { data, loading, error } = useGetAllUsersQuery()

	return (
		<Fragment>
			<h2>{title}</h2>
			<div>Loading : {loading}</div>
			<div>Error : {JSON.stringify(error, null, "\t")}</div>
			{data?.getAllUsers.map(user => (
				<Fragment key={user.id}>
					<div>{user.email}</div>
					<div>{user.firstName}</div>
				</Fragment>
			))}
		</Fragment>
	)
}

export const getServerSideProps: NestNextSSR<IIndexProps> = async ({ query }) => ({ props: query })
export default Index
