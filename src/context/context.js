import React, { createContext, useState, useEffect } from "react";
import { linkData } from "./linkData";
import { socialData } from "./socialData";
// import { items } from "./productData";
import { client } from "./contentful";

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  // state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidecartOpen, setIsSidecartOpen] = useState(false);
  const [links, setLinks] = useState(linkData);
  const [socialLinks, setSocialLinks] = useState(socialData);
  // products
  const [cart, setCart] = useState([]);
  const [cartItems, setCartItems] = useState(0);
  const [cartSubTotal, setCartSubTotal] = useState(0);
  const [cartTax, setCartTax] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [storeProducts, setStoreProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [singleProducts, setSingleProducts] = useState({});
  const [loading, setLoading] = useState(true);
  // filter
  const [filters, setFilters] = useState({
    search: "",
    company: "all",
    price: 0,
    min: 0,
    max: 0,
    shipping: false,
  });

  // useEffect for PRODUCT
  useEffect(() => {
    // setProducts(items);

    // fetch products from Contentful
    client
      .getEntries({ content_type: "techShopProducts" })
      .then((res) => setProducts(res.items))
      .catch(console.error);
  }, []);

  // useEffect for CART
  useEffect(() => {
    addTotals();
    syncLocalStorage();
  }, [cart]);

  // useEffect for FILTER
  useEffect(() => {
    sortData();
  }, [filters]);

  ///////// START - PRODUCTS FUNCTIONALITY
  // format the Contentful products data and set Data
  const setProducts = (products) => {
    // all products
    let storeProducts = products.map((item) => {
      const { id } = item.sys;
      const image = item.fields.image.fields.file.url;
      const product = { id, ...item.fields, image };
      return product;
    });

    // featured products
    let featuredProducts = storeProducts.filter(
      (item) => item.featured === true
    );

    // get Max price
    let maxPrice = Math.max(...storeProducts.map((item) => item.price));

    setStoreProducts(storeProducts);
    setFilteredProducts(storeProducts);
    setFeaturedProducts(featuredProducts);
    setSingleProducts(getStorageProduct());
    setCart(getLocalStorageCart());
    setLoading(false);
    setFilters({ ...filters, price: maxPrice, max: maxPrice });
  };

  // get single product from localStorage
  const getStorageProduct = () => {
    return localStorage.getItem("singleProduct")
      ? JSON.parse(localStorage.getItem("singleProduct"))
      : {};
  };

  // get cart from localStorage
  const getLocalStorageCart = () => {
    let cart;

    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    } else {
      cart = [];
    }
    return cart;
  };

  // get totals
  const getTotals = () => {
    let subTotal = 0;
    let cartItems = 0;
    cart.forEach((item) => {
      subTotal += item.total;
      cartItems += item.count;
    });

    subTotal = parseFloat(subTotal.toFixed(2));
    let tax = subTotal * 0.2;
    tax = parseFloat(tax.toFixed(2));
    let total = subTotal + tax;
    total = parseFloat(total.toFixed(2));

    return { cartItems, subTotal, tax, total };
  };

  // add totals
  const addTotals = () => {
    const totals = getTotals();

    setCartItems(totals.cartItems);
    setCartSubTotal(totals.subTotal);
    setCartTax(totals.tax);
    setCartTotal(totals.total);
  };

  // sync localStorage for cart
  const syncLocalStorage = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  // add to cart
  const addToCart = (id) => {
    let tempCart = [...cart];
    let tempProducts = [...storeProducts];

    // find item in Cart
    let tempItem = tempCart.find((item) => item.id === id);

    // if no item in Cart
    if (!tempItem) {
      // find item in AllProducts
      tempItem = tempProducts.find((item) => item.id === id);
      let total = tempItem.price;
      // create new Item in Cart
      let cartItem = { ...tempItem, count: 1, total };
      tempCart = [...tempCart, cartItem];
    }
    // found item in Cart
    else {
      tempItem.count++;
      tempItem.total = tempItem.price * tempItem.count;
      tempItem.total = parseFloat(tempItem.total.toFixed(2));
    }

    // set State
    setCart(tempCart);
  };

  //set single Product and store in localStorage
  const setSingleProduct = (id) => {
    let product = storeProducts.find((item) => item.id === id);

    localStorage.setItem("singleProduct", JSON.stringify(product));
    setSingleProducts({ ...product });
    setLoading(false);
  };
  ///////// END - PRODUCTS FUNCTIONALITY

  ///////// START - CART FUNCTIONALITY
  // increment
  const increment = (id) => {
    let tempCart = [...cart];
    const cartItem = tempCart.find((item) => item.id === id);
    cartItem.count++;
    cartItem.total = cartItem.price * cartItem.count;
    cartItem.total = parseFloat(cartItem.total.toFixed(2));

    setCart(tempCart);
  };

  // decrement
  const decrement = (id) => {
    let tempCart = [...cart];
    const cartItem = tempCart.find((item) => item.id === id);
    if (cartItem.count > 1) {
      cartItem.count--;
      cartItem.total = cartItem.price * cartItem.count;
      cartItem.total = parseFloat(cartItem.total.toFixed(2));
    } else {
      // remove
      tempCart = tempCart.filter((item) => item.id !== id);
    }

    setCart(tempCart);
  };

  // remove Item
  const removeItem = (id) => {
    let tempCart = [...cart];
    tempCart = tempCart.filter((item) => item.id !== id);

    setCart(tempCart);
  };

  // clearCart
  const clearCart = () => {
    setCart([]);
  };
  ///////// END - CART FUNCTIONALITY

  ///////// START - NAVBAR/SIDEBAR FUNCTIONALITY
  // toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // toggle sidecart
  const toggleSidecart = () => {
    setIsSidecartOpen(!isSidecartOpen);
  };

  // open cart
  const openCart = () => {
    setIsSidecartOpen(true);
  };

  // close cart
  const closeCart = () => {
    setIsSidecartOpen(false);
  };
  ///////// END - NAVBAR/SIDEBAR FUNCTIONALITY

  ///////// START - FILTERING FUNCTIONALITY
  // 1. Handle change
  const handleChange = (e) => {
    const name = e.target.name;
    const type = e.target.type;
    const value = e.target.value;

    // console.log(name, type, value);

    let filterValue;
    if (type === "checkbox") {
      filterValue = e.target.checked;
    } else {
      filterValue = value;
    }

    setFilters({ ...filters, [name]: filterValue });
  };

  // 2. Handle filtering
  const sortData = () => {
    const { search, company, price, shipping } = filters;
    let tempPrice = parseInt(price);

    let tempProducts = [...storeProducts];

    // filtering based on price
    tempProducts = tempProducts.filter((item) => item.price <= tempPrice);

    // filtering based on company
    if (company !== "all") {
      tempProducts = tempProducts.filter((item) => item.company === company);
    }

    // filtering based on shipping
    if (shipping) {
      tempProducts = tempProducts.filter((item) => item.freeShipping === true);
    }

    // filtering based on title
    if (search.length > 0) {
      tempProducts = tempProducts.filter((item) => {
        let tempSearch = search.toLowerCase();
        let tempTitle = item.title.toLowerCase().slice(0, search.length);

        if (tempSearch === tempTitle) {
          return item;
        }
      });
    }

    setFilteredProducts(tempProducts);
  };
  ///////// END - FILTERING FUNCTIONALITY

  return (
    <ProductContext.Provider
      value={{
        isSidebarOpen,
        isSidecartOpen,
        cartItems,
        links,
        socialLinks,
        storeProducts,
        featuredProducts,
        filteredProducts,
        singleProducts,
        cart,
        cartTotal,
        cartSubTotal,
        cartTax,
        loading,
        filters,
        toggleSidebar,
        toggleSidecart,
        openCart,
        closeCart,
        addToCart,
        setSingleProduct,
        increment,
        decrement,
        removeItem,
        clearCart,
        handleChange,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export { ProductProvider, ProductContext };
