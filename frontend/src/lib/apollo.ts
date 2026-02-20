import { useAuthStore } from "@/stores/auth";
import {
  ApolloClient,
  HttpLink,
  ApolloLink,
  InMemoryCache,
} from "@apollo/client";
import { ErrorLink } from "@apollo/client/link/error";
import { SetContextLink } from "@apollo/client/link/context";

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_BACKEND_URL,
});

const authLink = new SetContextLink((prevContext) => {
  const token = useAuthStore.getState().token;

  return {
    headers: {
      ...prevContext.headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const errorLink = new ErrorLink(({ error }) => {
  if (error) {
    if ("errors" in error && error.errors) {
      for (const err of error.errors) {
        if (err.extensions?.code === "UNAUTHENTICATED") {
          useAuthStore.getState().logout();
        }
      }
    }

    if ("statusCode" in error && error.statusCode === 401) {
      useAuthStore.getState().logout();
    }
  }
});

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});
