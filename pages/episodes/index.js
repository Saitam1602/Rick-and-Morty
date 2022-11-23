const Episodes = () => {
  return null;
};

export const getServerSideProps = () => {
  return {
    redirect: {
      permanent: false,
      destination: "/episodes/1",
    },
    props: {},
  };
};

export default Episodes;
