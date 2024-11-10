import styled from "styled-components";
import { act, useState } from "react";
import PopUp from "@/shared/components/PopUp/PopUp";
import XButton from "@/shared/components/Button/XButton";
import Radio from "@/shared/components/Input/RadioInput";
import Avatar from "react-avatar";
import { formatDate } from "@/shared/utils/DateTimeHandle";

const PopUpContainer = styled(PopUp)`
  border-radius: 25px;
`;

const BodyStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  > div {
    display: grid;
    grid-template-columns: 3fr 1fr;
    align-items: center;

    > div:nth-of-type(1) {
      display: flex;
      gap: 2rem;
      align-items: center;
    }

    > div:nth-of-type(2) {
      display: flex;
      justify-content: flex-end;
    }
  }
`;

export default function ListingSelectionPopUp({
  action,
  listings,
  chosenProperty,
  setChosenProperty,
}) {
  return (
    <PopUpContainer action={action}>
      <BodyStyled>
        {listings.map((property, index) => (
          <div key={index}>
            <div>
              <Avatar name="_" round={10} size="70" src={property.propertyImages[0]?.imageName} />
              {property.propertyTitle
                ? property.propertyTitle
                : `Your listing started at ${formatDate(property.createdAt)}`}
            </div>
            <div>
              <Radio
                onChange={() => setChosenProperty(property)}
                checked={chosenProperty.id == property.id}
                name={"chosenListing"}
              />
            </div>
          </div>
        ))}
      </BodyStyled>
    </PopUpContainer>
  );
}
