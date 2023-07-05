import React from "react";
import { Navbar, Text } from "@nextui-org/react";
import { Box } from "../common/Box";

export const NavBar = () => {
  return (
    <Box
      css={{
        maxW: "100%",
      }}
    >
      <Navbar isBordered variant="static">
        <Navbar.Brand>
          <Text b color="inherit" hideIn="xs">
            Coin
          </Text>
        </Navbar.Brand>
      </Navbar>
    </Box>
  );
};
