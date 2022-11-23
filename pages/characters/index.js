const CharactersComponent = () => {
  return null;
};

export const getServerSideProps = () => {
  return {
    redirect: {
      permanent: false,
      destination: "/characters/1",
    },
    props: {},
  };
};

export default CharactersComponent;
