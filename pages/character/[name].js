import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { GETCHARACTERFROMNAME } from "../../graphql/Queries";
import { Space, Image, Row, Col, Typography } from "antd";

const Character = () => {
  const router = useRouter();
  const { Title } = Typography;
  const { Paragraph } = Typography;

  const { error, loading, data } = useQuery(GETCHARACTERFROMNAME, {
    variables: { name: router.query.name },
  });

  if (loading) return <div>loading...</div>;

  console.log(data);

  return (
    // <div>
    //   {data.characters.results.map((item, index) => {
    //     return (
    //       <div key={index}>
    //         <h1>{item.name}</h1>
    //         <img src={item.image}></img>
    //       </div>
    //     );
    //   })}
    // </div>
    <>
      {data.characters.results.map((item, index) => {
        return (
          <Row gutter={[24,24]}>
            <Col span={6}></Col>
            <Image src={item.image}></Image>
            <Col span={24}>
              <Title>{item.name}</Title>
            </Col>
          </Row>
        );
      })}
    </>
  );
};

export default Character;
