import Link from "next/link";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Rick and Morty</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div
        style={{
          display: "flex",
          position: "absolute",
          width: "100%",
          height: "100vh",
          backgroundImage: `url("https://i.pinimg.com/originals/31/66/f6/3166f6544e77a1f514890e459e44002e.jpg")`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          zIndex: -1,
        }}
      ></div>
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Link href="/characters">
          <h1
            style={{
              color: "white",
              fontSize: "60px",
              textTransform: "uppercase",
            }}
          >
            Characters
          </h1>
        </Link>
        <Link href="/locations">
          <h1
            style={{
              color: "#FFF",
              fontSize: "60px",
              textTransform: "uppercase",
            }}
          >
            Locations
          </h1>
        </Link>
        <Link href="/episodes">
          <h1
            style={{
              color: "white",
              fontSize: "60px",
              textTransform: "uppercase",
            }}
          >
            Episodes
          </h1>
        </Link>
      </div>
    </>
  );
}
