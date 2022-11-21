import { useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { GETCHARACTERS } from "../../graphql/queries";

const Episode = () => {
  const { error, loading, data } = useQuery(GETCHARACTERS);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return <h1>Episode</h1>;
};

export default Episode;
