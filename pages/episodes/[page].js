import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { GETEPISODES } from "../../graphql/Queries";

const EpisodesComponent = (props) => {
  const max_page = 51;
  const [page, setPage] = useState("");
  const [episodes, setEpisodes] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (props.page) setPage(props.page);
    else if (parseInt(router.query.page) > max_page)
      router.push("/episodes/1");
    else setPage(parseInt(router.query.page));
  }, [router.isReady]);

  const { error, loading, data } = useQuery(GETEPISODES, {
    variables: { page: page },
  });

  useEffect(() => {
    if (!loading) {
      setEpisodes(data.episodes.results);
    }
  }, [data]);

  if (loading) return <div>loading</div>;

  return (
    <div>
      <h1>Episodes</h1>
      <ul>
        {episodes.map((item, index) => (
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
