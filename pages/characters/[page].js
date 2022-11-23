import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { GETCHARACTERS } from "../../graphql/Queries";
import {
  Row,
  Col,
  Card,
  Input,
  Space,
  Typography,
  Pagination,
} from "antd";

const Characters = () => {
  const max_page = 42;
  const router = useRouter();

  const { Search } = Input;
  const { Title } = Typography;
  const { Paragraph } = Typography;

  const handlePagination = (page) => {
    router.push(`/characters/${page}`);
  };

  const checkLimit = (page, max_page) => {
    if (typeof page === undefined) return undefined;
    if (page > max_page) return 1;
    else return page;
  };

  const { error, loading, data } = useQuery(GETCHARACTERS, {
    variables: { page: checkLimit(parseInt(router.query.page), max_page) || 1 },
  });

  if (loading) return <div>Loading...</div>;

  console.log(data);

  return (
    <Space direction="vertical" size={30}>
      <Space
        direction="horizontal"
        size={30}
        style={{ width: "100%", justifyContent: "center" }}
      >
        <Title>Characters</Title>
      </Space>
      <Search placeholder="Search..."></Search>
      <Row gutter={[24, 24]}>
        {data.characters.results.map((item, index) => {
          return (
            <Link
              href={`/character/${item.name.replace(" ", "%20")}`}
              key={index}
            >
              <Col>
                <Card
                  style={{ width: 300 }}
                  hoverable
                  cover={
                    <img
                      src={item.image}
                      style={{ height: 300, width: 300 }}
                    ></img>
                  }
                >
                  <Title level={3}>{item.name}</Title>
                  <Paragraph>Gender: {item.gender}</Paragraph>
                  <Paragraph>Status: {item.status}</Paragraph>
                </Card>
              </Col>
            </Link>
          );
        })}
      </Row>
      <Space
        direction="horizontal"
        size={30}
        style={{ width: "100%", justifyContent: "center" }}
      >
        <Pagination
          defaultCurrent={router.query.page}
          total={max_page}
          pageSize
          size={30}
          onChange={handlePagination}
        ></Pagination>
      </Space>
    </Space>
  );
};

export default Characters;
