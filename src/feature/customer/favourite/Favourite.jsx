import Header from "@/feature/admin/header/Header";
import styled from "styled-components";
import PropertyHeader from "../custome_header/PropertyHeader";
import Collection from "./components/Collection";
const StyledContainer = styled.div`
  max-width: 1280px;
  margin: 3rem auto;
`;
const StyledHeader = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 3rem;
`;
const StyledContainerCollection = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
`;
export default function Favourite() {
  return (
    <div>
      <PropertyHeader />
      <StyledContainer>
        <StyledHeader>Wishlists</StyledHeader>
        <StyledContainerCollection>
          <Collection />
        </StyledContainerCollection>
      </StyledContainer>
    </div>
  );
}
