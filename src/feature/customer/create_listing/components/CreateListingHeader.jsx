import { useState } from "react";
import styled from "styled-components";
import { formatDate } from "@/shared/utils/DateTimeHandle";
import { PiLightningFill } from "react-icons/pi";
import { PiLightningSlashBold } from "react-icons/pi";

const Container = styled.div`
  padding: 1rem 3rem 0;

  display: flex;
  align-items: center;
  justify-content: space-between;

  & svg {
    color: yellow;
    font-size: 20px;
  }
`;

const Active = styled.span`
  &::before {
    background-color: red;
    border-color: #78d965;
    box-shadow: 0px 0px 6px 1.5px #94e185;
    content: " ";
    display: inline-block;
    width: 10px;
    height: 10px;
    margin-right: 12px;
    border: 1px solid #000;
    border-radius: 10px;
  }
`;

const RightStyled = styled.div`
  display: flex;
  align-items: center;
  > div {
    display: flex;
    align-items: center;
    padding-right: 5rem;
  }

  > div:nth-of-type(2) {
    h4 {
      color: red;
      font-size: 17px;
    }
  }

  > div:nth-of-type(1) {
    gap: 1rem;
  }

  & p {
    text-decoration: underline;
    font-size: 17px;
  }
`;

export default function CreateListingHeader({ state, listing }) {
  return (
    <Container>
      <h1>
        {state.propertyTitle
          ? state.propertyTitle
          : `Your new listing started at ${formatDate(listing.data.data.createdAt)}`}
      </h1>
      <RightStyled>
        <div>
          {state.bookingType && (
            <>
              {state.bookingType == "instant" ? <PiLightningFill /> : <PiLightningSlashBold />}
              <p>Instant book {state.bookingType == "instant" ? "on" : "off"}</p>
            </>
          )}
        </div>

        <div>
          <Active /> <h4>{listing.data.data.status}</h4>
        </div>
      </RightStyled>
    </Container>
  );
}
