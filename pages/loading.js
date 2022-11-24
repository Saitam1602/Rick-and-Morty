import { Typography } from "antd";
import Head from "next/head";

export const Loading = () => {
  const { Title } = Typography;
  return (
    <div>
      <Head>
        <title>Loading</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Title>Loading...</Title>
    </div>
  );
};
