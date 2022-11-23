import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { GETLOCATIONS } from "../../graphql/Queries";
import { List, Pagination, Space, Typography, Card, Divider } from "antd";

const LocationsComponent = (props) => {
  const max_page = 7;
  const router = useRouter();

  const { Title } = Typography;
  const { Paragraph } = Typography;

  const handlePagination = (page) => {
    router.push(`/locations/${page}`);
  };

  const checkLimit = (page, max_page) => {
    if (typeof page === undefined) return undefined;
    if (page > max_page) return 1;
    else return page;
  };

  const { error, loading, data } = useQuery(GETLOCATIONS, {
    variables: { page: checkLimit(parseInt(router.query.page), max_page) || 1 },
  });

  if (loading) return <div>Loading...</div>;

  console.log(data);

  return (
    <Space direction="vertical" style={{ width: "100%", alignItems: "center" }}>
      <Title level={1}>Locations</Title>
      <List
        dataSource={data.locations.results}
        renderItem={(item) => (
          <List.Item>
            <Link href={`/location/${item.name.replace(" ", "%20")}`}>
              <Card style={{ width: 400 }}>
                <Title level={3}>{item.name}</Title>
                <Divider></Divider>
                <Paragraph>Type: {item.type}</Paragraph>
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

export default LocationsComponent;
