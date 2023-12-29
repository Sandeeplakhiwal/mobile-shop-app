import React, { useState } from "react";
import styled from "styled-components";
import { FaSignInAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadFilters } from "../../redux/slices/productSlice";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LoginIcon from "@mui/icons-material/Login";
import { Badge } from "@mui/material";

const HeaderContainer = styled.div`
  background-color: #6a1b9a;
  width: auto;
  padding: 16px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  @media (max-width: 424px) {
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
    margin: 0 1px;
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
  padding-top: -20px;
  // background-color: orange;
  @media (max-width: 768px) {
    font-size: 20px;
    margin-left: 12px;
  }
`;
const IconWithBadge = styled.div`
  color: #fff;
  font-size: 24px;
  margin-left: 16px;
  cursor: pointer;
  margin-top: -10px;
  // background-color: orange;
  @media (max-width: 768px) {
    font-size: 20px;
    margin-left: 12px;
  }
`;

const Header = ({ isAuthenticated, user }) => {
  const [keyword, setKeyword] = useState("");

  const { cartItems } = useSelector((state) => state.cart);

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
        <IconWithBadge>
          <Badge variant={"dot"} color="error">
            <NotificationsIcon />
          </Badge>
        </IconWithBadge>
        <IconWithBadge>
          <Badge
            badgeContent={cartItems}
            invisible={cartItems > 0 ? false : true}
            color="error"
          >
            <ShoppingCartIcon />
          </Badge>
        </IconWithBadge>
        {isAuthenticated ? (
          <>
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
                <LoginIcon />
              </Icon>
            </Link>
          </>
        )}
      </IconContainer>
    </HeaderContainer>
  );
};

export default Header;
