"use client";
import {
  Box,
  Button,
  Flex,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import MenuOrderList from "./menu-order-list";
import Search from "./search";
import { EditIcon } from "@chakra-ui/icons";
import DialogDelete from "./dialog-delete";
import RoundButtonFixed from "./rounded-button-fixed";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { GET } from "../api/employee-list";
import Link from "next/link";

interface employeesI {
  id: string;
  name: string;
  role: string;
  department: string;
}
export type OrdenationType = "asc" | "desc";
const EmployeeList = () => {
  const [skip, setSkipped] = useState(1);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [searchOrder, setsearchOrder] = useState("");
  const [ordering, setOrdering] = useState<OrdenationType>("asc");
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ["employees", , skip, search, searchOrder, searchOrder],
    queryFn: () => GET(skip, filter, searchOrder),
  });

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };
  const handleOrderChange = (orderingChange: OrdenationType) => {
    setOrdering(orderingChange);
  };

  const handelClickSearcher = () => {
    setSearch(filter);
    setsearchOrder(ordering);
  };

  if (isPending) {
    return (
      <Box padding="6" boxShadow="lg" bg="white">
        <SkeletonCircle size="10" />
        <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
      </Box>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center">
        Error: {error.message}
      </div>
    );
  }

  return (
    <Flex direction="column" height="100vh">
      <Flex justifyContent="flex-end" alignItems="center" mb={4} gap={2}>
        <Search
          handleClickSearch={handelClickSearcher}
          handleFilter={handleFilter}
          filter={filter}
        />
        <MenuOrderList
          orderning={ordering}
          handleOrderChange={handleOrderChange}
        />
      </Flex>
      <Flex flex="1" overflowY="auto">
        <TableContainer width="100%">
          <Table variant="simple" size="lg">
            <TableCaption>Lista de Funcionarios</TableCaption>
            <Thead>
              <Tr>
                <Th>Nome</Th>
                <Th>Cargo</Th>
                <Th>Departamento</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data?.map((employ: employeesI) => (
                <Tr key={employ.id}>
                  <Td>{employ.name}</Td>
                  <Td>{employ.role}</Td>
                  <Td>{employ.department}</Td>

                  <Td display="flex" gap={7}>
                    <Link href={`/update/${employ.id}`}>
                      <EditIcon
                        fontSize={20}
                        color="blue.700"
                        cursor={"pointer"}
                      />
                    </Link>
                    <Box>
                      <DialogDelete employeeId={employ.id} refetch={refetch} />
                    </Box>
                  </Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>Nome</Th>
                <Th>Cargo</Th>
                <Th>Departamento</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </Flex>
      <Flex justifyContent="center" mt={2} alignItems="center" gap={10}>
        <Button onClick={() => setSkipped((old) => Math.max(old - 1, 1))}>
          Anterior
        </Button>
        <span>{skip}</span>
        <Button
          onClick={() =>
            setSkipped((old) => (data.length - 1 >= 0 ? old + 1 : old))
          }
        >
          Próxima
        </Button>
      </Flex>
      <RoundButtonFixed />
    </Flex>
  );
};

export default EmployeeList;
