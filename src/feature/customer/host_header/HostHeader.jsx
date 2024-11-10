import styled, { css } from "styled-components";
import logo from "@/shared/assets/images/logo.svg";
import Avatar from "react-avatar";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaRegBell } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useRef } from "react";
import { UserRequest } from "@/shared/api/userApi";
import { useState } from "react";
import { FaBars } from "react-icons/fa6";
import { useEffect } from "react";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  align-items: center;
  background-color: white;
`;

const Left = styled.div`
  width: 55px;
  cursor: pointer;
`;

const Center = styled.div`
  display: flex;
  align-items: center;
`;

const Right = styled.div`
  display: flex;
  gap: 15px;
  position: relative;
`;

const FocusButton = styled.button`
  background-color: white;
  cursor: pointer;
  padding: 5px 20px;
  border-radius: 25px;

  display: flex;
  align-items: center;
  gap: 5px;
  border: 2.5px solid white;

  &:hover {
    background-color: #f7f7f7;
  }

  &:focus {
    border: 2px solid black;
    font-weight: 600;
  }
`;

const CustomLink = styled(Link)`
  padding: 5px 15px;
  border-radius: 25px;
  color: black;
  text-decoration: none;
  font-weight: 600;
  background-color: white;
  color: rgba(0, 0, 0, 0.5);

  &:hover {
    background-color: #f7f7f7;
  }

  ${(props) => {
    if (props.$active == true) {
      return css`
        color: black;
        text-decoration: underline;
      `;
    }
  }}
`;

const CircleButton = styled.button`
  background-color: white;
  padding: 11px;
  border-radius: 50%;
  font-size: 16px;
  cursor: pointer;
`;

const DropDownContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  background-color: white;
  transform: translate(-90px, 50px);
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

export default function HostHeader() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isClickDropDown, setIsCLickDropDown] = useState(false);
  const dropDownRef = useRef();
  const dropDownButtonRef = useRef();
  const user = UserRequest();

  useEffect(() => {
    const event = (ev) => {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(ev.target) &&
        !dropDownButtonRef.current.contains(ev.target)
      ) {
        setIsCLickDropDown(false);
      }
    };

    document.addEventListener("mousedown", event);

    return () => {
      document.removeEventListener("mousedown", event);
    };
  }, []);

  return (
    <Container>
      <Left onClick={() => navigate("/hosting")}>
        <img src={logo} />
      </Left>
      <Center>
        <CustomLink $active={location.pathname == "/hosting"} to={"/hosting"}>
          Today
        </CustomLink>
        <CustomLink $active={location.pathname == "/hosting/calendar"} to={"/hosting/calendar"}>
          Calendar
        </CustomLink>
        <CustomLink $active={location.pathname == "/hosting/listing"} to={"/hosting/listing"}>
          Listings
        </CustomLink>
        <CustomLink $active={location.pathname == "/hosting/messages"} to={"hosting/messages"}>
          Messages
        </CustomLink>
        <FocusButton>
          Menu <IoIosArrowDown />
        </FocusButton>
      </Center>
      <Right>
        <div>
          <CircleButton>
            <FaRegBell />
          </CircleButton>
        </div>
        <DropDownButton ref={dropDownButtonRef} onClick={() => setIsCLickDropDown((prev) => !prev)}>
          <FaBars />
          {user.isSuccess && user.data.status == 404 && (
            <Avatar src={default_avatar} round size="30" />
          )}
          {user.isSuccess && user.data.status == 200 && (
            <Avatar src={user.data.data.Avatar} name={user.data.data.firstName} round size="30" />
          )}
        </DropDownButton>
        {isClickDropDown && (
          <DropDownContainer ref={dropDownRef}>
            {user.isSuccess && user.data.status == 404 && (
              <>
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
              </>
            )}
            {user.isSuccess && user.data.status == 200 && (
              <>
                <button className="focus">Message</button>
                <button className="focus">Notification</button>
                <button className="focus">Trips</button>
                <button className="focus">Wishlists</button>
                <hr />
                <button>Manage Listings</button>
                <button>Account</button>
                <button>Create Listing</button>
                <hr />
                <button
                  onClick={() => {
                    Cookies.remove("CLIENT_ACCESS_TOKEN");
                    user.refetch();
                    setIsCLickDropDown(false);
                  }}
                >
                  Log out
                </button>
              </>
            )}
          </DropDownContainer>
        )}
      </Right>
    </Container>
  );
}
