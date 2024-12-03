import styled from "styled-components";
import CustomerHeader from "../custome_header/CustomerHeader";
import { FilterBar } from "./FilterBar";
import { PropertiesRequest } from "../../../shared/api/propertyClientApi";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Image } from "semantic-ui-react";
import { GrFormNext } from "react-icons/gr";
import { GrFormPrevious } from "react-icons/gr";
import { useState } from "react";

//npm install react-multi-carousel --save
//npm install semantic-ui-react semantic-ui-css --save

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const StyleContainer = styled.div`
  background-color: white;
`;

const StyleHeaderContainer = styled.div`
  padding: 0 5rem;
  position: relative;

  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const StyleBody = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 10px 5rem;
  gap: 1rem;
`;

const StyleBodyItem = styled.div`
  aspect-ratio: 1/1.25;
  display: grid;

  border-radius: 10px;

  & .box {
    width: 100%;
    height: 100%;
    background-color: pink;
  }

  & img {
    display: block;

    aspect-ratio: 1; //quan trong !!!
  }
  :hover {
    & .custom-left-arrow,
    .custom-right-arrow {
      opacity: 1;
    }
  }
  & .custom-left-arrow,
  .custom-right-arrow {
    opacity: 0;
  }
`;

const CarouselStyled = styled(Carousel)`
  border-radius: 10px;
  aspect-ratio: 1 / 1;
`;
const StyleContent = styled.div`
  border-radius: 10px;
  background-color: red;
`;

const CustomLeftArrow = ({ onClick }) => (
  <div
    className="custom-left-arrow"
    onClick={onClick}
    style={{
      position: "absolute",
      top: "50%",
      left: "10px",
      backgroundColor: "#fff",
      padding: "5px",
      borderRadius: "50%",
      cursor: "pointer",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    }}
  >
    <GrFormPrevious />
  </div>
);

// Custom Right Arrow Component
const CustomRightArrow = ({ onClick }) => (
  <div
    className="custom-right-arrow"
    onClick={onClick}
    style={{
      position: "absolute",
      top: "50%",
      right: "10px",
      backgroundColor: "#fff",
      padding: "5px",
      borderRadius: "50%",
      cursor: "pointer",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    }}
  >
    <GrFormNext />
  </div>
);

export default function HomePage() {
  const properties = PropertiesRequest();
  const [selectedAmentity, setSelectedAmentity] = useState([]);
  const [selectedPropertyType, setSelectedPropertyType] = useState(null);
  const [selectedOption, setSelectedOption] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(1);
  const [selectedBed, setSelectedBed] = useState(1);
  const [selectedBathRoom, setSelectedBathRoom] = useState(1);

  return (
    <StyleContainer>
      <StyleHeaderContainer>
        <CustomerHeader />
        <div>
          <FilterBar
            selectedAmentity={selectedAmentity}
            setSelectedAmentity={setSelectedAmentity}
            selectedPropertyType={selectedPropertyType}
            setSelectedPropertyType={setSelectedPropertyType}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            selectedPrice={selectedPrice}
            setSelectedPrice={setSelectedPrice}
            selectedRoom={selectedRoom}
            setSelectedRoom={setSelectedRoom}
            selectedBed={selectedBed}
            setSelectedBed={setSelectedBed}
            selectedBathRoom={selectedBathRoom}
            setSelectedBathRoom={setSelectedBathRoom}
          />
        </div>
      </StyleHeaderContainer>
      <StyleBody>
        {properties.isSuccess &&
          properties.data.data.map((item) => {
            return (
              <StyleBodyItem key={item.id}>
                <CarouselStyled
                  showDots
                  deviceType={"mobile"}
                  itemClass="image-item"
                  responsive={responsive}
                  customLeftArrow={<CustomLeftArrow />}
                  customRightArrow={<CustomRightArrow />}
                >
                  {item.propertyImages.slice(0, 5).map((image) => {
                    return (
                      <div className="box" key={image.id}>
                        <img src={image.imageName} />
                      </div>
                    );
                  })}
                </CarouselStyled>
                <StyleContent>
                  <div>{item.propertyTitle}</div>
                  <div> $ {item.basePrice}</div>
                </StyleContent>
              </StyleBodyItem>
            );
          })}
      </StyleBody>
    </StyleContainer>
  );
}
