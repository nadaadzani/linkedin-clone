import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import { createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
// Import Secure Store here
import * as SecureStore from "expo-secure-store";

const httpLink = createHttpLink({
    uri: "https://0bk3hhsj-3000.asse.devtunnels.ms/",
});

const authLink = setContext(async (_, { headers }) => {
    // ?? Get the token from the SecureStore
    const token = await SecureStore.getItemAsync("token");

    // console.log(token, "<<< di setContext authLink")

    // ?? Return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            // ?? Inject the token
            authorization: token ? `Bearer ${token}` : "",
        },
    };
});

const client = new ApolloClient({
    // Change this into the forwarded port by setting the visibility to public
    // uri: 'https://0bk3hhsj-3000.asse.devtunnels.ms/',
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

export default client