import Header from "@/app/_component/header";
import { Box } from "@chakra-ui/react";
import UpldateEmployee from "./_component/upldate-employee";

const Update = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <Box
        boxShadow="0px 2px 4px rgba(0, 0, 0, 0.1)" // Sombra
        borderBottom="2px solid rgba(0, 0, 0, 0.1)" // Borda na parte inferior
      >
        <Header />
      </Box>
      <Box px={10} py={10}>
        <UpldateEmployee employeeId={params.id} />
      </Box>
    </>
  );
};

export default Update;
