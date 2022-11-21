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
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <ConfigProvider>
      <ApolloProvider client={client}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </ConfigProvider>
  );
}

export default MyApp;
