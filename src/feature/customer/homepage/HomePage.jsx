import styled from "styled-components";
import CustomerHeader from "../custome_header/CustomerHeader";
import { FilterBar } from "./FilterBar";
import { PropertiesRequest } from "./api/propertyClientApi";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { IoMdStar } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
import { GrFormNext } from "react-icons/gr";
import { GrFormPrevious } from "react-icons/gr";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CategoriesRequest } from "../../../shared/api/categoryClientApi";
import dchc from "@/shared/data/dchc";
import { CollectionPopUp } from "./CollectionPopUp";
import getWords from "@/shared/utils/getWords";
import { UserRequest } from "@/shared/api/userApi";
import RegisterPopUp from "../custome_header/components/RegisterPopUp";
import { DeleteFavouriteMutation } from "./api/collectionFavApi";

//npm install react-multi-carousel --save

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
  cursor: pointer;
  aspect-ratio: 1/1.25;
  display: grid; //important => delete => BROKENNNNNN
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
  display: grid;
  grid-template-columns: 6fr 1fr;
  font-size: 0.9rem;
  overflow: hidden; /* Ẩn phần thừa */
  white-space: nowrap; /* Không cho dòng xuống */
  text-overflow: ellipsis; /* Thêm dấu "..." */

  & > div:nth-child(1) {
    display: block; /* Đảm bảo tiêu đề là một block */
    width: 100%; /* Giới hạn chiều rộng của tiêu đề */
    overflow: hidden; /* Ẩn phần thừa */
    white-space: nowrap; /* Không cho dòng xuống */
    text-overflow: ellipsis; /* Thêm dấu "..." */
    & div:nth-child(2) {
      color: gray;
    }
  }
  //CSS rating
  & > div:nth-child(2) {
    display: flex;
    justify-content: end;
    align-items: start;
    > div {
      display: flex;
      align-items: center;
    }
  }
