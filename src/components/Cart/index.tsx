import React from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Flex,
  Text,
  VStack,
} from "@chakra-ui/react";
import { IoAddSharp } from "react-icons/io5";
import { FiMinus } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateQuantity } from "../../utils/cartSlice";
import { Link } from "react-router-dom";
import products from "../../data/sample-data.json";

const Cart: React.FC = () => {
  const cartItems = useSelector((state: any) => state.cart?.items);
  const dispatch = useDispatch();

  const handleUpdateQuantity = (id: number, newQuantity: number) => {
    const product = products.products.find((p) => p.id === id);
    if (product && newQuantity <= product.stock) {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    } else {
      // Show an error message or toast notification
      console.log("Requested quantity not available");
    }
  };

  const handleRemoveItem = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total: any, item: any) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <>
      <Flex
        direction={["column", "row"]}
        p={5}
        gap={10}
        overflow={"hidden"}
        justifyContent={["space-between"]}
      >
        <Box flex={2} overflow={"auto"}>
          <Table
            variant="simple"
            borderBottom={"2px solid #ccc"}
            overflow={"auto"}
          >
            <Thead>
              <Tr>
                <Th>Product</Th>
                <Th>Price</Th>
                <Th>Quantity</Th>
                <Th>Subtotal</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {cartItems.map((item: any) => (
                <Tr key={item.id}>
                  <Td>{item.title}</Td>
                  <Td>${item.price.toFixed(2)}</Td>
                  <Td>
                    <Flex align="center">
                      <Button
                        size="sm"
                        onClick={() =>
                          handleUpdateQuantity(
                            item.id,
                            Math.max(1, item.quantity - 1)
                          )
                        }
                        isDisabled={item.quantity === 1}
                      >
                        <FiMinus />
                      </Button>
                      <Text mx={2}>{item.quantity}</Text>
                      <Button
                        size="sm"
                        onClick={() =>
                          handleUpdateQuantity(item.id, item.quantity + 1)
                        }
                        isDisabled={
                          item.quantity >=
                          (products.products.find((p) => p.id === item.id)
                            ?.stock || 0)
                        }
                        title={
                          item.quantity >=
                          (products.products.find((p) => p.id === item.id)
                            ?.stock ?? 0)
                            ? "Max stock reached"
                            : ""
                        }
                      >
                        <IoAddSharp />
                      </Button>
                    </Flex>
                  </Td>
                  <Td>${(item.price * item.quantity).toFixed(2)}</Td>
                  <Td>
                    <Button size="sm" onClick={() => handleRemoveItem(item.id)}>
                      <IoCloseOutline />
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
        <Box flex={1}>
          <VStack
            spacing={4}
            align="stretch"
            p={5}
            borderWidth={1}
            borderRadius="md"
          >
            <Text fontSize="xl" fontWeight="bold">
              Cart Totals
            </Text>
            <Flex justify="space-between">
              <Text>Subtotal:</Text>
              <Text fontWeight="bold">${calculateTotal().toFixed(2)}</Text>
            </Flex>
            <Box as="hr" borderColor="gray.200" my={2} mb={4} />
            <Flex justify="space-between">
              <Text fontWeight={"bold"}>Total:</Text>
              <Text fontWeight="bold">${calculateTotal().toFixed(2)}</Text>
            </Flex>
            <Link to="/thanks">
              <Button
                colorScheme="blue"
                size="lg"
                rounded={"full"}
                width={"100%"}
              >
                Proceed to Checkout
              </Button>
            </Link>
          </VStack>
        </Box>
      </Flex>
      {/* <Button colorScheme="red" size="sm" rounded={"md"}>
          <Link to="/">  Go to Home</Link>
          </Button> */}
    </>
  );
};

export default Cart;
