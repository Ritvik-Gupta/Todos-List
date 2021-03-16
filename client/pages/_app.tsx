import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"
import { NextPage } from "next"
import { AppProps } from "next/app"

const client = new ApolloClient({
	cache: new InMemoryCache(),
	uri: "http://localhost:4001/graphql",
})

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
	return (
		<ApolloProvider client={client}>
			<Component {...pageProps} />
		</ApolloProvider>
	)
}

export default App
