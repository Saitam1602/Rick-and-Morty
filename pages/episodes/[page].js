import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { GETEPISODES } from "../../graphql/Queries";
import { List, Pagination, Space, Typography, Card, Divider } from "antd";
import slugify from "slugify";

const { Title } = Typography;
const { Paragraph } = Typography;

const EpisodesComponent = (props) => {
  const max_page = 3;
  const router = useRouter();

  const handlePagination = (page) => {
    router.push(`/episodes/${page}`);
  };

  const checkLimit = (page, max_page) => {
    if (typeof page === undefined) return undefined;
    if (page > max_page) return 1;
    else return page;
  };

  const { error, loading, data } = useQuery(GETEPISODES, {
    variables: { page: checkLimit(parseInt(router.query.page), max_page) || 1 },
  });

  if (loading) return <div>Loading...</div>;

  console.log(data);

  return (
    <Space direction="vertical" style={{ width: "100%", alignItems: "center" }}>
      <Title level={1}>Episodes</Title>
      <List
        dataSource={data.episodes.results}
        renderItem={(item) => (
          <List.Item>
            <Link
              href={`/episode/${slugify(`${item.name} ${item.id}`, {
                lower: true,
              })}`}
            >
              <Card style={{ width: 400 }} hoverable>
                <Title level={3}>{item.name}</Title>
                <Divider></Divider>
                <Paragraph>Episode: {item.episode}</Paragraph>
                <Paragraph>
                  Number of characters: {item.characters.length}
                </Paragraph>
              </Card>
            </Link>
          </List.Item>
        )}
      ></List>
      <Pagination
        defaultCurrent={router.query.page}
        total={max_page}
        pageSize
        size={30}
        onChange={handlePagination}
      ></Pagination>
    </Space>
  );
};

export default EpisodesComponent;
