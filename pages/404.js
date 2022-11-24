import { Typography } from "antd";
import Head from "next/head";

const { Title } = Typography;

const ErrorPage = () => {
  return (
    <div>
      <Head>
        <title>404</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Title level={1}>ERROR 404</Title>
    </div>
  );
};

export default ErrorPage;
