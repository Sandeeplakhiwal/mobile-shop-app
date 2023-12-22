import React, { useState } from "react";
import styled from "styled-components";
import { IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { loadFilters } from "../../../redux/slices/productSlice";
import { useQueryClient } from "@tanstack/react-query";

const FilterBarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const FilterBarContent = styled.div`
  background: #fff;
  //   background: orange;
  height: 80vh;
  border-radius: 8px;
  padding: 16px;
  width: 80%;
  margin-right: 1rem;
  max-width: 400px;
  overflow-y: auto;
`;

const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const FilterTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin: 0;
`;

const CloseButton = styled.div`
  cursor: pointer;
`;

const FilterForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const FilterLabel = styled.label`
  margin-bottom: 8px;
  font-size: 16px;
  font-weight: bold;
`;

const FilterInput = styled.input`
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
`;

const ApplyButton = styled.button`
  background: #6a1b9a; /* Purple theme color */
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 12px;
  cursor: pointer;
  font-size: 16px;
`;

const FilterBar = ({ onClose }) => {
  const [filters, setFilters] = useState({
    price: "",
    processor: "",
    memory: "",
    os: "",
  });

  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    dispatch(loadFilters(filters));
    await queryClient.refetchQueries({
      queryKey: ["products"],
      type: "active",
    });
    onClose();
  };

  return (
    <FilterBarContainer>
      <FilterBarContent>
        <FilterHeader>
          <FilterTitle>Filter Mobiles</FilterTitle>
          <CloseButton onClick={onClose}>
            <IoClose size={24} />
          </CloseButton>
        </FilterHeader>
        <FilterForm onSubmit={handleFormSubmit}>
          <FilterLabel>Price</FilterLabel>
          <FilterInput
            type="text"
            name="price"
            value={filters.price}
            onChange={handleInputChange}
          />

          <FilterLabel>Processor</FilterLabel>
          <FilterInput
            type="text"
            name="processor"
            value={filters.processor}
            onChange={handleInputChange}
          />

          <FilterLabel>Memory</FilterLabel>
          <FilterInput
            type="text"
            name="memory"
            value={filters.memory}
            onChange={handleInputChange}
          />

          <FilterLabel>OS</FilterLabel>
          <FilterInput
            type="text"
            name="os"
            value={filters.os}
            onChange={handleInputChange}
          />

          <ApplyButton type="submit" onClick={handleFormSubmit}>
            Apply Filters
          </ApplyButton>
        </FilterForm>
      </FilterBarContent>
    </FilterBarContainer>
  );
};

export default FilterBar;
