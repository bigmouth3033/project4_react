import styled from "styled-components";
import { AdminRequest } from "@/shared/api/adminApi";
import TextInput from "@/shared/components/Input/TextInput";
import { useState } from "react";
import Calendar from "react-calendar";
import moment from "moment";
import formatDateRange from "@/shared/utils/formatDateRange";
import { MdOutlineDateRange } from "react-icons/md";
import { Link } from "react-router-dom";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { FaHouseUser } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { FaRegCalendar } from "react-icons/fa6";
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import BookingMap from "./components/BookingMap";

/* #region styled */
const Container = styled.div`
  margin: 2rem;
  padding: 2rem;
  min-height: 160vh;
  background-color: white;
`;

const CalendarStyled = styled(Calendar)`
  border: none;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;

  > div:nth-of-type(2) {
    position: relative;
  }

  & p {
    color: rgba(0, 0, 0, 0.5);
  }
`;

const CustomTextInput = styled.button`
  cursor: pointer;
  background-color: inherit;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;

  > div {
    height: 100%;
    background-color: black;
    padding: 11px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  & svg {
    color: white;
    font-size: 1.4rem;
  }

  & input {
    width: 10rem;
    cursor: pointer;
    border-radius: none !important;
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

const StyledTextInput = styled.input`
  padding: 8px;
  width: 100%;

  border: 2px solid rgba(0, 0, 0, 0.1);
  outline: none;
  transition: all 0.3s;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;

  &:focus {
    border: 2px solid black;
  }

  &:active {
    border: 2px solid black;
  }
`;

const BoxContainer = styled.div`
  display: flex;
  margin: 2rem 0;
  gap: 20px;

  > div {
    transition: all 0.5s;
    flex: 1;
    aspect-ratio: 1/0.5;
    cursor: pointer;
    /* box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px; */
    background-color: white;
    border: 1px solid rgba(255, 0, 0, 1);
    border-radius: 5px;
  }

  > div:hover {
    transform: translateY(-10px);
  }
`;

const BoxStyled = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & h4 {
    color: rgba(0, 0, 0, 0.4);
    font-size: 13px;
  }

  & a {
    font-size: 14px;
  }

  > div:nth-of-type(2) {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    > div:nth-of-type(2) {
      background-color: black;
      padding: 5px;
      border-radius: 5px;

      > svg {
        color: white;
        font-size: 30px;
      }
    }
  }
`;

const ChartStyled = styled.div`
  margin: 3rem 0;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1rem;
`;

const RevenueChart = styled.div`
  border: 1px solid rgba(255, 0, 0, 1);
  border-radius: 5px;

  > div:nth-of-type(2) {
    display: flex;
    border-bottom: 1px solid rgba(255, 0, 0, 1);

    & h4 {
      font-size: 14px;
    }

    & p {
      color: rgba(0, 0, 0, 0.5);
      font-size: 14px;
    }

    > div {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 1rem;
    }

    > div:nth-child(1),
    > div:nth-child(2),
    > div:nth-child(3) {
      border-right: 1px solid rgba(255, 0, 0, 1);
    }
  }

  > div:nth-of-type(1) {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid rgba(255, 0, 0, 1);
    padding: 1rem 1.5rem;

    > div {
      display: flex;
      gap: 2px;
      > button {
        background-color: white;
        cursor: pointer;
        border-radius: 5px;
        background-color: black;
        color: white;
        font-size: 11px;
      }

      > button:active {
        transform: scale(0.9);
      }
    }
  }
`;

const LocationChart = styled.div`
  border: 1px solid rgba(255, 0, 0, 1);
  border-radius: 5px;
`;

/* #endregion */

