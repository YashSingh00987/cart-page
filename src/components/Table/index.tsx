import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Image,
  Text,
  Box,
  HStack,
  Checkbox,
  IconButton,
  Input,
  Flex,
} from "@chakra-ui/react";
import sampleData from "../../data/sample-data.json";
import { FaShoppingCart } from "react-icons/fa";
import { HiEmojiHappy, HiEmojiSad } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../utils/appStore";
import { updateQuantity, toggleSelectedProduct } from "../../utils/tableSlice";
import { useNavigate } from "react-router-dom";

const ProductTable = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const navigate = useNavigate();
  const getCartQuantity = (productId: number) => {
    const item = cartItems.find((item) => item.id === productId);
    return item ? item.quantity : 0;
  };
  const searchItem = useSelector((store: RootState) => store.search.searchText);
  const selectedCategory = useSelector(
    (store: RootState) => store.search.selectedCategory
  );
  const selectedSize = useSelector(
    (store: RootState) => store.search.selectedSize
  );

  const selectedProducts = useSelector(
    (store: RootState) => store.table.selectedProducts
  );

  const handleQuantityChange = (productId: number, quantity: number) => {
    dispatch(updateQuantity({ id: productId, quantity }));
  };

  const handleCheckboxChange = (productId: number) => {
    dispatch(toggleSelectedProduct(productId));
  };

  const products = sampleData.products.filter((product) => {
    const matchesSearch = product.title
      .toLocaleLowerCase()
      .includes(searchItem.toLocaleLowerCase());
    const matchesCategory = product.category
      .toLocaleLowerCase()
      .includes(selectedCategory.toLocaleLowerCase());
    const matchesSize = product.size
      .toLocaleLowerCase()
      .includes(selectedSize.toLocaleLowerCase());

    return matchesSearch && matchesCategory && matchesSize;
  });

  return (
    <Box padding={6}>
      <TableContainer>
        <Table variant="simple" colorScheme="teal" size="lg">
          <Thead background={"lightgray"}>
            <Tr>
              <Th>Image</Th>
              <Th>Name</Th>
              <Th>Color</Th>
              <Th>Description</Th>
              <Th>Category</Th>
              <Th isNumeric>Price</Th>
              <Th>Stock</Th>
              <Th>Brand</Th>
              <Th>Buy</Th>
            </Tr>
          </Thead>
          <Tbody>
            {products.map((product) => (
              <Tr key={product.id}>
                <Td>
                  <Image
                    src={product.images}
                    alt={product.title}
                    boxSize="50px"
                    objectFit="cover"
                  />
                </Td>
                <Td>{product.title}</Td>
                <Td>{product.color}</Td>
                <Td>{product.description}</Td>
                <Td>{product.category}</Td>
                <Td isNumeric>${product.price}</Td>
                <Td>
                  {product.stock > 0 ? (
                    <Flex color={"green.500"} align={"center"}>
                      <HiEmojiHappy />
                      <Text paddingLeft={"5px"} color={"green.500"}>
                        {" "}
                        In Stock
                      </Text>
                    </Flex>
                  ) : (
                    <Flex color={"red.500"} align={"center"}>
                      <HiEmojiSad />
                      <Text paddingLeft={"5px"} color={"red.500"}>
                        {" "}
                        Out of Stock
                      </Text>
                    </Flex>
                  )}
                </Td>
                <Td>{product.brand}</Td>
                <Td>
                  <HStack spacing={2}>
                    <Input
                      type="number"
                      // value={quantities[product.id] || 0}
                      isDisabled={product.stock === 0}
                      onChange={(e) => {
                        if (parseInt(e.target.value) > product.stock) {
                          alert(
                            `Maximum stock for this product:${product.stock}`
                          );
                          e.target.value = "";
                        } else {
                          handleQuantityChange(
                            product.id,
                            parseInt(e.target.value)
                          );
                        }
                      }}
                      min={0}
                      max={product.stock}
                      width="60px"
                      size="sm"
                    />
                    <Box position="relative">
                      {getCartQuantity(product.id) > 0 && (
                        <Text
                          position="absolute"
                          top="-8px"
                          right="-8px"
                          bg="red.500"
                          color="white"
                          borderRadius="full"
                          w="20px"
                          h="20px"
                          fontSize="xs"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          zIndex={1}
                        >
                          {getCartQuantity(product.id)}
                        </Text>
                      )}
                      <IconButton
                        aria-label="Add to cart"
                        icon={<FaShoppingCart />}
                        size="sm"
                        colorScheme="teal"
                        onClick={() => navigate("/cart")}
                      />
                    </Box>

                    <Checkbox
                      isChecked={selectedProducts.includes(product.id)}
                      onChange={() => handleCheckboxChange(product.id)}
                      isDisabled={product.stock === 0}
                    />
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ProductTable;
