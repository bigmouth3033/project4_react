import React, { useEffect, useRef, useState } from "react";
import { FaFilter, FaFilterCircleDollar } from "react-icons/fa6";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled, { css } from "styled-components";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";

const StyleScrollContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  overflow: hidden;
  padding: 10px;
`;

const StyleCategoryBar = styled.div`
  display: flex;
  /* position: absolute; */

  overflow: hidden;
  scroll-behavior: smooth;
  gap: 1.5rem;
  /* width: calc(100% - 100px); Adjust width to make room for buttons */
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
  padding: 5px 10px;
  height: 3rem;
  box-sizing: border-box !important; /* BUT NÓ K CHẠYYYYY*/
  /* transition: background-color 0.2s ease, color 0.2s ease; */

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
       /* Tắt hiệu ứng hover */
       &:hover {
        color: black;
        border-bottom: 0.19rem solid black;
    `}
`;

const StyleButtonLeft = styled.button`
  background: none;

  border: 0.5px gray solid;
  border-radius: 50%;
  padding: 7px 10px;
  cursor: pointer;
  color: #333;

  display: ${(props) => (props.hidden ? "none" : "block")};
  transition: display 1s ease;

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

export const FilterBar = () => {
  const scrollRef = useRef(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
  };

  const handleClick = (category) => {
    setSelectedItem(category);
  };

  const handleScroll = () => {
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

    // Check if we're at the start or end of the scrollable area
    setShowLeftButton(scrollLeft > 0);
    setShowRightButton(scrollLeft + clientWidth < scrollWidth - 1); // Adjust for rounding issues
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    console.log(scrollRef.current);

    scrollContainer.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check to set button visibility on mount

    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const categories = [
    "Nhà nhỏ",
    "Biểu tượng",
    "Cabin",
    "Ven hồ",
    "Grand piano",
    "Bếp của bếp trưởng",
    "Phòng",
    "Khung cảnh tuyệt vời",
    "Hồ bơi tuyệt vời",
    "Nông thôn",
    "Nhà trên cây",
    "Biệt thự",
    "Được ưa chuộng",
    "Thật ấn tượng!",
  ];

  return (
    <StyleScrollContainer>
      <StyleButtonLeft onClick={scrollLeft} hidden={!showLeftButton}>
        <div>
          <MdArrowBackIosNew />
        </div>
      </StyleButtonLeft>
      <StyleCategoryBar ref={scrollRef}>
        {categories.map((category) => (
          <StyleCategoryItem
            key={category}
            selected={selectedItem === category}
            onClick={() => handleClick(category)}
          >
            {category}
          </StyleCategoryItem>
        ))}
      </StyleCategoryBar>
      <StyleButtonRight onClick={scrollRight} hidden={!showRightButton}>
        <MdArrowForwardIos />
      </StyleButtonRight>
      <StyleFilterButton>
        <div>
          <MdArrowForwardIos />
        </div>
        <div>Filter</div>
      </StyleFilterButton>
    </StyleScrollContainer>
  );
};
