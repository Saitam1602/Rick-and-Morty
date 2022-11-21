import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { GETLOCATIONFROMNAME } from "../../graphql/Queries";

const Location = (props) => {
  const [name, setName] = useState("");
  const [locationData, setLocationData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (props.name) setName(props.name);
    else setName(router.query.name.replace("%20", " "));
  }, [router.isReady]);

  const { error, loading, data } = useQuery(GETLOCATIONFROMNAME, {
    variables: { name: name },
  });

  useEffect(() => {
    if (!loading) {
      setLocationData(data.locations.results[0].residents);
    }
  }, [data]);

  if (loading) return <div>loading...</div>;

  return (
    <div>
      {locationData.map((item, index) => {
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
