import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { GETCHARACTERS } from "../../graphql/Queries";

const CharactersComponent = (props) => {
  const max_page = 42;
  const [page, setPage] = useState("");
  const [characters, setCharacters] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (props.page) setPage(props.page);
    else if (parseInt(router.query.page) > max_page)
      router.push("/characters/1");
    else setPage(parseInt(router.query.page));
  }, [router.isReady]);

  const { error, loading, data } = useQuery(GETCHARACTERS, {
    variables: { page: page },
  });

  useEffect(() => {
    if (!loading) {
      setCharacters(data.characters.results);
    }
  }, data);

  if (loading) return <div>loading</div>;

  return (
    <div>
      <h1>Characters</h1>
      <ul>
        {characters.map((item, index) => (
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
