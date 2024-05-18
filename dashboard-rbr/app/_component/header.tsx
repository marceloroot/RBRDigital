"use client";
import React from "react";
import { Image } from "@chakra-ui/next-js";
import {
  Box,
  Button,
  Flex,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import Link from "next/link";

function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef<HTMLButtonElement | null>(null);
  return (
    <Flex justify="space-between" align="center" px={10}>
      <Box>
        <Image src="/Logo.svg" alt="logo" width={150} height={20} />
      </Box>
      <Box>
        <>
          <Button ref={btnRef} variant="outline" onClick={onOpen}>
            <HamburgerIcon />
          </Button>
          <Drawer
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
            finalFocusRef={btnRef}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Menu</DrawerHeader>

              <DrawerBody>
                <Flex flexDirection="column" gap={2}>
                  <Text fontSize="18px" fontWeight="600" cursor="pointer">
                    <Link href={`/`}>Home</Link>
                  </Text>
                  <Text fontSize="18px" fontWeight="600" cursor="pointer">
                    <Link href={`/create`}>Cadastro Funcionario</Link>
                  </Text>
                </Flex>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </>
      </Box>
    </Flex>
  );
}
export default Header;
