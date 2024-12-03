import React, { useState } from "react";
import styled from "styled-components";
import { css } from "styled-components";
import { MdOutlinePets } from "react-icons/md";
import { GoKey } from "react-icons/go";
import { AiOutlineThunderbolt } from "react-icons/ai";
const StyleTitle = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;
const StyleProItem = styled.div`
  margin: 0.3rem;
  padding: 1rem;
  border-radius: 1rem;
  width: 60%;
  outline: 1px solid lightgray;
  text-align: left;
  font-weight: bold;
  cursor: pointer;
  > p {
    font-weight: 100;
  }
  ${(props) =>
    props.selected &&
    css`
      color: black;
      outline: 0.15rem solid black;
      >p{
        font-weight: 100;
      }
      
       /* Tắt hiệu ứng hover */
       &:hover {
        background-color: #fff
    `}
`;

const StyleItem = styled.div`
  display: inline-flex;
  flex-direction: row;
  margin: 0.5rem 0%.5rem;
  margin-right: 0.5rem;
  width: fit-content;
  border-radius: 30px;
  outline: 1px solid lightgray;
  padding: 0.7rem 1rem;
  cursor: pointer;
  align-items: center;

  &:hover {
    outline: 2px solid black;
  }

  ${(props) =>
    props.selected &&
    css`
      outline: 2px solid black;
    `}

  > div:nth-child(1) {
    //style image
    margin: 0 auto;
    width: 1.5rem;
  }
  > div:nth-child(2) {
    //style name
    margin: 0 auto;

    padding: 0.5rem;
  }
`;

const bookingOptions = [
  {
    value: "instant",
    name: "instant",
    label: "Instant Book",
    icon: <AiOutlineThunderbolt />,
  },
  {
    value: true,
    name: "checkin",
    label: "Self check-in",
    icon: <GoKey />,
  },
  {
    value: true,
    name: "pet",
    label: "Pet Allowed",
    icon: <MdOutlinePets />,
  },
];

export const Options = ({ selectedOption, setSelectedOption }) => {
  //state to manage click/unclick
  const [selectedItem, setSelectedItem] = useState(null);

  //Guest favourite
  const handleFavClick = (value) => {
    if (selectedItem == null) {
      return setSelectedItem(value);
    }
    setSelectedItem(null);
  };

  //Booking Option

  const handleClick = (pickedItem) => {
    setSelectedOption((prevSelectedItems) => {
      // Kiểm tra xem amenity đã được chọn chưa
      if (prevSelectedItems.includes(pickedItem)) {
        // Nếu đã chọn, loại bỏ nó
        return prevSelectedItems.filter((item) => item !== pickedItem);
      } else {
        // Nếu chưa chọn, thêm nó vào danh sách đã chọn
        return [...prevSelectedItems, pickedItem];
      }
    });
  };

  return (
    <div>
      <div>
        <StyleTitle>Booking Options</StyleTitle>
        <div>
          {bookingOptions.map((item, index) => (
            <StyleItem
              key={index}
              onClick={() => handleClick(item)}
              selected={selectedOption.includes(item)}
            >
              <div>{item.icon}</div>
              <div>{item.label}</div>
            </StyleItem>
          ))}
        </div>
      </div>
      {/*
         <div>
        <StyleTitle>Standout stays</StyleTitle>
        <StyleProItem
          onClick={() => {
            handleClick("fav");
          }}
          selected={"fav" == selectedItem}
          value="fav"
        >
          <div>Guest Favourite</div>
          <p>The most loved homes on UrbanNest</p>
        </StyleProItem>
      </div>
        */}
    </div>
  );
};
