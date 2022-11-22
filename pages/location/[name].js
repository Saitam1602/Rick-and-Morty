import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { GETLOCATIONFROMNAME } from "../../graphql/Queries";

const Location = () => {
  const router = useRouter();

  const { error, loading, data } = useQuery(GETLOCATIONFROMNAME, {
    variables: { name: router.query.name},
  });

  if (loading) return <div>loading...</div>;

  return (
    <div>
      {data.locations.results[0].residents.map((item, index) => {
        return (
          <div key={index}>
            <h1>{item.name}</h1>
            <img src={item.image}></img>
            <p>Gender: {item.gender}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Location;
