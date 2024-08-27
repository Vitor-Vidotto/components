import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from '@chakra-ui/react'
import '@fontsource/raleway/700.css'

const theme = extendTheme({
  fonts: {
    heading: `'Raleway'`,
    body: `'Open Sans', sans-serif`,
  },
})

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme} >
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
