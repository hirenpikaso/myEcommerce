import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { fetchProductsAction } from "../../Action";
import { store } from "../../store";
import Product from "./Product";
import { useParams } from "react-router-dom";
import CategoriesNav from "../CategoriesNav/CategoriesNav";
import {
  ProductsPage,
  ProductsSection,
  CategoriesLeft,
} from "./Products.style";
import "./Products.style.scss";
import axios from "axios";
import { useDebounce } from "../customHooks/useDebounce";
import { getCharacter } from "../../utils/getCharacter";
import { SearchBarContext } from "../../contexts/searchBarContext";

const productsStore = (state) => state.products.map((product) => product);

function Products() {
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [openCategories, setOpenCategories] = useState(false);

  // const [loading, setLoading] = useState(false);
  const ProductsSelect = useSelector(productsStore);

  const { query } = useContext(SearchBarContext);
  const searchQuery = useDebounce(query, 2000);

  useEffect(() => {
    store.dispatch(fetchProductsAction());
  }, []);
  useEffect(() => {
    if (query === "") {
      if (params.id) {
        // show products category wise
        const getCat = ProductsSelect.filter((product) => {
          return Number(params.id) === product.categoryId;
        }).map((product) => {
          return <Product key={product.id} product={product} />;
        });
        setProducts(getCat);
        // searchCharacter();
      } else {
        // Show all products
        // const getCat = ProductsSelect.map((product) => (
        //   <Product key={product.id} product={product} />
        // ));
        // setProducts(getCat);
      }
    }
  }, [ProductsSelect, params]);
  // For search functionality/Debouncing
  useEffect(() => {
    // setListing("");
    searchCharacter();
    async function searchCharacter() {
      const data = await getCharacter(searchQuery);
      console.log("data", data);
      const getCat =
        data &&
        data.length &&
        data.map((product) => <Product key={product.id} product={product} />);
      console.log("getCat", getCat);
      setProducts(getCat);
    }
  }, [searchQuery]);

  const toggleCategories = () => {
    setOpenCategories(!openCategories);
  };
  return (
    <ProductsPage>
      <div className="container">
        <div className="products-page">
          <ProductsSection className="products-sections">
            <CategoriesLeft
              className={"product-categories " + (openCategories ? "open" : "")}
            >
              <div className="categories-toggle" onClick={toggleCategories}>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <CategoriesNav />
            </CategoriesLeft>
            <div
              className={
                "d-flex flex-wrap product-list" +
                (products.length !== 0 ? "" : " no-products")
              }
            >
              {products.length !== 0 ? (
                products
              ) : (
                <div className="no-products-sec">
                  <span>No products in this category.</span>
                </div>
              )}
            </div>
          </ProductsSection>
        </div>
      </div>
    </ProductsPage>
  );
}

export default Products;
