import styled, { css } from "styled-components";
import { useState } from "react";
import logo from "@/feature/customer/custome_header/assets/URBAN NEST (2).svg";
import Avatar from "react-avatar";
import default_avatar from "@/shared/assets/images/default_avatar.jpg";
import { FaBars } from "react-icons/fa6";
import { useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import { useRef } from "react";
import RegisterPopUp from "./components/RegisterPopUp";
import { UserRequest } from "@/shared/api/userApi";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  padding: 1.4rem 1rem;
  display: flex;
  justify-content: space-between;
  background-color: white;
  z-index: 1;
`;

const LogoContainer = styled.div`
  width: 170px;
`;

const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  z-index: 1;

  transition: all 0.4s ease-in-out;
  transform: ${(props) => (props.$event === "SCROLL" ? "scale(0.9)" : "scale(1)")};
`;

const Right = styled.div`
  position: relative;
  display: flex;
  gap: 10px;
  align-items: baseline;

  h5 {
    font-size: 16px;
    cursor: pointer;
  }
`;

const DropDownButton = styled.button`
  > svg {
    font-size: 14px;
  }

  background-color: white;
  cursor: pointer;
  padding: 5px 13px;
  border-radius: 25px;

  display: flex;
  align-items: center;
  gap: 12px;
  border: 2.5px solid white;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;

  &:hover {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  }

  &:focus {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    border: 2.5px solid black;
    font-weight: 600;
  }
`;

const FilterBar = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1.3fr;

  ${(props) => {
    if (props.$event == "SCROLL") {
      return css`
        grid-template-columns: 1fr;
      `;
    }
  }}

  gap: 5px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 50px;

  > div {
    display: flex;
    flex-direction: column;
    position: relative;
    > button {
      width: 100%;
      background-color: white;
      border-radius: 50px;
      cursor: pointer;
      padding: 1rem 2.5rem;
      border: none;

      display: flex;
      flex-direction: column;
      > p {
        color: rgba(0, 0, 0, 0.4);
        font-size: 14px;
      }
    }

    > button:hover {
      background-color: #f1f1f1;
    }

    > button:focus {
      box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
    }
  }
`;

const PlaceToStay = styled.div`
  > h5 {
    font-size: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    &::after {
      content: "";
      position: absolute;
      border-bottom: 2px solid black;
      width: 20px;
      height: 1px;
      transform: translateY(25px);
    }
  }
`;

const ScrollButton = styled.button`
  background-color: white;
  border: none;
  display: flex;
  align-items: center;
  gap: 10rem;
  justify-content: space-between;
  padding: 8px 1rem;
  border-radius: 50px;
  cursor: pointer;
  font-weight: 500;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  font-size: 18px;

  > span {
    display: block;
    border-radius: 50%;

    background-color: red;
    > svg {
      color: white;
      padding: 5px;
      font-size: 30px;
    }
  }
`;

const DropDownContainer = styled.div`
  z-index: 1;
  position: absolute;
  display: flex;
  flex-direction: column;
  background-color: white;
  transform: translate(-20px, 50px);
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  border-radius: 15px;

  > button {
    width: 15rem;
    padding: 10px 1rem;
    border: none;
    background-color: white;
    cursor: pointer;
    text-align: left;
  }

  > .focus {
    font-weight: 600;
  }

  > button:hover {
    background-color: #f1f1f1;
  }

  > button:nth-of-type(1) {
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
  }

  > button:nth-last-child(1) {
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
  }
`;

const NotSignUpDropDownContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  background-color: white;
  transform: translate(-150px, 50px);
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  border-radius: 15px;

  > button {
    width: 15rem;
    padding: 10px 1rem;
    border: none;
    background-color: white;
    cursor: pointer;
    text-align: left;
  }

  > .focus {
    font-weight: 600;
  }

  > button:hover {
    background-color: #f1f1f1;
  }

  > button:nth-of-type(1) {
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
  }

  > button:nth-last-child(1) {
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
  }
`;

const LocationDropDown = styled.div`
  position: absolute;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  z-index: 1;
  width: 20rem;
  height: 20rem;
  background-color: white;
  transform: translate(0, 5rem);
  border-radius: 15px;
  background-color: white;
`;

const DateDropDown = styled.div`
  position: absolute;

  position: absolute;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  z-index: 1;
  width: 50rem;
  height: 30rem;
  background-color: white;
  transform: translate(-17rem, 5rem);
  border-radius: 15px;
  background-color: white;
`;

const GuestDropDown = styled.div`
  position: absolute;

  position: absolute;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  z-index: 1;
  width: 20rem;
  height: 20rem;
  background-color: white;
  transform: translate(-8rem, 5rem);
  border-radius: 15px;
  background-color: white;
`;

export default function CustomerHeader() {
  const [locationDropDown, setLocationDropDown] = useState(false);
  const locationButtonRef = useRef();
  const locationDropDownRef = useRef();
  const [dateDropDown, setDateDropDown] = useState(false);
  const dateCheckInButtonRef = useRef();
  const dateCheckOutButtonRef = useRef();
  const dateDropDownRef = useRef();
  const [guessDropDown, setGuestDropDown] = useState(false);
  const guessButtonRef = useRef();
  const guessDropDownRef = useRef();
  const [scrollEvent, setScrollEvent] = useState("SCROLL"); // BEGIN, SCROLL, SCROLL_CLICK
  const scrollRef = useRef("BEGIN");
  const [isClickDropDown, setIsCLickDropDown] = useState(false);
  const dropDownRef = useRef();
  const dropDownButtonRef = useRef();
  const containerRef = useRef();
  const [isRegisterPopUp, setIsRegisterPopUp] = useState("");
  const navigate = useNavigate();
  const user = UserRequest();

  useEffect(() => {
    const event = function () {
      if (locationDropDownRef.current) {
        setLocationDropDown(false);
      }

      if (dateDropDownRef.current) {
        setDateDropDown(false);
      }

      if (guessDropDownRef.current) {
        setGuestDropDown(false);
      }

      if (window.scrollY > 20) {
        if (containerRef.current) {
          containerRef.current.style.position = "fixed";
          containerRef.current.style.width = "90%";
        }
        if (scrollRef.current != "SCROLL") {
          setScrollEvent("SCROLL");
          scrollRef.current = "SCROLL";
        }
      } else {
        if (containerRef.current) {
          containerRef.current.style.position = "relative";
          containerRef.current.style.width = "100%";
        }

        if (scrollRef.current) {
          if (scrollRef.current != "BEGIN") {
            setScrollEvent("BEGIN");
            scrollRef.current = "BEGIN";
          }
        }
      }
    };

    window.addEventListener("scroll", event);
    return () => {
      document.removeEventListener("scroll", event);
    };
  }, []);

  useEffect(() => {
    const event = (ev) => {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(ev.target) &&
        !dropDownButtonRef.current.contains(ev.target)
      ) {
        setIsCLickDropDown(false);
      }

      if (
        locationDropDownRef.current &&
        !locationButtonRef.current.contains(ev.target) &&
        !locationDropDownRef.current.contains(ev.target)
      ) {
        setLocationDropDown(false);
      }

      if (
        guessDropDownRef.current &&
        !guessDropDownRef.current.contains(ev.target) &&
        !guessButtonRef.current.contains(ev.target)
      ) {
        setGuestDropDown(false);
      }

      if (
        dateDropDownRef.current &&
        !dateDropDownRef.current.contains(ev.target) &&
        !dateCheckInButtonRef.current.contains(ev.target) &&
        !dateCheckOutButtonRef.current.contains(ev.target)
      ) {
        setDateDropDown(false);
      }
    };

    document.addEventListener("mousedown", event);

    return () => {
      document.removeEventListener("mousedown", event);
    };
  }, []);

  return (
    <>
      <Container ref={containerRef}>
        <LogoContainer>
          <img src={logo} />
        </LogoContainer>
        <Center $event={scrollEvent}>
          {(scrollEvent == "BEGIN" || scrollEvent == "SCROLL_CLICK") && (
            <PlaceToStay>
              <h5>Place to stay</h5>
            </PlaceToStay>
          )}
          <FilterBar $event={scrollEvent}>
            {(scrollEvent == "BEGIN" || scrollEvent == "SCROLL_CLICK") && (
              <>
                <div>
                  <button ref={locationButtonRef} onClick={() => setLocationDropDown(true)}>
                    <h5>Location</h5>
                    <p>Where are you going?</p>
                  </button>
                  {locationDropDown && (
                    <LocationDropDown ref={locationDropDownRef}></LocationDropDown>
                  )}
                </div>
                <div>
                  <button ref={dateCheckInButtonRef} onClick={() => setDateDropDown(true)}>
                    <h5>Check in</h5>
                    <p>Add dates</p>
                  </button>
                  {dateDropDown && <DateDropDown ref={dateDropDownRef}></DateDropDown>}
                </div>
                <div>
                  <button ref={dateCheckOutButtonRef} onClick={() => setDateDropDown(true)}>
                    <h5>Check out</h5>
                    <p>Add dates</p>
                  </button>
                </div>
                <div>
                  <button ref={guessButtonRef} onClick={() => setGuestDropDown(true)}>
                    <h5>Guests</h5>
                    <p>Add guests</p>
                  </button>

                  {guessDropDown && <GuestDropDown ref={guessDropDownRef}></GuestDropDown>}
                </div>
              </>
            )}
            {scrollEvent == "SCROLL" && (
              <ScrollButton
                onClick={() => {
                  setScrollEvent("SCROLL_CLICK");
                  scrollRef.current = "SCROLL_CLICK";
                }}
              >
                Start your search
                <span>
                  <IoIosSearch />
                </span>
              </ScrollButton>
            )}
          </FilterBar>
        </Center>
        <Right>
          {user.isSuccess && user.data.status == 200 && user.data.data.host == true && (
            <h5 onClick={() => navigate("/hosting")}>Switch to hosting</h5>
          )}
          {user.isSuccess && user.data.status == 200 && user.data.data.host == false && (
            <h5 onClick={() => navigate("/become_a_host")}>Become a host</h5>
          )}
          <DropDownButton
            ref={dropDownButtonRef}
            onClick={() => setIsCLickDropDown((prev) => !prev)}
          >
            <FaBars />
            {user.isSuccess && user.data.status == 404 && (
              <Avatar src={default_avatar} round size="30" />
            )}
            {user.isSuccess && user.data.status == 200 && (
              <Avatar src={user.data.data.Avatar} name={user.data.data.firstName} round size="30" />
            )}
          </DropDownButton>
          {isClickDropDown && (
            <>
              {user.isSuccess && user.data.status == 404 && (
                <NotSignUpDropDownContainer>
                  <button
                    onClick={() => {
                      setIsCLickDropDown(false);
                      setIsRegisterPopUp(true);
                    }}
                  >
                    Sign up
                  </button>
                  <hr />
                  <button
                    onClick={() => {
                      setIsCLickDropDown(false);
                      setIsRegisterPopUp(true);
                    }}
                  >
                    Log in
                  </button>
                </NotSignUpDropDownContainer>
              )}
              {user.isSuccess && user.data.status == 200 && (
                <DropDownContainer ref={dropDownRef}>
                  <button className="focus" onClick={() => navigate("/messages")}>
                    Message
                  </button>
                  <button className="focus">Notification</button>
                  <button className="focus" onClick={() => navigate("/trips")}>
                    Trips
                  </button>
                  <button className="focus" onClick={() => navigate("/wishlist")}>
                    Wishlists
                  </button>
                  <hr />
                  <button>Manage Listings</button>
                  <button>Account</button>
                  <button>Create Listing</button>
                  <hr />
                  <button onClick={() => navigate("/messages", { state: { userId: 0 } })}>
                    Get help
                  </button>
                  <button
                    onClick={() => {
                      Cookies.remove("CLIENT_ACCESS_TOKEN");
                      user.refetch();
                      setIsCLickDropDown(false);
                    }}
                  >
                    Log out
                  </button>
                </DropDownContainer>
              )}
            </>
          )}
        </Right>
      </Container>
      {isRegisterPopUp && <RegisterPopUp action={() => setIsRegisterPopUp(false)} />}
    </>
  );
}
