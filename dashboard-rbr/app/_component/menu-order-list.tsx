"use client";
import { useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { OrdenationType } from "./employee-list";

interface MenuOrderListProps {
  handleOrderChange: (orderning: OrdenationType) => void;
  orderning: OrdenationType;
}
const MenuOrderList = ({
  handleOrderChange,
  orderning,
}: MenuOrderListProps) => {
  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon />}
        fontSize="15px"
        gap={2}
      >
        Filter : {orderning}
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => handleOrderChange("asc")}>
          Lista em forma ascendent
        </MenuItem>
        <MenuItem onClick={() => handleOrderChange("desc")}>
          Lista em forma descendente
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default MenuOrderList;
