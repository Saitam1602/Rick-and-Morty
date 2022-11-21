import "../styles/globals.css";
import Layout from "../components/utils/Layout";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { ConfigProvider, DatePicker } from "antd";
import { useEffect, useState } from "react";

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }) {
  const [client, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  }, [])

  if(!client) {
    return null;
  }

  return (
    <ApolloProvider client={client}>
      <ConfigProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ConfigProvider>
    </ApolloProvider>
  );
}

export default MyApp;
