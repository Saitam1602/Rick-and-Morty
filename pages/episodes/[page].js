import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { GETEPISODES } from "../../graphql/Queries";

const EpisodesComponent = (props) => {
  const max_page = 51;
  const router = useRouter();

  const checkLimit = (page, max_page) => {
    if (typeof page === undefined) return undefined;
    if (page > max_page) return 1;
    else return page;
  };

  const { error, loading, data } = useQuery(GETEPISODES, {
    variables: { page: checkLimit(parseInt(router.query.page), max_page) || 1 },
  });

  if (loading) return <div>Loading...</div>;

  console.log(data)

  return (
    <div>
      <h1>Episodes</h1>
      <ul>
        {data.episodes.results.map((item, index) => (
          <li key={index}>
            <Link href={`/episode/${item.name.replace(" ", "%20")}`}>
              <h3>{item.name}</h3>
            </Link>
            <Link href={`/episode/${item.name.replace(" ", "%20")}`}>
              <h3>{item.episode}</h3>
            </Link>
            <Link href={`/episode/${item.name.replace(" ", "%20")}`}>
              <h3>{item.characters.length}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EpisodesComponent;
