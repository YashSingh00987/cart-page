import React from "react";
import Header from "./components/Header";
import { ChakraProvider } from "@chakra-ui/react";
import ProductTable from "./components/Table";
import Cart from "./components/Cart";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";

import { createBrowserRouter, RouterProvider} from "react-router-dom";
import ThankYou from "./components/redirect";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <ProductTable />
      </>
    ),
  },
  {
    path: "/cart",
    element: (
      <>
        <Cart />
      
      </>
    ),
  },
  {
    path: "/thanks",
    element: (
      <>
        <ThankYou/>
      
      </>
    ),
  },
]);




const App: React.FC = () => {
  return (
    <Provider store={appStore}>
      <ChakraProvider>
        <RouterProvider router={router} />
      </ChakraProvider>
    </Provider>
  );
};

export default App;