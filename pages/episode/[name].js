import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { GETEPISODEFROMNAME } from "../../graphql/Queries";

const Location = (props) => {
  const [name, setName] = useState("");
  const [episodeData, setEpisodeData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (props.name) setName(props.name);
    else setName(router.query.name.replace("%20", " "));
  }, [router.isReady]);

  const { error, loading, data } = useQuery(GETEPISODEFROMNAME, {
    variables: { name: name },
  });

  useEffect(() => {
    if (!loading) {
        console.log(data)
      setEpisodeData(data.episodes.results);
    }
  }, [data]);

  if (loading) return <div>loading...</div>;

  return (
    <div>
      {episodeData.map((item, index) => {
        return (
          <div key={index}>
            <h1>{item.name}</h1>
            {/* Numero ep, numero personaggi, elenco personaggi, data di uscita */}
          </div>
        );
      })}
    </div>
  );
};

export default Location;
