import { useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { GETLOCATION } from "../../graphql/Queries";
import {
  Space,
  Image,
  Row,
  Col,
  Typography,
  Divider,
  List,
  Collapse,
} from "antd";
import Link from "next/link";
import Head from "next/head";
import slugify from "slugify";
import ErrorPage from "../404";
import { Loading } from "../loading";

const { Title } = Typography;
const { Paragraph } = Typography;
const { Panel } = Collapse;

const Location = ({ id, name }) => {
  const [errorUrl, setError] = useState(false);
  const router = useRouter();

  const { error, loading, data } = useQuery(GETLOCATION, {
    variables: { id: id },
    onCompleted: (res) => {
      if (
        !res.location ||
        slugify(res.location.name, { lower: true }) !== name
      ) {
        setError(true);
      }
    },
  });

  if (error || errorUrl) {
    router.push("/404");
    return <ErrorPage></ErrorPage>;
  }

  if (loading) return <Loading></Loading>;

  console.log(data);

  return (
    <Space direction="vertical" size={30}>
      <Head>
        <title>{data.location.name}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Title level={1}>{data.location.name}</Title>
      {data.location.residents.map((item, index) => {
        return (
          <Row gutter={200} justify="space-between" align="start" key={index}>
            <Col span={12}>
              <Image src={item.image} width={450} height={450}></Image>
            </Col>
            <Col span={12}>
              <Link
                href={`/character/${slugify(`${item.name} ${item.id}`, {
                  lower: true,
                })}`}
              >
                <Title level={2}>{item.name}</Title>
              </Link>
              <Paragraph>Gender: {item.gender}</Paragraph>
              <Collapse>
                <Panel header="Episodes">
                  <List
                    itemLayout="horizontal"
                    dataSource={item.episode}
                    renderItem={(item) => (
                      <List.Item>
                        <Link
                          href={`/episode/${slugify(`${item.name} ${item.id}`, {
                            lower: true,
                          })}`}
                        >
                          {item.name}
                        </Link>
                      </List.Item>
                    )}
                  ></List>
                </Panel>
              </Collapse>
            </Col>
            <Divider></Divider>
          </Row>
        );
      })}
    </Space>
  );
};

export function getServerSideProps(context) {
  const parts = context.params.name.split("-");

  return {
    props: {
      id: parts.pop(),
      name: parts.join("-"),
    },
  };
}

export default Location;
