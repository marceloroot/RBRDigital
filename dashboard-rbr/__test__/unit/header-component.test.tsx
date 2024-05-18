// __tests__/Header.test.tsx

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import { ChakraProvider } from "@chakra-ui/react";
import Header from "@/app/_component/header";

describe("Header component", () => {
  test("renders the logo", () => {
    render(
      <ChakraProvider>
        <Header />
      </ChakraProvider>,
    );
    const logo = screen.getByAltText("logo");

    expect(logo).toBeTruthy(); // Alternatively, use Jest's toBeTruthy
  });

  test("opens the drawer when the hamburger button is clicked", () => {
    render(
      <ChakraProvider>
        <Header />
      </ChakraProvider>,
    );
    const button = screen.getByRole("button");
    fireEvent.click(button);
    const drawerHeader = screen.getByText("Menu");
    expect(drawerHeader).toBeTruthy(); // Use toBeTruthy from Jest
  });

  test("drawer contains the expected menu items", () => {
    render(
      <ChakraProvider>
        <Header />
      </ChakraProvider>,
    );
    const button = screen.getByRole("button");
    fireEvent.click(button);
    const homeItem = screen.getByText("Home");
    const cadastroItem = screen.getByText("Cadastro Funcionario");
    expect(homeItem).toBeTruthy(); // Use toBeTruthy from Jest
    expect(cadastroItem).toBeTruthy(); // Use toBeTruthy from Jest
  });
});
