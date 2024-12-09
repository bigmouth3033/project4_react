import PopUpContainer from "@/shared/components/PopUp/giu/PopUpContainer";
import { faArrowUpFromBracket, faChevronLeft, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styled from "styled-components";

const StyledContainerNameSave = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledContainerShareSave = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  column-gap: 1rem;
  color: #000000;
  font-size: 16px;
  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 0.5rem;
    padding: 0.5rem 1rem;
    border-radius: 1rem;
    cursor: pointer;
  }
  > div:hover {
    background-color: #f9f9f9;
    border-radius: 1rem;
    transition: all 0.1s linear;
  }
`;

const StyledNameProperty = styled.div`
  font-size: 26px;
  font-weight: 600;
`;

const StyledContainerImage = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  grid-template-rows: 200px 200px;
  gap: 0.5rem;
  border-radius: 10px;
  overflow: hidden;
  margin: 1rem auto;
  .fisrtimage {
    grid-row: 1/3;
  }
  > div {
    position: relative;
    cursor: pointer;
  }

  @media (max-width: 850px) {
    grid-template-columns: 1fr 1fr;

    .fisrtimage {
      grid-row: 1/2;
    }
  }
  @media (max-width: 550px) {
    grid-template-columns: 1fr;
    grid-template-rows: 400px;

    .fisrtimage {
      grid-row: 1/2;
    }
  }
`;

const StyledImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const StyledOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0);
  transition: all 0.2s linear;
  &:hover {
    background: rgba(0, 0, 0, 0.3);
  }
`;
const StyledPopup = styled(PopUpContainer)`
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  transform: translate(0);
  overflow-y: scroll;
`;
const StyledPopupContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  & .imagePopup {
    /* max-height: 50rem; */
    background-color: blue;
  }
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  & .containerImage {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 5rem 0;
  }
`;
const Styledbutton = styled.button`
  width: 40px;
  height: 40px;
  margin: 5rem;
  border: none;
  border-radius: 50%;
`;
export default function NameImage({ data }) {
  const [clickImage, setclickImage] = useState(false);

  return (
    <div>
      <StyledContainerNameSave>
        <StyledNameProperty>{data.propertyTitle}</StyledNameProperty>
        <StyledContainerShareSave>
          <div>
            <FontAwesomeIcon icon={faArrowUpFromBracket} />
            <div>share</div>
          </div>
          <div>
            <FontAwesomeIcon icon={faHeart} />
            <div>like</div>
          </div>
        </StyledContainerShareSave>
      </StyledContainerNameSave>
      <div>
        {clickImage && (
          <StyledPopup setShowPopUp={setclickImage}>
            {/* Truyền StyledPopupContainer vào StyledPopup  bên phái StyledContainer sẽ gọi ra và hiện nội dung lên popup*/}
            <StyledPopupContainer>
              <div>
                <Styledbutton onClick={() => setclickImage(false)}>
                  <FontAwesomeIcon icon={faChevronLeft} />
                </Styledbutton>
              </div>
              <div className="containerImage">
                {data.propertyImages.map((imageUrl, index) => (
                  <div key={index} className="imagePopup">
                    <img src={imageUrl} alt={`Image ${index}`} />
                  </div>
                ))}
              </div>
            </StyledPopupContainer>
          </StyledPopup>
        )}
        <StyledContainerImage>
          {data.propertyImages.map((imageUrl, index) => {
            if (index < 5) {
              return (
                <div
                  key={index}
                  className={index === 0 ? "fisrtimage" : ""}
                  onClick={() => setclickImage(true)}
                >
                  <StyledImage key={index} src={imageUrl} />
                  <StyledOverlay />
                </div>
              );
            }
          })}
        </StyledContainerImage>
      </div>
    </div>
  );
}