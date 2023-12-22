import React, { useEffect, useState } from "react";
import Header from "../layout/Header";
import FilterBar from "./FilterBar/FilterBar";
import styled from "styled-components";
import { FaFilter } from "react-icons/fa";
import ProductList from "./products/productList";
import Loader from "../layout/loader";
import { useQuery } from "@tanstack/react-query";
import { server } from "../../redux/store";
import axios from "axios";
import { useSelector } from "react-redux";
import { IoLogOutOutline } from "react-icons/io5";
import { logoutApi } from "../../apis/auth";
import { toast } from "react-hot-toast";
import { useNavigate, redirect } from "react-router-dom";

const FilterBtnBox = styled("div")`
  display: flex;
  justify-content: center;
  padding: 1rem;
`;
const FilterBtn = styled("button")`
  padding: 10px 14px;
  background: #fff;
  border: 1.5px solid skyblue;
  border-radius: 7px;
  display: flex;
  gap: 5px;
  align-items: center;
  cursor: pointer;
  font-weight: 500;
  letter-spacing: 1px;
`;

const LogoutBtnBox = styled("div")`
  display: flex;
  justify-content: right;
  padding: 0.5rem;
`;

const LogoutBtn = styled("button")`
  font-size: 16px;
  padding: 4px 10px;
  background: #fff;
  border: 1.5px solid skyblue;
  border-radius: 7px;
  align-items: center;
  cursor: pointer;
  font-weight: 600;
  letter-spacing: 0.5px;
`;

const ProductCountText = styled("p")`
  text-align: center;
  font-size: 13px;
  letter-spacing: 1px;
  font-weight: 550;
  opacity: 0.5;
`;

const HomePage = ({ isAuthenticated, user, userLoading }) => {
  const [isFilterBarOpen, setFilterBarOpen] = useState(false);
  const { price, name, processor, memory, os } = useSelector(
    (state) => state.filters
  );

  const getAllProductsApi = () => {
    const queryParams = {
      ...(name && { keyword: name }),
      ...(price && { "price[lt]": price }),
      ...(processor && { processor: processor }),
      ...(memory && { memory: memory }),
      ...(os && { os: os }),
    };

    return axios.get(`${server}/products`, {
      params: queryParams,
      withCredentials: true,
    });
  };

  const {
    data: productsData,
    error,
    isLoading: productsLoading,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProductsApi,
  });

  const {
    data: logoutData,
    isLoading: logoutLoading,
    error: logoutError,
    isSuccess: logoutSuccess,
    refetch: logoutRefetch,
  } = useQuery({
    queryKey: ["logout"],
    queryFn: logoutApi,
    enabled: false,
  });

  const handleFilterButtonClick = () => {
    setFilterBarOpen(true);
  };

  const handleCloseFilterBar = () => {
    setFilterBarOpen(false);
  };

  const handleLogoutClick = () => {
    logoutRefetch();
  };

  useEffect(() => {
    refetch();
  }, [name, price, processor, memory, os]);

  useEffect(() => {
    if (logoutSuccess && logoutData) {
      toast.success("Logged out successfully");
      window.location.reload();
    }
    if (error) {
      if (error.message === "Network Error") {
        toast.error("Network Error");
      } else {
        toast.error(error?.response?.data?.error);
      }
    }
  }, [error, logoutSuccess, logoutData]);

  return (
    <div>
      <Header
        isAuthenticated={isAuthenticated}
        user={user}
        onFilterButtonClick={handleFilterButtonClick}
      />
      {userLoading || logoutLoading ? (
        <Loader />
      ) : (
        <>
          {isAuthenticated ? (
            <LogoutBtnBox>
              <LogoutBtn onClick={handleLogoutClick}>
                <IoLogOutOutline />
              </LogoutBtn>
            </LogoutBtnBox>
          ) : null}
          {isFilterBarOpen && <FilterBar onClose={handleCloseFilterBar} />}
          <FilterBtnBox>
            <FilterBtn onClick={handleFilterButtonClick}>
              Filters <FaFilter style={{ color: "blue" }} />
            </FilterBtn>
          </FilterBtnBox>
          {productsData?.data ? (
            <ProductCountText>
              {productsData?.data?.products?.length} RESULTS
            </ProductCountText>
          ) : null}
          <ProductList
            productsLoading={productsLoading}
            products={productsData?.data?.products}
          />
        </>
      )}
    </div>
  );
};

export default HomePage;
