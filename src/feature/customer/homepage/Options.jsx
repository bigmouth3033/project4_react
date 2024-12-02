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

export const Options = () => {
  const [pet, setPet] = useState(null);
  const [selfCheckin, setSelfCheckin] = useState(null);

  const [instantBook, setInstantBook] = useState(null);
  //2 state to manage click/unclick
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedBookingOption, setSelectedBookingOption] = useState(null);

  //Guest favourite
  const handleClick = (value) => {
    if (selectedItem == null) {
      return setSelectedItem(value);
    }
    setSelectedItem(null);
  };

  //Booking Option
  const handleClickBookingOption = (item) => {
    //save value to each state to send to API
    if (item.name == "instant") {
      setInstantBook(item.value);
    } else if (item.name == "pet") {
      setPet(item.value);
    } else {
      setSelfCheckin(item.value);
    }

    //click/unclick
    if (selectedBookingOption == null) {
      return setSelectedBookingOption(item);
    }
    setSelectedBookingOption(null);
  };
  return (
    <div>
      <div>
        <StyleTitle>Booking Options</StyleTitle>
        <div>
          {bookingOptions.map((item, index) => (
            <StyleItem
              key={index}
              onClick={() => handleClickBookingOption(item)}
              selected={item == selectedBookingOption}
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
