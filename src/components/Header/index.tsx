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
import { addSearchText, addSelectedCategory, addSelectedSize } from "../../utils/searchSlice";
import { RootState } from "../../utils/appStore";
import { addToCart } from "../../utils/cartSlice";
import { Link } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch()
  
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const selectedProducts = useSelector((store:RootState) => store.table?.selectedProducts)
  const quantities = useSelector((store:RootState) => store.table.quantities)
  const categories = products.categories.map((category) => {
    return { label: category.name, value: category.name };
  });
  


  const sizes = products.sizes.map((size) => {
    return { label: size.size, value: size.size };
  });
  


 
  const[searchItem, setSearchItem] = useState("");
  const handleSearch = () => {
    dispatch(addSearchText(searchItem));
  };

  const reset = () => {
    setSelectedCategory("") 
    setSelectedSize(""); 
    dispatch(addSelectedSize(""));
    dispatch(addSelectedCategory(""));

  }

  const handleAddToCart = () => {
    selectedProducts.forEach((productId) => {
      const product = products.products.find((p) => p.id === productId);
      if (product) {
        const quantity = quantities[productId] || 1;
        dispatch(addToCart({
          id: product.id,
          title: product.title,
          price: product.price,
          quantity: quantity,
        }));
      }
    });
    
  };

 
  return (
    <Flex justifyContent={"space-between"} padding={"16px"}>
      <Flex gap={"10px"} alignItems={"center"}>
        <Select
          placeholder="All Category"
          value={selectedCategory}
          onChange={
             (e) => {
                const ctg = e.target.value;
                setSelectedCategory(ctg);
                dispatch(addSelectedCategory(ctg));
          }
          }
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
      <Flex gap={"10px"} alignItems={"center"}>
        <Text>Search:</Text>
        <Input defaultValue={searchItem} placeholder="Search Product" 
        onChange={(e) => {
          if(e.target.value === ""){
            dispatch(addSearchText(""));
          }
          else {
          setSearchItem(e.target.value);
          }}}
        onKeyDown={(e) => {
          if(e.key === "Enter"){
            handleSearch();
          }
        }}
        />
        <Link to="/cart">
        <Button
          variant={"outline"}
          padding={"12px"}
          width={"100%"}
          colorScheme="blue"
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
        </Link>
      </Flex>
    </Flex>
  );
};

export default Header;
