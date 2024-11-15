import React from "react";
import PopUp from "@/shared/components/PopUp/PopUp";
import styled from "styled-components";

const StylePopUp = styled(PopUp)``;

export const FilterPopUp = ({ action }) => {
  return <StylePopUp action={action} ><div>Filter</div></StylePopUp>;
};
