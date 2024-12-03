import React, { useEffect, useState } from "react";
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
const StyleShowButton = styled.div`
  padding: 1rem 1rem;
  border-radius: 10px;
  background-color: black;
  color: white;
  cursor: pointer;
`;
const StyleClearAll = styled.div`
  padding: 1rem 1rem;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f5f0f0;
  }
`;

export const FilterPopUp = ({
  selectedAmentity,
  selectedPropertyType,
  selectedOption,
  selectedPrice,
  selectedRoom,
  selectedBed,
  selectedBathRoom,
  setSelectedAmentity,
  setSelectedPropertyType,
  setSelectedOption,
  setSelectedPrice,
  setSelectedRoom,
  setSelectedBed,
  setSelectedBathRoom,
  action,
}) => {
  // const [priceRange, setPriceRange] = useState(selectedPrice);
  const HandleClear = () => {
    setSelectedAmentity([]);
    setSelectedPropertyType(null);
    setSelectedOption([]);
    setSelectedPrice([0, 100000]);
    setSelectedRoom(1);
    setSelectedBed(1);
    setSelectedBathRoom(1);
  };

  return (
    <StylePopUp action={action}>
      <StyleTitle>Filters</StyleTitle>
      <StyleBody>
        <PropertyType
          selectedPropertyType={selectedPropertyType}
          setSelectedPropertyType={setSelectedPropertyType}
        />
        <RangeSlider
          min={0}
          max={100000}
          step={0.1}
          selectedPrice={selectedPrice}
          setSelectedPrice={setSelectedPrice}
          onChange={(value) => {
            setSelectedPrice(value);
          }}
        />
        <RoomAndBed
          selectedRoom={selectedRoom}
          selectedBed={selectedBed}
          selectedBathRoom={selectedBathRoom}
          setSelectedRoom={setSelectedRoom}
          setSelectedBed={setSelectedBed}
          setSelectedBathRoom={setSelectedBathRoom}
        />
        <Amentity
          selectedAmentity={selectedAmentity}
          setSelectedAmentity={setSelectedAmentity}
        />
        <Options
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
      </StyleBody>
      <StyleSubmit>
        <StyleClearAll onClick={() => HandleClear()}>Clear all</StyleClearAll>
        <StyleShowButton>Show places</StyleShowButton>
      </StyleSubmit>
    </StylePopUp>
  );
};
