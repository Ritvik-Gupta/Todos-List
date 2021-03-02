import { NextPage, NextPageContext } from "next"

export interface IIndexProps {
	title: string
}

const Index: NextPage<IIndexProps> = props => {
	return (
		<div>
			<h1>{props.title}</h1>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat repellat cupiditate iusto
				aliquid, minus deserunt qui itaque labore eligendi iure libero alias quibusdam laborum
				accusantium assumenda esse fugit unde quo.
			</p>
		</div>
	)
}

type PageContext = NextPageContext & { query: IIndexProps }

Index.getInitialProps = ({ query }: PageContext) => query

export default Index
