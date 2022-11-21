import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { GETLOCATIONS } from "../../graphql/Queries";

const LocationsComponent = (props) => {
  const max_page = 7;
  const [page, setPage] = useState("");
  const [locations, setLocations] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (props.page) setPage(props.page);
    else if (parseInt(router.query.page) > max_page)
      router.push("/locations/1");
    else setPage(parseInt(router.query.page));
  }, [router.isReady]);

  const { error, loading, data } = useQuery(GETLOCATIONS, {
    variables: { page: page },
  });

  useEffect(() => {
    if (!loading) {
      setLocations(data.locations.results);
    }
  }, [data]);

  if (loading) return <div>loading</div>;

  return (
    <div>
      <h1>Locations</h1>
      <ul>
        {locations.map((item, index) => (
          <li key={index}>
            <Link href={`/location/${item.name.replace(" ", "%20")}`}>
              <h3>{item.name}</h3>
            </Link>
            <Link href={`/location/${item.name.replace(" ", "%20")}`}>
              <h3>{item.type}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LocationsComponent;
