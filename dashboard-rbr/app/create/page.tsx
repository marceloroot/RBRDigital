import { Box } from "@chakra-ui/react";
import CreateEmployee from "./_component/create-employee";
import Header from "../_component/header";

const Create = () => {
  return (
    <>
      <Box
        boxShadow="0px 2px 4px rgba(0, 0, 0, 0.1)" // Sombra
        borderBottom="2px solid rgba(0, 0, 0, 0.1)" // Borda na parte inferior
      >
        <Header />
      </Box>
      <Box px={10} py={10}>
        <CreateEmployee />
      </Box>
    </>
  );
};

export default Create;
