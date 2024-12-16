import styled from "styled-components";
import Carousel from "react-multi-carousel";
import { GrFormNext } from "react-icons/gr";
import { GrFormPrevious } from "react-icons/gr";
const StyledContainer = styled.div`
  background-color: rebeccapurple;
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
const CarouselStyled = styled(Carousel)`
  border-radius: 10px;
  aspect-ratio: 1 / 1;
`;
export default function Collection() {
  return (
    <div>
      <StyledContainer>Collection name</StyledContainer>
      <div>
        <CarouselStyled
          showDots
          deviceType={"mobile"}
          itemClass="image-item"
          responsive={responsive}
          customLeftArrow={<CustomLeftArrow />}
          customRightArrow={<CustomRightArrow />}
        >
          {/* {item.propertyImages.slice(0, 5).map((image) => {
            return (
              <div className="box" key={image.id}>
                <img src={image.imageName} />
              </div>
            );
          })} */}
          <div>
            <img src="https://a0.muscache.com/im/pictures/ef9c14d6-eb40-4c2d-87b9-d04ead9d72fd.jpg?im_w=720&im_format=avif" />
          </div>
          <div>
            <img src="https://a0.muscache.com/im/pictures/miso/Hosting-1234362925274156804/original/a4535ad2-c176-4ae7-9ef8-36a15613f029.jpeg?im_w=720&im_format=avif" />
          </div>
          <div>
            <img src="https://a0.muscache.com/im/pictures/ef9c14d6-eb40-4c2d-87b9-d04ead9d72fd.jpg?im_w=720&im_format=avif" />
          </div>
        </CarouselStyled>
      </div>
    </div>
  );
}
