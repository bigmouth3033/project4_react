import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import Skeleton from "react-loading-skeleton";
import { CategoriesRequest } from "../../../shared/api/categoryClientApi";
import { FaFilter } from "react-icons/fa";
import { FilterPopUp } from "./FilterPopUp";

const StyleScrollContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  overflow: hidden;
  padding: 10px;
`;

const StyleCategoryBar = styled.div`
  display: flex;
  overflow: hidden;
  scroll-behavior: smooth;
  gap: 1.5rem;
  padding: 10px 0;
`;

const StyleCategoryItem = styled.div`
  display: inline-block;
  font-size: 14px;
  color: #6a6a6a;
  font-weight: 600;
  text-align: center;
  white-space: nowrap;
  cursor: pointer;
  padding: 1rem;
  width: max-content;
  height: 5rem;
  box-sizing: border-box !important;

  > div:nth-child(1) {
    margin: 0 auto;
    width: 1.5rem;
  }
  > div:nth-child(2) {
    margin: 0 auto;
    padding: 0.5rem;
  }

  &:hover {
    color: #393838;
    border-bottom: 0.15rem solid #a8a7a7;
  }

  ${(props) =>
    props.selected &&
    css`
      color: black;
      border-bottom: 0.19rem solid black;
      font-weight: bold;
      &:hover {
        color: black;
        border-bottom: 0.19rem solid black;
      }
    `}
`;

const StyleButtonLeft = styled.button`
  background: none;
  border: 0.5px gray solid;
  border-radius: 50%;
  padding: 8px;
  cursor: pointer;
  color: #333;
  display: ${(props) => (props.hidden ? "none" : "block")};

  &:hover {
    box-shadow: 0px 10px 20px #dadada;
  }
`;

const StyleButtonRight = styled(StyleButtonLeft)``;

const StyleFilterButton = styled.button`
  display: flex;
  justify-content: space-between;
  gap: 7px;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 15px;
  color: #333;
  border-radius: 10px;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background-color: #f8f8f8;
    border: 1px solid #6f6e6e;
  }
`;

export const FilterBar = ({
  categoryId,
  setCategoryId,
  selectedAmentity,
  selectedPropertyType,
  isInstant,
  isPetAllow,
  isSelfCheckin,
  selectedPrice,
  selectedRoom,
  selectedBed,
  selectedBathRoom,
  setSelectedAmentity,
  setSelectedPropertyType,
  setIsInstant,
  setIsSelfCheckin,
  setIsPetAllow,
  setSelectedPrice,
  setSelectedRoom,
  setSelectedBed,
  setSelectedBathRoom,
}) => {
  const scrollRef = useRef(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);
  const [isPopUp, setIsPopUp] = useState(false);

  const categoriesRequest = CategoriesRequest();

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
  };

  const updateButtonVisibility = () => {
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

    // Check if the scroll position is at the start or end of the container
    setShowLeftButton(scrollLeft > 0);
    setShowRightButton(scrollLeft + clientWidth < scrollWidth);
  };

  const handleScroll = () => {
    updateButtonVisibility();
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;

    // Attach scroll event listener
    scrollContainer.addEventListener("scroll", handleScroll);

    // Initial check for overflow
    updateButtonVisibility();

    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
    };
  }, [categoriesRequest.data]);

  useEffect(() => {
    // Update button visibility on window resize
    const handleResize = () => updateButtonVisibility();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <StyleScrollContainer>
        <StyleButtonLeft onClick={scrollLeft} hidden={!showLeftButton}>
          <MdArrowBackIosNew />
        </StyleButtonLeft>

        <StyleCategoryBar ref={scrollRef}>
          {categoriesRequest.isSuccess ? (
            categoriesRequest.data.data.map((category) => (
              <StyleCategoryItem
                key={category.id}
                selected={categoryId === category.id}
                onClick={() => setCategoryId(category.id)}
              >
                <div>
                  <img
                    src={category.categoryImage}
                    alt={category.categoryName}
                  />
                </div>
                <div>{category.categoryName}</div>
              </StyleCategoryItem>
            ))
          ) : (
            <Skeleton count={6} />
          )}
        </StyleCategoryBar>

        <StyleButtonRight onClick={scrollRight} hidden={!showRightButton}>
          <MdArrowForwardIos />
        </StyleButtonRight>
        <StyleFilterButton onClick={() => setIsPopUp(true)}>
          <FaFilter />
          <div>Filter</div>
        </StyleFilterButton>
      </StyleScrollContainer>

      {isPopUp && (
        <FilterPopUp
          {...{
            selectedAmentity,
            setSelectedAmentity,
            selectedPropertyType,
            setSelectedPropertyType,
            isInstant,
            setIsInstant,
            isPetAllow,
            setIsPetAllow,
            isSelfCheckin,
            setIsSelfCheckin,
            selectedPrice,
            setSelectedPrice,
            selectedRoom,
            setSelectedRoom,
            selectedBed,
            setSelectedBed,
            selectedBathRoom,
            setSelectedBathRoom,
            action: () => setIsPopUp(false),
          }}
        />
      )}
    </>
  );
};
