import {
  Button,
  Flex,
  Icon,
  IconButton,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import products from "../../data/sample-data.json";
import { BiReset } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import {
  addSearchText,
  addSelectedCategory,
  addSelectedSize,
} from "../../utils/searchSlice";
import { RootState } from "../../utils/appStore";
import { addToCart } from "../../utils/cartSlice";
import { useNavigate } from "react-router-dom";
import { resetQuantities } from "../../utils/tableSlice";
import { useIsMobile } from "../../utils/useIsMobileHook";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isMobile } = useIsMobile();

  const getSelectedCategory = useSelector(
    (store: RootState) => store.search.selectedCategory
  );
  const getSelectedSizes = useSelector(
    (store: RootState) => store.search.selectedSize
  );
  const getSearchText = useSelector(
    (store: RootState) => store.search.searchText
  );
  const cartItems = useSelector((store: RootState) => store.cart.items);
  const [selectedCategory, setSelectedCategory] =
    useState<string>(getSelectedCategory);
  const [selectedSize, setSelectedSize] = useState<string>(getSelectedSizes);
  const selectedProducts = useSelector(
    (store: RootState) => store.table?.selectedProducts
  );
  const quantities = useSelector((store: RootState) => store.table.quantities);
  const [searchItem, setSearchItem] = useState(getSearchText);
  const categories = products.categories.map((category) => {
    return { label: category.name, value: category.name };
  });

  const sizes = products.sizes.map((size) => {
    return { label: size.size, value: size.size };
  });

  const handleSearch = (t: string) => {
    dispatch(addSearchText(t));
  };

  const reset = () => {
    setSelectedCategory("");
    setSelectedSize("");
    setSearchItem("");
    dispatch(addSelectedSize(""));
    dispatch(addSelectedCategory(""));
    dispatch(addSearchText(""));
  };

  const handleAddToCart = () => {
    let allQuantitiesValid = true;
    let itemsAdded = false;
    selectedProducts.forEach((productId) => {
      const product = products.products.find((p) => p.id === productId);
      if (product) {
        const newQuantity = quantities[productId] || 0;
        const cartItem = cartItems.find((item) => item.id === productId);
        const currentCartQuantity = cartItem ? cartItem.quantity : 0;
        const totalQuantity = newQuantity + currentCartQuantity;

        if (totalQuantity > product.stock) {
          allQuantitiesValid = false;
          itemsAdded = true;
          alert(`
            Cannot add more than ${product.stock} items for ${product.title}. Current cart quantity for ${product.title}: ${currentCartQuantity}
          `);
        } else if (newQuantity > 0) {
          dispatch(
            addToCart({
              id: product.id,
              title: product.title,
              price: product.price,
              quantity: newQuantity,
            })
          );
          itemsAdded = true;
        } else {
          itemsAdded = false;
          allQuantitiesValid = false;
        }
      }
    });

    if (allQuantitiesValid && itemsAdded) {
      dispatch(resetQuantities());
      navigate("/cart");
    } else if (!itemsAdded) {
      alert("Please select at least one product and specify its quantity.");
    }
  };

  return (
    <Flex
      justifyContent={"space-between"}
      direction={["column", "column", "row"]}
      padding={["8px", "10px", "12px"]}
      gap={["10px", "12px", "16px"]}
    >
      <Flex
        gap={"10px"}
        alignItems={"center"}
        direction={["row", "row", "row"]}
        width={["100%", "100%", "auto"]}
        order={[1, 1, 2]}
      >
        <Flex alignItems="center" width={"100%"} gap={"10px"}>
          {!isMobile ? <Text>Search:</Text> : null}
          <Input
            width={"100%"}
            value={searchItem}
            placeholder="Search Product"
            onChange={(e) => {
              if (e.target.value === "") {
                setSearchItem(e.target.value);
                dispatch(addSearchText(""));
              } else {
                setSearchItem(e.target.value);
                handleSearch(e.target.value);
              }
            }}
          />
        </Flex>
        {/* <Link to="/cart"> */}
        <Button
          variant={"outline"}
          padding={"12px"}
          width={["40%", "40%", "70%"]}
          // marginLeft={["0px", "24px", "0px"]}
          colorScheme="blue"
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
        {/* </Link> */}
      </Flex>
      <Flex
        gap={"10px"}
        alignItems={"center"}
        direction={["row", "row", "row"]}
        width={["100%", "100%", "auto"]}
        order={[2, 2, 1]}
      >
        <Select
          placeholder="All Category"
          value={selectedCategory}
          onChange={(e) => {
            const ctg = e.target.value;
            setSelectedCategory(ctg);
            dispatch(addSelectedCategory(ctg));
          }}
          width={["100%", "100%", "auto"]}
        >
          {categories.map((category) => {
            return (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            );
          })}
        </Select>
        <Select
          placeholder="All Sizes"
          value={selectedSize}
          onChange={(e) => {
            const sz = e.target.value;
            setSelectedSize(sz);
            dispatch(addSelectedSize(sz));
          }}
          width={["100%", "100%", "auto"]}
        >
          {sizes.map((size) => {
            return (
              <option key={size.value} value={size.value}>
                {size.label}
              </option>
            );
          })}
        </Select>
        <IconButton
          aria-label="reset"
          colorScheme="black"
          variant={"unstyled"}
          onClick={reset}
          icon={<Icon as={BiReset} color={"black"} size={"md"} />}
        />
      </Flex>
    </Flex>
  );
};

export default Header;
