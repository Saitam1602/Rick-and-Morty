import { useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { GETCHARACTER } from "../../graphql/Queries";
import { Space, Image, Row, Col, Typography, List, Collapse } from "antd";
import Link from "next/link";
import slugify from "slugify";

const { Title } = Typography;
const { Paragraph } = Typography;
const { Panel } = Collapse;

const Character = ({ id, name }) => {
  const [errorUrl, setError] = useState(false);
  const router = useRouter();

  const { error, loading, data } = useQuery(GETCHARACTER, {
    variables: { id: id },
    onCompleted: (res) => {
      if (
        !res.character ||
        slugify(res.character.name, { lower: true }) !== name
      ) {
        setError(true);
      }
    },
  });

  if (error || errorUrl) return <div>ERROR...</div>;

  if (loading) return <div>loading...</div>;

  console.log(data);

  const item = data.character;

  return (
    <Space direction="vertical" size={30}>
      <Title>{item.name}</Title>

      <Row gutter={200} justify="space-between" align="start">
        <Col span={12}>
          <Image src={item.image} width={450} height={450}></Image>
        </Col>
        <Col span={12}>
          <Title level={2}>{item.name}</Title>
          <Paragraph>Gender: {item.gender}</Paragraph>
          <Paragraph>Status: {item.status}</Paragraph>
          <Paragraph>Species: {item.species}</Paragraph>
          <Paragraph>Origin: {item.origin.name}</Paragraph>
          <Link
            href={`/location/${slugify(
              `${item.location.name} ${item.location.id}`,
              {
                lower: true,
              }
            )}`}
          >
            <Paragraph>Location: {item.location.name}</Paragraph>
          </Link>
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
      </Row>
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

export default Character;
