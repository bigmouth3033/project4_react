import XButton from "@/shared/components/Button/XButton";
import PopUp from "@/shared/components/PopUp/PopUp";
import styled from "styled-components";
import TextInput from "@/shared/components/Input/TextInput";
import moment from "moment";
import { useState } from "react";
import Calendar from "react-calendar";

const PopUpContainer = styled(PopUp)`
  padding: 0;
  width: 30rem;
  border-radius: 15px;

  & hr {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
`;

const Header = styled.div`
  padding: 1rem 1rem;
  display: flex;
  justify-content: space-between;
`;

const Body = styled.div`
  padding: 2rem;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  > div {
    display: flex;
    flex-direction: column;
    gap: 10px;
    > p {
      color: rgba(0, 0, 0, 0.6);
    }
  }
`;

const Footer = styled.div`
  padding: 2rem;
`;

const CustomRangeInput = styled.input`
  padding: 8px;
  width: 100%;

  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  outline: none;
  transition: all 0.3s;
  cursor: pointer;

  &:focus {
    border: 2px solid black;
  }

  &:active {
    border: 2px solid black;
  }
`;

const DropDownContainer = styled.div`
  z-index: 1;
  background-color: white;
  position: absolute;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 25px;
  padding: 1rem;
  transform: translate(-11rem, 0.4rem);
  .react-calendar {
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    display: flex;
    flex-direction: column;
    background: white;
    line-height: 1.125em;
    border: none;
  }
  /* 
  .react-calendar--doubleView {
    width: 500px;
  } */

  .react-calendar--doubleView .react-calendar__viewContainer {
    display: flex;
    column-gap: 1.5rem;
    margin: -0.5em;
  }

  .react-calendar--doubleView .react-calendar__viewContainer > * {
    width: 50%;
    margin: 0.5em;
  }

  .react-calendar,
  .react-calendar *,
  .react-calendar *:before,
  .react-calendar *:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  .react-calendar button {
    margin: 0;
    border: 0;
    outline: none;
  }

  .react-calendar button:enabled:hover {
    cursor: pointer;
  }

  .react-calendar__navigation {
    display: flex;
    height: 44px;
    margin-bottom: 1em;
  }

  .react-calendar__navigation button {
    min-width: 44px;
    background: none;
  }

  .react-calendar__navigation button:disabled {
    background-color: #f0f0f0;
  }

  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: #e6e6e6;
  }

  .react-calendar__month-view__weekdays {
    text-align: center;
    text-transform: uppercase;
    text-decoration: none !important; /* Remove underline */
    font-size: 0.8rem;
    font-weight: bold;
  }

  .react-calendar__month-view__weekdays__weekday {
    padding: 0.5em;
  }

  .react-calendar__month-view__weekNumbers .react-calendar__tile {
    display: flex;
    align-items: center;
    justify-content: center;
    font: inherit;
    font-size: 0.75em;
    font-weight: bold;
  }

  .react-calendar__month-view__days__day--weekend {
    color: #d10000;
  }

  .react-calendar__month-view__days__day--neighboringMonth {
    color: #757575;
  }

  .react-calendar__year-view .react-calendar__tile,
  .react-calendar__decade-view .react-calendar__tile,
  .react-calendar__century-view .react-calendar__tile {
    padding: 2em 0.5em;
  }

  .react-calendar__tile {
    max-width: 100%;
    aspect-ratio: 1;
    background: none;
    margin: 10px;
    text-align: center;
    line-height: 16px;
    font: inherit;
    font-size: 1em;
    transition: background-color 0.3s ease, color 0.3s ease;
    border-radius: 50%;
    @media (max-width: 992px) {
      height: 50px;
    }
  }

  .react-calendar__tile:disabled,
  .react-calendar__tile--disabled {
    background-color: #e2e4e6 !important; /* Màu nền khi disable */
    color: #b0b0b0; /* Màu chữ khi disable */
    cursor: not-allowed !important; /* Đổi con trỏ thành "not-allowed" */
    pointer-events: none; /* Vô hiệu hóa sự kiện chuột */
  }

  .react-calendar--selectRange .react-calendar__tile--hover {
    background-color: rgba(0, 0, 0, 0.5);
  }

  /* Hiệu ứng hover cho từng ô không bị vô hiệu hóa */
  .react-calendar__tile:not(.react-calendar__tile--disabled):hover {
    background-color: rgba(0, 0, 0, 0.5);
    color: black; /* Màu chữ khi hover */
    cursor: pointer; /* Đổi con trỏ thành dạng pointer */
    border-radius: 50%;
  }
  .react-calendar__tile--active:hover,
  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: black;
  }
  .react-calendar__tile--active {
    background: black;
    color: white;
  }
  .react-calendar__navigation__label {
    pointer-events: none; /* Chặn click vào phần tháng/năm */
    cursor: default;
    font-size: 1.5rem;
  }
  .react-calendar__navigation button {
    /* Style cho các nút chuyển tháng */
    background-color: transparent;
    border: none;
    cursor: pointer;
    border-radius: 50%;
    font-size: 18px;
    padding: 10px;
    transition: color 0.3s, transform 0.3s;

    &:hover {
      color: #ff0000;
      transform: scale(1);
    }

    &:active {
      transform: scale(1);
    }
  }
`;

const CalendarStyled = styled(Calendar)`
  border: none;
`;

export default function CreateDiscountPopUp({ action }) {
  const now = new Date();

  const [title, setTitle] = useState(
    `Discount from ${now.getFullYear()}-${now.getMonth()}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
  );
  const [range, setRange] = useState();
  const [isDateSelect, setIsDateSelect] = useState(false);

  return (
    <PopUpContainer action={() => {}}>
      <Header>
        <h4>Create new discount</h4>
        <XButton action={action} />
      </Header>
      <hr />
      <Body>
        <div>
          <p>Discount title *</p>
          <TextInput state={title} setState={setTitle} />
        </div>
        <div>
          <p>Time conversion</p>
          <CustomRangeInput onClick={() => setIsDateSelect((prev) => !prev)} />

          <CalendarContainer>
            <CalendarStyled
              selectRange={true}
              onChange={(value) => {
                if (moment(value[0]).isSame(moment(value[1]), "days")) {
                  return;
                }
                setRange(value);
              }}
              value={range}
            />
          </CalendarContainer>
        </div>
      </Body>
      <hr />
      <Footer></Footer>
    </PopUpContainer>
  );
}
