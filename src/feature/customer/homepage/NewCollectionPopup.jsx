import React, { useState } from "react";
import PopUp from "@/shared/components/PopUp/PopUp";
import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import {
  CreateFavouriteMutation,
  FavouriteRequest,
} from "./api/collectionFavApi";

const StylePopUp = styled(PopUp)`
  width: 30rem;
  height: 55vh;
  overflow-y: auto;
  padding: 0;
  display: flex;
  flex-direction: column;
`;

const StyleTitle = styled.div`
  width: 100%;
  font-size: 1.1rem;
  font-weight: 600;
  text-align: center;
  padding: 1.5rem 0;
  margin-bottom: 1rem;
  border-bottom: 1px solid lightgray;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 2;
`;

const StyleBody = styled.div`
  padding: 0 2rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const StyleWrapper = styled.div`
  position: relative;
  margin-top: 1rem;
`;

const StyleLabel = styled.label`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  transition: 0.2s ease all;
  color: gray;
  font-size: 1rem;
  pointer-events: none;
`;

const StyleInput = styled.input`
  width: 100%;
  padding: 1rem 0.5rem;
  border: 1px solid lightgray;
  border-radius: 5px;
  font-size: 1rem;

  &:focus {
    border-color: black;
    outline: none;
  }

  &:focus + ${StyleLabel}, &:not(:placeholder-shown) + ${StyleLabel} {
    top: 20%;
    font-size: 0.8rem;
    color: black;
  }
`;

const StyleSubmit = styled.div`
  position: sticky;
  bottom: 0;
  min-height: 2rem;
  margin-top: 1rem;
  font-size: 1.1rem;
  font-weight: 600;
  text-align: center;
  padding: 1.5rem;
  border-top: 1px solid lightgray;
  background-color: white;
  z-index: 2;
`;

const StyleCreateButton = styled.div`
  padding: 1rem 1rem;
  border-radius: 10px;
  background-color: black;
  color: white;
  cursor: pointer;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;

export const NewCollectionPopup = ({
  properties,
  favouriteRequest,
  action,
}) => {
  const createFavouriteMutation = CreateFavouriteMutation();
  const [collectionName, setCollectionName] = useState("");
  const [searchParams] = useSearchParams();

  const HandleSubmit = () => {
    if (!collectionName) {
      return;
    }
    const userId = searchParams.get("userId") || "";
    const propertyId = searchParams.get("propertyId") || "";

    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("propertyId", propertyId);
    formData.append("collectionName", collectionName);

    createFavouriteMutation.mutate(formData, {
      onSuccess: () => {
        setCollectionName(""); // Reset collection name after success
        favouriteRequest.refetch();
        properties.refetch();
        action();
      },
      onError: (error) => {
        console.error("Error Adding Collection:", error);
      },
    });
  };

  //Check Form Valid
  const isFormValid = () => {
    const userId = searchParams.get("userId") || "";
    const propertyId = searchParams.get("propertyId") || "";
    return collectionName && userId && propertyId;
  };

  return (
    <StylePopUp action={action}>
      <StyleTitle>Create your new wishlist</StyleTitle>
      <StyleBody>
        <StyleWrapper>
          <StyleInput
            required
            type="text"
            value={collectionName}
            onChange={(e) => setCollectionName(e.target.value)}
            placeholder=" " // Placeholder must be a space for the effect to work
          />
          <StyleLabel>Name</StyleLabel>
        </StyleWrapper>
      </StyleBody>
      <StyleSubmit>
        <StyleCreateButton
          onClick={HandleSubmit}
          disabled={!isFormValid() || createFavouriteMutation.isLoading}
        >
          {createFavouriteMutation.isLoading ? "Adding..." : "Submit"}
        </StyleCreateButton>
        {createFavouriteMutation.isError && (
          <p style={{ color: "red" }}>Adding collection failed!</p>
        )}
        {createFavouriteMutation.isSuccess && (
          <p style={{ color: "green" }}>Collection added!</p>
        )}
      </StyleSubmit>
    </StylePopUp>
  );
};