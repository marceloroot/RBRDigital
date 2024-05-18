import { baseUrl, takeBase } from "@/config/base";

const GET = async (skip: number, filter: string, serchOrder: string) => {
  const url = `${baseUrl}/api/employees?page=${skip}&size=${takeBase}&filter=${filter}&sortorder=${serchOrder}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });

  if (response.statusText === "Unauthorized") {
    throw new Error("Você não tem autorização");
  }

  if (!response.ok) {
    throw new Error("Conexão com a rede está com problema");
  }

  const employees = await response.json();

  return employees;
};

export { GET };
