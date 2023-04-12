import Nav from "./Components/Nav";
import ProductDetail from "./Components/ProductDetail";
import AddProduct from "./Components/AddProduct";
import CartItems from "./Components/CartItems";
import ProductItemList from "./Components/ProductItemList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addproducts } from "./actions/index";
import customFetch from "./apiCall";
import { useEffect } from "react";

function App() {
  // SUBSCRIBING ALL APP STATE AND USE NEEDED ITEMS FROM IT 
  let productDetailItem = useSelector((state) => state.itemToDisplay);

  // THIS IS USE FOR FAKE API DATA 
  const url = "https://my-json-server.typicode.com/jaiswalaryan/data/db";

  const dispatch = useDispatch();

  useEffect(() => {
    let response = customFetch(url, {
      method: "GET",
    });
    response.then((data) => {
      let modifiedData = data.products.map((item) => {
        item.edit = true;
        return item;
      });

      // ADDING DATA TO OUR LOCAL STORAGE 
      window.localStorage.setItem("products", JSON.stringify(modifiedData));
      // GETTING DATA FROM OUR LOCAL STORAGE 
      let products = JSON.parse(window.localStorage.getItem("products"));

      // DISPATCHING DATA 
      dispatch(addproducts(products));
    });
  }, []);

  return (
    <div className="App">
      // BECAUSE THIS APP HAVE MULTIPAGE FOR THAT WE NEED BROWSER ROUTER
      <BrowserRouter>
        {/* ACCESSING NAVBAR IN ALL OUR PAGE  */}
        <Nav />
        <Routes>
          {/* CREATING ROUTES  */}
          <Route path="/" element={<ProductItemList />} />
          <Route path="/addproducts" element={<AddProduct />} />
          <Route
            path={`/productdetails/${productDetailItem.id}`}
            element={<ProductDetail item={productDetailItem} />}
          />
          <Route path="/cart" element={<CartItems />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