`;

const convertAddressCode = (addressCode) => {
  var addrressArr = addressCode.split("_");
  const tempProvince = dchc.data.find(
    (city) => city.level1_id == addrressArr[0]
  );
  const tempDistrict = tempProvince.level2s.find(
    (district) => district.level2_id == addrressArr[1]
  );
  const tempWard = tempDistrict.level3s.find(
    (ward) => ward.level3_id == addrressArr[2]
  );
  return [tempDistrict.name + ", " + tempProvince.name];
};

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
  //Call CATE API
  const categoriesRequest = CategoriesRequest();
  //Call User API
  const user = UserRequest();
  const deleteFavouriteMutation = DeleteFavouriteMutation();
  const [categoryId, setCategoryId] = useState(
    categoriesRequest.isSuccess == true
      ? categoriesRequest.data.data[0].id
      : null
  );

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [propertyId, setPropertyId] = useState(null);
  const [isPopUp, setIsPopUp] = useState(false);
  const [isLoginPopUp, setIsLoginPopUp] = useState(false);
  const [selectedAmenity, setSelectedAmenity] = useState([]);
  const [selectedPropertyType, setSelectedPropertyType] = useState(null);
  const [isInstant, setIsInstant] = useState(null);
  const [isPetAllow, setIsPetAllow] = useState(null);
  const [isSelfCheckin, setIsSelfCheckin] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState([0, 100000]);
  const [selectedRoom, setSelectedRoom] = useState(1);
  const [selectedBed, setSelectedBed] = useState(1);
  const [selectedBathRoom, setSelectedBathRoom] = useState(1);
  const [location, setLocation] = useState(null);
  const [guest, setGuest] = useState(null);

  //Call main API
  const properties = PropertiesRequest(
    categoryId,
    selectedPropertyType,
    selectedAmenity,
    isInstant,
    isPetAllow,
    isSelfCheckin,
    selectedPrice,
    selectedRoom,
    selectedBed,
    selectedBathRoom,
    location,
    guest
  );

  const HandleLove = (propertyID) => {
    //check login or not
    if (user.data.data != null) {
      const formData = new FormData();
      formData.append("userId", user.data.data.id);
      formData.append("propertyId", propertyID);

      deleteFavouriteMutation.mutateAsync(formData).then((response) => {
        // Kiểm tra statusCode từ phản hồi
        if (response.status === 204) {
          properties.refetch();
        } else if (response.status === 201) {
          setIsPopUp(true);
          setPropertyId(propertyID);
          setSearchParams({
            propertyId: propertyID,
            userId: user.data.data.id,
          });
          properties.refetch();
        }
      });
    } else {
      setIsLoginPopUp(true);
    }
  };

  return (
    <StyleContainer>
      <StyleHeaderContainer>
        <CustomerHeader {...{ properties }} />
        <div>
          <FilterBar
            properties={properties}
            categoryId={categoryId}
            setCategoryId={setCategoryId}
            selectedAmenity={selectedAmenity}
            setSelectedAmenity={setSelectedAmenity}
            selectedPropertyType={selectedPropertyType}
            setSelectedPropertyType={setSelectedPropertyType}
            isInstant={isInstant}
            isPetAllow={isPetAllow}
            isSelfCheckin={isSelfCheckin}
            setIsInstant={setIsInstant}
            setIsPetAllow={setIsPetAllow}
            setIsSelfCheckin={setIsSelfCheckin}
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
                      <div
                        className="box"
                        key={image.id}
                        style={{ position: "relative" }}
                      >
                        <img
                          onClick={() => navigate(`/product-detail/${item.id}`)}
                          src={image.imageName}
                        />
                        <IoMdHeart
                          style={{
                            position: "absolute",
                            zIndex: "2",
                            right: "10px",
                            top: "10px",
                            color:
                              user?.data?.data?.id &&
                              item.favourites.find(
                                (fav) => fav.id.userId == user.data.data.id
                              )
                                ? "red"
                                : "gray",
                            cursor: "pointer",
                            filter:
                              "drop-shadow(0.1rem 0 white) drop-shadow(-1px 0 white) drop-shadow(0 1px white) drop-shadow(0 -1px white)",
                          }}
                          onClick={() => HandleLove(item.id)}
                        />
                      </div>
                    );
                  })}
                </CarouselStyled>
                <StyleContent
                  onClick={() => navigate(`/product-detail/${item.id}`)}
                >
                  <div>
                    <div>
                      <b>{getWords(item.propertyTitle, 7)}</b>
                    </div>
                    <div>{convertAddressCode(item.addressCode)}</div>
                    <div>
                      $ <b>{item.basePrice}</b> /night
                    </div>
                  </div>
                  <div>
                    <div>
                      <IoMdStar />
                      <p>4.6</p>
                    </div>
                  </div>
                </StyleContent>
              </StyleBodyItem>
            );
          })}

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
                      <div
                        className="box"
                        key={image.id}
                        style={{ position: "relative" }}
                      >
                        <img src={image.imageName} />
                        <IoMdHeart
                          style={{
                            position: "absolute",
                            zIndex: "2",
                            right: "10px",
                            top: "10px",
                            color:
                              user?.data?.data?.id &&
                              item.favourites.find(
                                (fav) => fav.id.userId == user.data.data.id
                              )
                                ? "red"
                                : "gray",
                            cursor: "pointer",
                            filter:
                              "drop-shadow(0.1rem 0 white) drop-shadow(-1px 0 white) drop-shadow(0 1px white) drop-shadow(0 -1px white)",
                          }}
                          onClick={() => HandleLove(item.id)}
                        />
                      </div>
                    );
                  })}
                </CarouselStyled>
                <StyleContent>
                  <div>
                    <div>
                      <b>{getWords(item.propertyTitle, 7)}</b>
                    </div>
                    <div>{convertAddressCode(item.addressCode)}</div>
                    <div>
                      $ <b>{item.basePrice}</b> /night
                    </div>
                  </div>
                  <div>
                    <div>
                      <IoMdStar />
                      <p>4.6</p>
                    </div>
                  </div>
                </StyleContent>
              </StyleBodyItem>
            );
          })}

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
                      <div
                        className="box"
                        key={image.id}
                        style={{ position: "relative" }}
                      >
                        <img src={image.imageName} />
                        <IoMdHeart
                          style={{
                            position: "absolute",
                            zIndex: "2",
                            right: "10px",
                            top: "10px",
                            color:
                              user?.data?.data?.id &&
                              item.favourites.find(
                                (fav) => fav.id.userId == user.data.data.id
                              )
                                ? "red"
                                : "gray",
                            cursor: "pointer",
                            filter:
                              "drop-shadow(0.1rem 0 white) drop-shadow(-1px 0 white) drop-shadow(0 1px white) drop-shadow(0 -1px white)",
                          }}
                          onClick={() => HandleLove(item.id)}
                        />
                      </div>
                    );
                  })}
                </CarouselStyled>
                <StyleContent>
                  <div>
                    <div>
                      <b>{getWords(item.propertyTitle, 7)}</b>
                    </div>
                    <div>{convertAddressCode(item.addressCode)}</div>
                    <div>
                      $ <b>{item.basePrice}</b> /night
                    </div>
                  </div>
                  <div>
                    <div>
                      <IoMdStar />
                      <p>4.6</p>
                    </div>
                  </div>
                </StyleContent>
              </StyleBodyItem>
            );
          })}

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
                      <div
                        className="box"
                        key={image.id}
                        style={{ position: "relative" }}
                      >
                        <img src={image.imageName} />
                        <IoMdHeart
                          style={{
                            position: "absolute",
                            zIndex: "2",
                            right: "10px",
                            top: "10px",
                            color:
                              user?.data?.data?.id &&
                              item.favourites.find(
                                (fav) => fav.id.userId == user.data.data.id
                              )
                                ? "red"
                                : "gray",
                            cursor: "pointer",
                            filter:
                              "drop-shadow(0.1rem 0 white) drop-shadow(-1px 0 white) drop-shadow(0 1px white) drop-shadow(0 -1px white)",
                          }}
                          onClick={() => HandleLove(item.id)}
                        />
                      </div>
                    );
                  })}
                </CarouselStyled>
                <StyleContent>
                  <div>
                    <div>
                      <b>{getWords(item.propertyTitle, 7)}</b>
                    </div>
                    <div>{convertAddressCode(item.addressCode)}</div>
                    <div>
                      $ <b>{item.basePrice}</b> /night
                    </div>
                  </div>
                  <div>
                    <div>
                      <IoMdStar />
                      <p>4.6</p>
                    </div>
                  </div>
                </StyleContent>
              </StyleBodyItem>
            );
          })}

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
                      <div
                        className="box"
                        key={image.id}
                        style={{ position: "relative" }}
                      >
                        <img src={image.imageName} />
                        <IoMdHeart
                          style={{
                            position: "absolute",
                            zIndex: "2",
                            right: "10px",
                            top: "10px",
                            color:
                              user?.data?.data?.id &&
                              item.favourites.find(
                                (fav) => fav.id.userId == user.data.data.id
                              )
                                ? "red"
                                : "gray",
                            cursor: "pointer",
                            filter:
                              "drop-shadow(0.1rem 0 white) drop-shadow(-1px 0 white) drop-shadow(0 1px white) drop-shadow(0 -1px white)",
                          }}
                          onClick={() => HandleLove(item.id)}
                        />
                      </div>
                    );
                  })}
                </CarouselStyled>
                <StyleContent>
                  <div>
                    <div>
                      <b>{getWords(item.propertyTitle, 7)}</b>
                    </div>
                    <div>{convertAddressCode(item.addressCode)}</div>
                    <div>
                      $ <b>{item.basePrice}</b> /night
                    </div>
                  </div>
                  <div>
                    <div>
                      <IoMdStar />
                      <p>4.6</p>
                    </div>
                  </div>
                </StyleContent>
              </StyleBodyItem>
            );
          })}

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
                      <div
                        className="box"
                        key={image.id}
                        style={{ position: "relative" }}
                      >
                        <img src={image.imageName} />
                        <IoMdHeart
                          style={{
                            position: "absolute",
                            zIndex: "2",
                            right: "10px",
                            top: "10px",
                            color:
                              user?.data?.data?.id &&
                              item.favourites.find(
                                (fav) => fav.id.userId == user.data.data.id
                              )
                                ? "red"
                                : "gray",
                            cursor: "pointer",
                            filter:
                              "drop-shadow(0.1rem 0 white) drop-shadow(-1px 0 white) drop-shadow(0 1px white) drop-shadow(0 -1px white)",
                          }}
                          onClick={() => HandleLove(item.id)}
                        />
                      </div>
                    );
                  })}
                </CarouselStyled>
                <StyleContent>
                  <div>
                    <div>
                      <b>{getWords(item.propertyTitle, 7)}</b>
                    </div>
                    <div>{convertAddressCode(item.addressCode)}</div>
                    <div>
                      $ <b>{item.basePrice}</b> /night
                    </div>
                  </div>
                  <div>
                    <div>
                      <IoMdStar />
                      <p>4.6</p>
                    </div>
                  </div>
                </StyleContent>
              </StyleBodyItem>
            );
          })}

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
                      <div
                        className="box"
                        key={image.id}
                        style={{ position: "relative" }}
                      >
                        <img src={image.imageName} />
                        <IoMdHeart
                          style={{
                            position: "absolute",
                            zIndex: "2",
                            right: "10px",
                            top: "10px",
                            color:
                              user?.data?.data?.id &&
                              item.favourites.find(
                                (fav) => fav.id.userId == user.data.data.id
                              )
                                ? "red"
                                : "gray",
                            cursor: "pointer",
                            filter:
                              "drop-shadow(0.1rem 0 white) drop-shadow(-1px 0 white) drop-shadow(0 1px white) drop-shadow(0 -1px white)",
                          }}
                          onClick={() => HandleLove(item.id)}
                        />
                      </div>
                    );
                  })}
                </CarouselStyled>
                <StyleContent>
                  <div>
                    <div>
                      <b>{getWords(item.propertyTitle, 7)}</b>
                    </div>
                    <div>{convertAddressCode(item.addressCode)}</div>
                    <div>
                      $ <b>{item.basePrice}</b> /night
                    </div>
                  </div>
                  <div>
                    <div>
                      <IoMdStar />
                      <p>4.6</p>
                    </div>
                  </div>
                </StyleContent>
              </StyleBodyItem>
            );
          })}
      </StyleBody>
      {isPopUp && (
        <CollectionPopUp
          {...{ properties, propertyId, action: () => setIsPopUp(false) }}
        />
      )}
      {isLoginPopUp && (
        <RegisterPopUp {...{ action: () => setIsLoginPopUp(false) }} />
      )}
    </StyleContainer>
  );
}
