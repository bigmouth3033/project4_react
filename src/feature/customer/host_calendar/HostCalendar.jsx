import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import styled from "styled-components";
import { GetHostCalendarRequest } from "./api/hostCalendarApi";
import WaitingPopUp from "@/shared/components/PopUp/WaitingPopUp";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import ListingSelectionPopUp from "./components/ListingSelectionPopUp";
import { GetBookingOfPropertyRequest } from "./api/hostCalendarApi";
import Avatar from "react-avatar";
import RedButton from "@/shared/components/Button/RedButton1";
import WhiteButton from "@/shared/components/Button/WhiteButton";
import TextInput from "@/shared/components/Input/TextInput";

const localizer = momentLocalizer(moment);

const ContainerStyled = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  height: 88vh;
`;

const CalendarStyled = styled.div`
  height: 100%;
`;

const RightStyled = styled.div`
  padding: 1rem;
  height: 88vh;

  overflow: auto;
`;

const ButtonContainerStyled = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: start;

  > button {
    background-color: white;
    padding: 10px 3rem;
    border-radius: 25px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  > button:active {
    transform: scale(0.9);
  }

  & svg {
    font-size: 19px;
  }
`;

const RightHeaderStyled = styled.div`
  padding: 1rem;
  & h4 {
    font-size: 25px;
  }

  & p {
    color: rgba(0, 0, 0, 0.5);
    font-size: 17px;
  }
`;

const BasePriceStyled = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  > div:nth-of-type(1) {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    > h4 {
      font-size: 20px;
    }

    > span {
      font-size: 14px;
      text-decoration: underline;
      font-weight: 600;
    }
  }

  > div:nth-of-type(2) {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
    gap: 0.6rem;
    border-radius: 20px;
    padding: 1.5rem;

    > span:nth-of-type(1) {
      font-weight: 600;
    }

    > span:nth-of-type(2) {
      font-weight: 600;
      font-size: 35px;
    }
  }
`;

const DiscountStyled = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  > div:nth-of-type(1) {
    display: flex;
    flex-direction: column;

    > h4 {
      font-size: 20px;
    }

    > p {
      font-size: 17px;
      color: rgba(0, 0, 0, 0.5);
    }
  }

  > div:nth-of-type(2),
  > div:nth-of-type(3) {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
    gap: 0.3rem;
    border-radius: 20px;
    padding: 1.5rem;

    > span:nth-of-type(1) {
      font-weight: 600;
      font-size: 35px;
    }

    > div {
      display: flex;
      flex-direction: column;

      > span:nth-of-type(1) {
        color: rgba(0, 0, 0, 0.7);
        font-size: 15px;
      }

      > span:nth-of-type(2) {
        color: rgba(0, 0, 0, 0.5);
        font-size: 14px;
      }
    }
  }
`;

const ChangeBasePriceStyled = styled.div`
  margin: 10rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  & h4 {
    font-size: 18px;
  }

  > div:nth-of-type(1) {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
    gap: 0.6rem;
    border-radius: 20px;
    padding: 1.5rem;

    > span:nth-of-type(1) {
      font-weight: 600;
    }

    > span:nth-of-type(2) {
      font-weight: 600;
      font-size: 35px;
    }

    > div {
      display: flex;
      align-items: center;
      font-weight: 900;
      > span {
        font-size: 30px;
      }

      > input {
        border: none;
        font-size: 30px;
        text-decoration: underline;
      }
    }
  }

  > div:nth-of-type(2) {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;

    & button {
      width: 100%;
    }
  }
`;

const ChangeWeeklyDiscountStyled = styled.div`
  margin: 10rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  & h4 {
    font-size: 18px;
  }

  > div:nth-of-type(1) {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
    gap: 0.6rem;
    border-radius: 20px;
    padding: 1.5rem;

    > span:nth-of-type(1) {
      font-weight: 600;
    }

    > span:nth-of-type(2) {
      color: rgba(0, 0, 0, 0.5);
    }

    > div {
      display: flex;
      align-items: center;
      font-weight: 900;
      > span {
        font-size: 30px;
      }

      > input {
        border: none;
        font-size: 30px;
        text-decoration: underline;
      }
    }
  }

  > div:nth-of-type(2) {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;

    & button {
      width: 100%;
    }
  }
`;

const CustomEvent = ({ event }) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <span>
        {event.avatar && <Avatar round size="40" src={event.avatar} name={event.title} />}{" "}
        {event.title}
      </span>
    </div>
  );
};

