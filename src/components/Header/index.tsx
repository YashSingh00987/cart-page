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
import {  useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  

  const getSelectedCategory = useSelector((store: RootState) => store.search.selectedCategory);
  const getSelectedSizes = useSelector((store: RootState) => store.search.selectedSize);  
  const getSearchText = useSelector((store: RootState) => store.search.searchText);
  
  const [selectedCategory, setSelectedCategory] = useState<string>(getSelectedCategory);
  const [selectedSize, setSelectedSize] = useState<string>(getSelectedSizes);
  const selectedProducts = useSelector((store:RootState) => store.table?.selectedProducts)
  const quantities = useSelector((store:RootState) => store.table.quantities)
  const[searchItem, setSearchItem] = useState(getSearchText);
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
    setSelectedCategory("") 
    setSelectedSize(""); 
    setSearchItem("");
    dispatch(addSelectedSize(""));
    dispatch(addSelectedCategory(""));
    dispatch(addSearchText(""));

  }

  const handleAddToCart = () => {
    let allQuantitiesAvailable = true;
  selectedProducts.forEach((productId) => {
    const product = products.products.find((p) => p.id === productId);
    if (product) {
      const quantity = quantities[productId];
      if (quantity) {
        dispatch(addToCart({
          id: product.id,
          title: product.title,
          price: product.price,
          quantity: quantity,
        }));
      } else {
        allQuantitiesAvailable = false;
        alert("Please select quantity for all selected products");
      }
    }
  });
  
  if (allQuantitiesAvailable) {
    navigate("/cart");
  }
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
        <Input value={searchItem} placeholder="Search Product" 
        onChange={(e) => {
          if(e.target.value === ""){
            dispatch(addSearchText(""));
          }
          else {
          setSearchItem(e.target.value);
          handleSearch(e.target.value);
          }}}
        
        />
        
        {/* <Link to="/cart"> */}
        <Button
          variant={"outline"}
          padding={"12px"}
          width={"100%"}
          colorScheme="blue"
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
        {/* </Link> */}
      </Flex>
    </Flex>
  );
};

export default Header;
