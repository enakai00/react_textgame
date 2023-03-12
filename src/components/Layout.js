import React from "react";
import { Container, Stack, Box, Button } from "@chakra-ui/react";

import { Game } from "./Game";


export const Layout = (props) => {

  const reset = () => {
  }

  const element = (
    <Container maxW='1000' paddingTop="5">
      <Stack spacing="1">
        <Box>
          <Game/>
        </Box>
      <Box>
        <Button colorScheme="red" size="sm"
                onClick={reset}>Reset</Button>
      </Box>
      </Stack>
    </Container>
  );

  return element;
}