export default function DashBoard() {
  const now = new Date();
  const [date, setDate] = useState([
    new Date(now.getFullYear(), now.getMonth(), 1),
    new Date(now.getFullYear(), now.getMonth() + 1, 0),
  ]);
  const [isDateDropDown, setIsDateDropDown] = useState(false);
  const admin = AdminRequest();

  const data = [
    {
      name: "Jan",
      Booking: 5500,
      Earning: 24343,
      Refund: 23344,
    },
    {
      name: "Feb",
      Booking: 4500,
      Earning: 41343,
      Refund: 23344,
    },
    {
      name: "Mar",
      Booking: 5700,
      Earning: 124343,
      Refund: 23344,
    },
    {
      name: "Apr",
      Booking: 400,
      Earning: 44343,
      Refund: 244,
    },
    {
      name: "May",
      Booking: 500,
      Earning: 4243,
      Refund: 23344,
    },
    {
      name: "Jun",
      Booking: 4300,
      Earning: 44343,
      Refund: 23344,
    },
    {
      name: "Jul",
      Booking: 4500,
      Earning: 44323,
      Refund: 23344,
    },
    {
      name: "Aug",
      Booking: 5500,
      Earning: 4343,
      Refund: 23344,
    },
    {
      name: "Sep",
      Booking: 5200,
      Earning: 42343,
      Refund: 23344,
    },
    {
      name: "Oct",
      Booking: 5300,
      Earning: 44343,
      Refund: 4344,
    },
    {
      name: "Nov",
      Booking: 5400,
      Earning: 42343,
      Refund: 24444,
    },
    {
      name: "Dec",
      Booking: 5550,
      Earning: 44343,
      Refund: 53344,
    },
  ];

  return (
    <Container>
      <Header>
        <div>
          <h4>Good Morning, {admin.data.data.firstName}!</h4>
          <p>Here's what's happening with UrbanNest today.</p>
        </div>
        <div>
          <CustomTextInput onClick={() => setIsDateDropDown((prev) => !prev)}>
            <StyledTextInput value={formatDateRange(date[0], date[1])} readOnly={true} />
            <div>
              <MdOutlineDateRange />
            </div>
          </CustomTextInput>
          {isDateDropDown && (
            <DropDownContainer>
              <CalendarStyled
                selectRange={true}
                onChange={(value) => {
                  if (moment(value[0]).isSame(moment(value[1]), "days")) {
                    return;
                  }
                  setDate(value);
                }}
                value={date}
              />
            </DropDownContainer>
          )}
        </div>
      </Header>
      <BoxContainer>
        <BoxStyled>
          <div>
            <h4>TOTAL EARNINGS</h4>
          </div>
          <div>
            <div>
              <h3>$559.25k</h3>
              <Link>View net earnings</Link>
            </div>
            <div>
              <RiMoneyDollarCircleLine />
            </div>
          </div>
        </BoxStyled>

        <BoxStyled>
          <div>
            <h4>BOOKINGS</h4>
          </div>
          <div>
            <div>
              <h3>36,894</h3>
              <Link>View all bookings</Link>
            </div>
            <div>
              {" "}
              <FaRegCalendar />
            </div>
          </div>
        </BoxStyled>
        <BoxStyled>
          <div>
            <h4>CUSTOMERS</h4>
          </div>
          <div>
            <div>
              <h3>183.35M</h3>
              <Link>See details</Link>
            </div>
            <div>
              <CgProfile />
            </div>
          </div>
        </BoxStyled>
        <BoxStyled>
          <div>
            <h4>PROPERTIES</h4>
          </div>
          <div>
            <div>
              <h3>23.4k</h3>
              <Link>See details</Link>
            </div>
            <div>
              <FaHouseUser />
            </div>
          </div>
        </BoxStyled>
      </BoxContainer>
      <ChartStyled>
        <RevenueChart>
          <div>
            <h4>Revenue</h4>
            <div>
              <button>ALL</button>
              <button>1M</button>
              <button>6M</button>
              <button>1Y</button>
            </div>
          </div>
          <div>
            <div>
              <h4>7,585</h4>
              <p>Booking</p>
            </div>
            <div>
              <h4>$22.89k</h4>
              <p>Earnings</p>
            </div>
            <div>
              <h4>367</h4>
              <p>Refunds</p>
            </div>
            <div>
              <h4>18.92%</h4>
              <p>Conversation Ratio</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart
              data={data}
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              }}
            >
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis dataKey="name" scale="band" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="Refund" fill="#8884d8" stroke="#8884d8" />
              <Bar dataKey="Booking" barSize={20} fill="#413ea0" />
              <Line type="monotone" dataKey="Earning" stroke="#ff7300" />
            </ComposedChart>
          </ResponsiveContainer>
        </RevenueChart>
        <LocationChart>
          <BookingMap />
        </LocationChart>
      </ChartStyled>
    </Container>
  );
}
