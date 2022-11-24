// import styles from "../styles/Home.module.css";
import { Space, Typography, Image } from "antd";
import Link from "next/link";

const { Title } = Typography;

export default function Home() {
  return (
    <>
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
      <Space
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Link href="/characters">
          <h1 style={{ color: "white", fontSize: "100px", textTransform: "uppercase" }}>Characters</h1>
        </Link>
        <Link href="/locations">
          <h1 style={{ color: "#FFF", fontSize: "100px", textTransform: "uppercase" }}>Locations</h1>
        </Link>
        <Link href="/episodes">
          <h1 style={{ color: "white", fontSize: "100px", textTransform: "uppercase" }}>Episodes</h1>
        </Link>
      </Space>
    </>
  );
}
