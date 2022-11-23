import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { GETEPISODEFROMNAME } from "../../graphql/Queries";
import { Space, Image, Typography, List, Card, Row, Col } from "antd";
import Link from "next/link";

const Episode = (props) => {
  const router = useRouter();

  const { Title } = Typography;
  const { Paragraph } = Typography;

  const { error, loading, data } = useQuery(GETEPISODEFROMNAME, {
    variables: { name: router.query.name },
  });

  if (loading) return <div>loading...</div>;

  console.log(data);

  return (
    <Space direction="vertical" size={30}>
      <Title level={1}>{router.query.name}</Title>
      <Title level={5}>Air date: {data.episodes.results[0].air_date}</Title>
      <Title level={3}>Characters</Title>
      <List
        itemLayout="horizontal"
        dataSource={data.episodes.results[0].characters}
        renderItem={(item) => (
          <List.Item>
            <Link href={`/character/${item.name.replace(" ", "%20")}`}>
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

export default Episode;
