import { useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { GETCHARACTERS } from "../../graphql/Queries";
import {
  Row,
  Col,
  Card,
  AutoComplete,
  Space,
  Typography,
  Pagination,
} from "antd";
import slugify from "slugify";
import { Loading } from "../loading";

const { Title } = Typography;
const { Paragraph } = Typography;

const Characters = () => {
  const max_page = 42;
  const router = useRouter();
  const [value, setValue] = useState("");
  const [options, setOptions] = useState([]);

  const listAutocomplete = (str, maxLength) => {
    let list = [];
    for (let i = 0; i < maxLength; i++) {
      let strResult = extractAutocomplete(str, i);
      if (strResult.value !== null) {
        list = [...list, strResult];
      } else break;
    }
    return list;
  };

  const extractAutocomplete = (str, repeat) => {
    const results = data.characters.results.filter((item) =>
      item.name.toLowerCase().startsWith(str.toLowerCase())
    );
    if (results[repeat]) return { value: results[repeat].name };
    else return { value: null };
  };

  const onSearch = (searchText) => {
    setOptions(!searchText ? [] : listAutocomplete(searchText, 3));
  };

  const onChange = (text) => {
    setValue(text);
  };

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

  if (loading) return <Loading></Loading>;

  console.log(data);

  const filteredData = data.characters.results.filter((item) =>
    item.name.toLowerCase().startsWith(value.toLowerCase())
  );

  return (
    <Space direction="vertical" size={30}>
      <Space
        direction="vertical"
        size={30}
        style={{ width: "100%", justifyContent: "center", alignItems: "center"}}
      >
        <Title>Characters</Title>
        <AutoComplete
          options={options}
          onChange={onChange}
          onSearch={onSearch}
          style={{ width: 450 }}
        ></AutoComplete>
      </Space>
      <Row gutter={[24, 24]}>
        {filteredData.map((item, index) => {
          return (
            <Link
              href={`/character/${slugify(`${item.name} ${item.id}`, {
                lower: true,
              })}`}
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
