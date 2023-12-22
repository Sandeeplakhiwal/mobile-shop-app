import React from "react";
import styled from "styled-components";
import Loader from "../../layout/loader";

const ProductContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 16px;
`;

const ProductCard = styled.div`
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin: 16px;
  width: 200px;
  text-align: center;
  cursor: pointer;
`;

const ProductImage = styled.img`
  width: 100%;
  max-height: 150px;
  object-fit: contain;
  border-radius: 4px;
`;

const ProductTitle = styled.h3`
  font-size: 16px;
  margin: 8px 0;
`;

const ProductDetails = styled.div`
  margin-top: 8px;
`;

const DetailLabel = styled.p`
  font-size: 12px;
  color: #777;
  margin: 4px 0;
`;

const ProductPrice = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: #6a1b9a;
  margin: 8px 0;
`;

const ProductList = ({ productsLoading, products }) => {
  const filteredProducts = products ? products : [];

  return (
    <ProductContainer>
      {productsLoading ? (
        <Loader />
      ) : filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <ProductCard key={product._id}>
            <ProductImage src={product.images[0].url} alt={product.name} />
            <ProductTitle>{product.name}</ProductTitle>
            <ProductDetails>
              <DetailLabel>Processor: {product.processor}</DetailLabel>
              <DetailLabel>Memory: {product.memory}</DetailLabel>
              <DetailLabel>OS: {product.os}</DetailLabel>
            </ProductDetails>
            <ProductPrice>₹{Math.floor(product.price)}</ProductPrice>
          </ProductCard>
        ))
      ) : (
        <h1>Not Found!</h1>
      )}
    </ProductContainer>
  );
};

export default ProductList;
