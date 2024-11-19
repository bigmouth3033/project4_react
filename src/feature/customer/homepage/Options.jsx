import React, { useState } from "react";
import styled from "styled-components";
import { css } from "styled-components";
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
export const Options = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const handleClick = (value) => {
    if (selectedItem == null) {
      return setSelectedItem(value);
    }
    setSelectedItem(null);
  };
  return (
    <div>
      <div>
        <StyleTitle>Booking Options</StyleTitle>
      </div>
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
    </div>
  );
};
