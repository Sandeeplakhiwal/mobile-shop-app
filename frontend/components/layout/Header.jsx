import React, { useState } from "react";
import styled from "styled-components";
import {
  FaSearch,
  FaBell,
  FaShoppingCart,
  FaUser,
  FaSignInAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadFilters } from "../../redux/slices/productSlice";

const HeaderContainer = styled.div`
  background-color: #6a1b9a;
  width: auto;
  padding: 16px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  @media (max-width: 768px) {
    padding: 10px;
    width: 95vw;
  }
`;

const Logo = styled.div`
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const SearchBar = styled.input`
  flex: 0.5;
  margin: 0 16px;
  padding: 8px;
  border: none;
  outline: none;
  border-radius: 4px;
  font-size: 16px;
  @media (max-width: 768px) {
    margin: 0 4px;
    width: 80%;
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.div`
  color: #fff;
  font-size: 24px;
  margin-left: 16px;
  cursor: pointer;
  @media (max-width: 768px) {
    font-size: 20px;
    margin-left: 12px;
  }
`;

const Header = ({ isAuthenticated, user }) => {
  const [keyword, setKeyword] = useState("");

  let name = user ? user.name : "User Name";
  name = name.split(" ");
  const firstName = name[0];

  const dispatch = useDispatch();

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      dispatch(loadFilters({ name: keyword }));
    }
  };

  return (
    <HeaderContainer>
      <Link to={"/"}>
        <Logo>Shop</Logo>
      </Link>
      <SearchBar
        name="keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Search products..."
      />
      <IconContainer>
        <Icon>
          <FaBell />
        </Icon>
        <Icon>
          <FaShoppingCart />
        </Icon>
        {isAuthenticated ? (
          <>
            {/* <Icon>
                <FaUser />
              </Icon> */}
            <p
              style={{
                display: "flex",
                flexDirection: "column",
                color: "white",
                marginLeft: "16px",
                fontSize: "10px",
                marginTop: "-6px",
                fontWeight: 600,
                letterSpacing: "1px",
                cursor: "default",
              }}
            >
              Hello{" "}
              <span style={{ marginTop: "-3px", fontSize: "13px" }}>
                {user ? firstName : ""}
              </span>
            </p>
          </>
        ) : (
          <>
            <Link to={"/login"}>
              <Icon>
                <FaSignInAlt />
              </Icon>
            </Link>
          </>
        )}
      </IconContainer>
    </HeaderContainer>
  );
};

export default Header;
