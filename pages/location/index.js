const LocationComponent = () =>{
    return null
}

export const getServerSideProps = () => {
    return {
        redirect: {
          permanent: false,
          destination: "/location/Earth%20(C-137)",
        },
        props:{},
      };
}

export default LocationComponent