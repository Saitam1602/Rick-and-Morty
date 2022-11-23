import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { GETLOCATIONFROMNAME } from "../../graphql/Queries";
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

const Location = () => {
  const router = useRouter();

  const { Title } = Typography;
  const { Paragraph } = Typography;
  const { Panel } = Collapse;

  const { error, loading, data } = useQuery(GETLOCATIONFROMNAME, {
    variables: { name: router.query.name},
  });

  if (loading) return <div>loading...</div>;

  console.log(data)

  return (
    <Space direction="vertical" size={30}>
      <Title level={1}>{router.query.name}</Title>
      {data.locations.results[0].residents.map((item, index) => {
        return (
            <Row gutter={200} justify="space-between" align="start" key={index}>
              <Col span={12}>
                <Image src={item.image} width={450} height={450}></Image>
              </Col>
              <Col span={12}>
                <Link href={`/character/${item.name.replace(" ", "%20")}`}>
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
                      <Link href={`/episode/${item.name.replace(" ", "%20")}`}>
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

export default Location;
