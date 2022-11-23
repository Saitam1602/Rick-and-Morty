const LocationsComponent = () => {
  return null;
};

export const getServerSideProps = () => {
  return {
    redirect: {
      permanent: false,
      destination: "/locations/1",
    },
    props: {},
  };
};

export default LocationsComponent;
