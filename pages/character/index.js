const CharacterComponent = () =>{
    return null
}

export const getServerSideProps = () => {
    return {
        redirect: {
          permanent: false,
          destination: "/character/Rick%20Sanchez",
        },
        props:{},
      };
}

export default CharacterComponent