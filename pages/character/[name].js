import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { GETCHARACTERFROMNAME } from "../../graphql/Queries";

const Character = (props) => {
  const [name, setName] = useState("");
  const [characterData, setCharacterData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (props.name) setName(props.name);
    else setName(router.query.name.replace("%20", " "));
  }, [router.isReady]);

  const { error, loading, data } = useQuery(GETCHARACTERFROMNAME, {
    variables: { name: name },
  });

  useEffect(() => {
    if (!loading) {
      setCharacterData(data.characters.results)
      console.log(characterData)
    }
  }, [data]);

  if (loading) return <div>loading...</div>;

  return <div>{characterData.map(item =>{
    return <div><h1>
      {item.name}</h1>
      <img src={item.image}></img></div>})}</div>;
};

export default Character;
