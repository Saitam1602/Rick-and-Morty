import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { GETCHARACTERS } from "../../graphql/Queries";
import { Row, Col } from "antd";

const CharactersComponent = (props) => {
  const max_page = 42;
  const router = useRouter();

  const checkLimit = (page, max_page) => {
    if (typeof page === undefined) return undefined
    if (page > max_page) return 1;
    else return page;
  };

  const { error, loading, data } = useQuery(GETCHARACTERS, {
    variables: { page: checkLimit(parseInt(router.query.page), max_page) || 1 },
  });

  if (loading) return <div>loading</div>;

  return (
    <div>
      <Row gutter={[24, 24]}>
        <Col span={8}>a</Col>
        <Col span={8}>a</Col>
        <Col span={8}>a</Col>
        <Col span={8}>a</Col>
        <Col span={8}>a</Col>
      </Row>
      <h1>Characters</h1>
      <ul>
        {data.characters.results.map((item, index) => (
          <li key={index}>
            <h3>{item.name}</h3>
            <Link href={`/character/${item.name.replace(" ", "%20")}`}>
              <img src={item.image} width={300} height={300}></img>
            </Link>
            <p>Gender: {item.gender}</p>
            <p>Status: {item.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CharactersComponent;
