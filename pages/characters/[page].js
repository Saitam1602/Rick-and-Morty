import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { GETCHARACTERS } from "../../graphql/Queries";
import { Row, Col, Card } from "antd";

const Characters = () => {
  const max_page = 42;
  const router = useRouter();

  const checkLimit = (page, max_page) => {
    if (typeof page === undefined) return undefined;
    if (page > max_page) return 1;
    else return page;
  };

  const { error, loading, data } = useQuery(GETCHARACTERS, {
    variables: { page: checkLimit(parseInt(router.query.page), max_page) || 1 },
  });

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Characters</h1>
      <Row gutter={[24, 24]}>
        {data.characters.results.map((item, index) => {
          return (
            <Link href={`/character/${item.name.replace(" ", "%20")}`} key={index}>
              <Col>
                <Card hoverable cover={<img src={item.image}></img>}>
                  <h3>{item.name}</h3>
                  <p>{item.gender}</p>
                  <p>{item.useState}</p>
                </Card>
              </Col>
            </Link>
          );
        })}
      </Row>
    </div>
  );
};

export default Characters;
