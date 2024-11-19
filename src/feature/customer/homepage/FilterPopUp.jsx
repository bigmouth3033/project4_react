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
  width: 30rem;
  height: 90vh;
  overflow-y: auto;
`;

export const FilterPopUp = ({ action }) => {
  const [priceRange, setPriceRange] = useState([0, 100]);
  return (
    <StylePopUp action={action}>
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
    </StylePopUp>
  );
};
