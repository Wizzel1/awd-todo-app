import { Box, ColorModeScript } from "@chakra-ui/react";
import Head from "next/head";
import { SWRConfig } from "swr";
import { theme } from "../../theme";
import MenuContainer from "../Navigation/MenuContainer";

const Layout = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  return (
    <SWRConfig>
      <Head>
        <title>{title || "TaskTango"}</title>
      </Head>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Box
        h="100%"
        w="100%"
        justifyContent="center"
        alignItems="center"
        position="absolute"
        display={{ base: "flex", md: "flex" }} // flex layout on medium and larger screens
        flexDirection={{ base: "column-reverse", md: "row" }} // column layout on smaller screens
        gap={["0px", "8px"]}
      >
        <MenuContainer />
        {children}
      </Box>
    </SWRConfig>
  );
};

export default Layout;