export default function HostCalendar() {
  const [basePrice, setBasePrice] = useState();
  const [monthlyDiscount, setMonthlyDiscount] = useState();
  const [weeklyDiscount, setWeeklyDiscount] = useState();
  const [currentStartDate, setCurrentStartDate] = useState(moment().startOf("day").toDate());
  const [currentEndDate, setCurrentEndDate] = useState(moment().endOf("month").toDate());
  const [isSelectedPopUp, setIsSelectedPopUp] = useState(false);
  const [chosenProperty, setChosenProperty] = useState({});
  const [events, setEvents] = useState([]);
  const [priceEvent, setPriceEvent] = useState([]);
  const [bookingEvent, setBookingEvent] = useState([]);
  const [disabledDate, setDisabledDate] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);
  const getHostCalendar = GetHostCalendarRequest();
  const getBookingOfProperty = GetBookingOfPropertyRequest(chosenProperty.id);
  const [isChangePrice, setIsChangePrice] = useState();
  const [isChangeWeeklyDiscount, setIsChangeWeeklyDiscount] = useState();
  const [isChangeMonthlyDiscount, setIsChangeMonthlyDiscount] = useState();

  useEffect(() => {
    if (getHostCalendar.isSuccess) {
      if (getHostCalendar.data.data.length > 0) {
        setChosenProperty(getHostCalendar.data.data[0]);
      }
    }
  }, [getHostCalendar.isSuccess]);

  useEffect(() => {
    if (chosenProperty && getBookingOfProperty.isSuccess) {
      setBasePrice(chosenProperty.basePrice);
      setWeeklyDiscount(chosenProperty.weeklyDiscount);
      setMonthlyDiscount(chosenProperty.monthlyDiscount);
      const today = moment(currentStartDate).toDate();
      const endOfMonth = moment(currentEndDate).toDate();
      setPriceEvent(generateEventsForRange(today, endOfMonth));

      setEvents([...generateEventsForRange(today, endOfMonth), ...getBookingList()]);
    }
  }, [chosenProperty, getBookingOfProperty.isSuccess]);

  useEffect(() => {
    if (getBookingOfProperty.isSuccess) {
      const today = currentStartDate;
      const endOfMonth = currentEndDate;

      setEvents([...getBookingList(), ...generateEventsForRange(today, endOfMonth)]);
    }
  }, [getBookingOfProperty.isSuccess]);

  function getBookingList() {
    const eventsClone = [];
    if (getBookingOfProperty?.data?.data) {
      for (let booking of getBookingOfProperty.data.data) {
        eventsClone.push({
          title: `${booking.customer.firstName} ${booking.customer.lastName}`,
          start: moment(booking.checkInDay).toDate(),
          end: moment(booking.checkOutDay).subtract(1, "days").toDate(),
          allDay: true,
          avatar: `${booking.customer.avatar}`,
        });
      }
      return eventsClone;
    }
  }

  const generateEventsForRange = (startDate, endDate) => {
    const generatedEvents = [];
    const bookingList = getBookingList() || [];

    let currentDate = moment(startDate);

    if (currentDate.isBefore(moment(), "day")) {
      currentDate = moment();
    }

    let isOK = true;

    while (currentDate.isBefore(endDate, "day") || currentDate.isSame(endDate, "day")) {
      isOK = true;
      for (let event of bookingList) {
        if (
          currentDate.isAfter(moment(event.start).subtract(1, "days")) &&
          currentDate.isBefore(moment(event.end))
        ) {
          isOK = false;
        }
      }
      if (isOK) {
        generatedEvents.push({
          title: `$ ${chosenProperty.basePrice}`,
          start: currentDate.toDate(),
          end: currentDate.clone().add(1, "hour").toDate(),
          type: "price",
        });
      }

      currentDate.add(1, "day");
    }

    return generatedEvents;
  };

  if (getHostCalendar.isLoading) {
    return <WaitingPopUp />;
  }

  const handleViewChange = (range) => {
    const { start, end } = range;
    setCurrentStartDate(start);
    setCurrentEndDate(end);

    const generatedEvents = generateEventsForRange(start, end);

    setEvents([...generatedEvents, ...getBookingList()]);
  };

  const eventStyle = (event) => {
    if (event.type == "price") {
      return {
        backgroundColor: "rgba(0,0,0,0)",
        color: "black",
        fontWeight: "900",
        display: "flex",
        justifyContent: "flex-end",
      };
    }
    return { backgroundColor: "#32999E", borderRadius: "50px" };
  };

  const dayStyle = (date) => {
    const dateString = moment(date).format("YYYY-MM-DD");

    if (selectedDates.includes(dateString)) {
      return {
        backgroundColor: "red",
        borderRadius: "10px",
      };
    }

    if (disabledDate.includes(dateString) || moment(date).isBefore(moment(), "day")) {
      return {
        backgroundColor: "#f0f0f0",
      };
    }

    return {};
  };

  const handleSelectSlot = (props) => {
    setIsChangePrice(false);
    setIsChangeMonthlyDiscount(false);
    setIsChangeMonthlyDiscount(false);
    const { start, end } = props;
    const startDate = moment(start);
    const endDate = moment(end);
    const newSelectedDates = [];

    const bookingList = getBookingList();

    if (startDate.isBefore(moment().subtract(1, "days"))) {
      return;
    }

    while (startDate.isBefore(endDate)) {
      for (let event of bookingList) {
        if (
          startDate.isAfter(moment(event.start).subtract(1, "days")) &&
          startDate.isBefore(moment(event.end))
        ) {
          return;
        }
      }

      newSelectedDates.push(startDate.format("YYYY-MM-DD"));
      startDate.add(1, "day");
    }

    setSelectedDates(newSelectedDates);
  };

  const handleEventClick = (event) => {
    alert(`Event clicked: ${event.title}`);
    // You can show a modal or perform any other actions with the event data
    console.log(event);
  };

  return (
    <>
      <ContainerStyled>
        <CalendarStyled>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            selectable
            views={["month"]}
            className="calendar"
            onSelectEvent={handleEventClick}
            components={{
              event: CustomEvent, // Use CustomEvent to customize how each event is rendered
            }}
            onDrillDown={(date, view) => {
              if (view === "day") {
                return; // Ngăn chuyển sang view ngày
              }
            }}
            min={moment().startOf("day").toDate()}
            onRangeChange={handleViewChange}
            onSelectSlot={handleSelectSlot}
            eventPropGetter={(event) => ({
              style: eventStyle(event),
            })}
            dayPropGetter={(date) => ({
              style: dayStyle(date),
            })}
          />
        </CalendarStyled>
        <RightStyled>
          {isChangePrice && (
            <ChangeBasePriceStyled>
              <div>
                <span>Per night</span>
                <div>
                  <span>$</span>{" "}
                  <TextInput state={basePrice} setState={(value) => setBasePrice(value)} />
                </div>
              </div>
              <div>
                <RedButton>Save</RedButton>
                <WhiteButton
                  onClick={() => {
                    setIsChangePrice(false);
                    setBasePrice(chosenProperty.basePrice);
                  }}
                >
                  Cancel
                </WhiteButton>
              </div>
            </ChangeBasePriceStyled>
          )}

          {isChangeWeeklyDiscount && (
            <ChangeWeeklyDiscountStyled>
              <div>
                <span>Weekly</span>
                <span>For 7 nights or more</span>
                <div>
                  <span>%</span>{" "}
                  <TextInput
                    state={weeklyDiscount}
                    setState={(value) => setWeeklyDiscount(value)}
                  />
                </div>
              </div>
              <div>
                <RedButton>Save</RedButton>
                <WhiteButton
                  onClick={() => {
                    setIsChangeWeeklyDiscount(false);
                    setWeeklyDiscount(chosenProperty.weeklyDiscount);
                  }}
                >
                  Cancel
                </WhiteButton>
              </div>
            </ChangeWeeklyDiscountStyled>
          )}

          {isChangeMonthlyDiscount && (
            <ChangeWeeklyDiscountStyled>
              <div>
                <span>Monthly</span>
                <span>For 28 nights or more</span>
                <div>
                  <span>%</span>{" "}
                  <TextInput
                    state={monthlyDiscount}
                    setState={(value) => setMonthlyDiscount(value)}
                  />
                </div>
              </div>
              <div>
                <RedButton>Save</RedButton>
                <WhiteButton
                  onClick={() => {
                    setIsChangeMonthlyDiscount(false);
                    setMonthlyDiscount(chosenProperty.monthlyDiscount);
                  }}
                >
                  Cancel
                </WhiteButton>
              </div>
            </ChangeWeeklyDiscountStyled>
          )}

          {!isChangePrice &&
            !isChangeMonthlyDiscount &&
            !isChangeWeeklyDiscount &&
            selectedDates.length == 0 && (
              <>
                <ButtonContainerStyled>
                  <button onClick={() => setIsSelectedPopUp(true)}>
                    <span>{chosenProperty.propertyTitle}</span> <span>|</span>{" "}
                    <MdOutlineKeyboardArrowDown />
                  </button>
                </ButtonContainerStyled>
                <RightHeaderStyled>
                  <h4>Settings</h4>
                  <p>These apply to all nights, unless you customize them by date.</p>
                </RightHeaderStyled>
                <BasePriceStyled>
                  <div>
                    <h4>Base price</h4>
                    <span>USD</span>
                  </div>
                  <div onClick={() => setIsChangePrice(true)}>
                    <span>Per night</span>
                    <span>$ {chosenProperty.basePrice}</span>
                  </div>
                </BasePriceStyled>
                <DiscountStyled>
                  <div>
                    <h4>Discounts</h4>
                    <p>Adjust your pricing to attract more guests.</p>
                  </div>
                  <div onClick={() => setIsChangeWeeklyDiscount(true)}>
                    <div>
                      <span>Weekly</span>
                      <span>For 7 nights or more</span>
                    </div>
                    <span>{chosenProperty.weeklyDiscount} %</span>
                  </div>
                  <div onClick={() => setIsChangeMonthlyDiscount(true)}>
                    <div>
                      <span>Monthly</span>
                      <span>For 28 nights or more</span>
                    </div>
                    <span>{chosenProperty.monthlyDiscount} %</span>
                  </div>
                </DiscountStyled>{" "}
              </>
            )}
        </RightStyled>
      </ContainerStyled>

      {isSelectedPopUp && (
        <ListingSelectionPopUp
          chosenProperty={chosenProperty}
          setChosenProperty={setChosenProperty}
          listings={getHostCalendar.data.data}
          action={() => setIsSelectedPopUp(false)}
        />
      )}
    </>
  );
}
