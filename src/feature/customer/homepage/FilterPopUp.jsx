import React, { useState } from "react";
import PopUp from "@/shared/components/PopUp/PopUp";
import styled from "styled-components";
import { Range } from "react-range";
import RangeSlider from "./RangeSlider";
import PropertyType from "./PropertyType";
import { RoomAndBed } from "./RoomAndBed";
import { Amentity } from "./Amentity";
import { Options } from "./Options";

//npm add react-range

const StylePopUp = styled(PopUp)`
  width: 35rem;
  height: 90vh;
  overflow-y: auto;
  padding: 0;
`;

const StyleTitle = styled.div`
  width: 100%;
  font-size: 1.1rem;
  font-weight: 600;
  text-align: center;
  padding: 1.5rem 0;
  margin-bottom: 1rem;
  border-bottom: 1px solid lightgray;
  position: sticky; /* Đổi thành sticky */
  top: 0; /* Dính vào đầu */
  background-color: white; /* Đảm bảo nền cho phần dính */
  z-index: 10; /* Đảm bảo phần này nằm trên các phần khác */
`;

const StyleSubmit = styled.div`
  position: sticky; /* Đổi thành sticky */
  bottom: 0; /* Dính vào cuối */
  display: flex;
  justify-content: space-between;

  font-size: 1.1rem;
  font-weight: 600;
  text-align: center;
  padding: 1.5rem;
  border-top: 1px solid lightgray;
  background-color: white; /* Đảm bảo nền cho phần dính */
  z-index: 10; /* Đảm bảo phần này nằm trên các phần khác */
`;
const StyleBody = styled.div`
  padding: 0 2rem;
`;

export const FilterPopUp = ({ action }) => {
  const [priceRange, setPriceRange] = useState([0, 100]);
  return (
    <StylePopUp action={action}>
      <StyleTitle>Filters</StyleTitle>
      <StyleBody>
        <PropertyType />
        <RangeSlider
          min={0}
          max={10000}
          step={0.1}
          onChange={(value) => setPriceRange(value)}
        />
        <RoomAndBed />
        <Amentity />
        <Options />
      </StyleBody>
      <StyleSubmit>
        <div>Clear all</div>
        <div>Show places</div>
      </StyleSubmit>
    </StylePopUp>
  );
};
