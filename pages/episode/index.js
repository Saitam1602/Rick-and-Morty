const EpisodeComponent = () => {
    return null;
}

export const getServerSideProps = () => {
    return {
        redirect: {
          permanent: false,
          destination: "/episode/Pilot",
        },
        props:{},
      };
}

export default EpisodeComponent