import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { GETCHARACTERFROMNAME } from "../../graphql/Queries";

const Character = () => {
  const router = useRouter();

  const { error, loading, data } = useQuery(GETCHARACTERFROMNAME, {
    variables: { name: router.query.name },
  });

  if (loading) return <div>loading...</div>;
  
  return (
    <div>
      {data.characters.results.map((item, index) => {
        return (
          <div key={index}>
            <h1>{item.name}</h1>
            <img src={item.image}></img>
          </div>
        );
      })}
    </div>
  );
};

export default Character;
