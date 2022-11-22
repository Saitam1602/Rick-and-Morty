import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { GETEPISODEFROMNAME } from "../../graphql/Queries";

const Episode = (props) => {
  const router = useRouter();

  const { error, loading, data } = useQuery(GETEPISODEFROMNAME, {
    variables: { name: router.query.name },
  });

  if (loading) return <div>loading...</div>;

  console.log(data)

  return (
    <div>
      {data.episodes.results.map((item, index) => {
        return (
          <div key={index}>
            <h1>{item.name}</h1>
          </div>
        );
      })}
    </div>
  );
};

export default Episode;
