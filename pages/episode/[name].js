import { useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { GETEPISODE } from "../../graphql/Queries";
import { Space, Image, Typography, List, Card, Row, Col } from "antd";
import Link from "next/link";
import slugify from "slugify";

const { Title } = Typography;
const { Paragraph } = Typography;

const Episode = ({ id, name }) => {
  const [errorUrl, setError] = useState(false);
  const router = useRouter();

  const { error, loading, data } = useQuery(GETEPISODE, {
    variables: { id: id },
    onCompleted: (res) => {
      if (
        !res.episode ||
        slugify(res.episode.name, { lower: true }) !== name
      ) {
        setError(true);
      }
    },
  });

  if (error || errorUrl) return <div>ERROR...</div>;

  if (loading) return <div>loading...</div>;

  console.log(data);

  return (
    <Space direction="vertical" size={30}>
      <Title level={1}>{data.episode.name}</Title>
      <Title level={5}>Air date: {data.episode.air_date}</Title>
      <Title level={3}>Characters</Title>
      <List
        itemLayout="horizontal"
        dataSource={data.episode.characters}
        renderItem={(item) => (
          <List.Item>
            <Link
              href={`/character/${slugify(`${item.name} ${item.id}`, {
                lower: true,
              })}`}
            >
              <Card style={{ width: 450 }} hoverable>
                <Space>
                  <Row
                    align="middle"
                    gutter={{
                      xs: 8,
                      sm: 16,
                      md: 24,
                      lg: 32,
                    }}
                  >
                    <Col>
                      <Image width={150} src={item.image}></Image>
                    </Col>
                    <Col>
                      <Paragraph>{item.name}</Paragraph>
                    </Col>
                  </Row>
                </Space>
              </Card>
            </Link>
          </List.Item>
        )}
      ></List>
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

export default Episode;
