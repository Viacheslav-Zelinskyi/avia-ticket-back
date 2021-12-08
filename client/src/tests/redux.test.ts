import store from "../redux";
import { addTicket } from "../redux/reducers/allTickets";
import {
  setFrom,
  setDestination,
  setDepartureDate,
  setReturnDate,
  setPassengers,
  clearTicket,
} from "../redux/reducers/ticket";

const tikcetMock = {
  to: "USA",
  from: "Poland",
  departureDate: 1637660504,
  returnDate: 1631660204,
  passengers: {
    adult: 5,
    childrens: 2,
    infants: 1,
  },
};

describe("Redux store tests", () => {
  it("Store initialization", () => {
    const state = store.getState();

    expect(state).toEqual({ allTickets: [], ticket: {} });
  });

  it("Add ticket to array", () => {
    store.dispatch(addTicket(tikcetMock));

    const allTicketsState = store.getState().allTickets;

    expect(allTicketsState[0]).toEqual({ id: 0, ...tikcetMock });
  });

  it("Test ticket setFrom action", () => {
    store.dispatch(setFrom(tikcetMock.from));

    const ticket = store.getState().ticket;

    expect(ticket).toEqual({ from: tikcetMock.from });
  });

  it("Test ticket setDestination action", () => {
    store.dispatch(setDestination(tikcetMock.to));

    const ticket = store.getState().ticket;

    expect(ticket).toEqual({ to: tikcetMock.to, from: tikcetMock.from });
  });

  it("Test ticket setDepartureDate action", () => {
    store.dispatch(setDepartureDate(tikcetMock.departureDate));

    const ticket = store.getState().ticket;

    expect(ticket).toEqual({
      to: tikcetMock.to,
      from: tikcetMock.from,
      departureDate: tikcetMock.departureDate,
    });
  });

  it("Test ticket setReturnDate action", () => {
    store.dispatch(setReturnDate(tikcetMock.returnDate));

    const ticket = store.getState().ticket;

    expect(ticket).toEqual({
      to: tikcetMock.to,
      from: tikcetMock.from,
      departureDate: tikcetMock.departureDate,
      returnDate: tikcetMock.returnDate,
    });
  });

  it("Test ticket setPassengers action", () => {
    store.dispatch(setPassengers(tikcetMock.passengers));

    const ticket = store.getState().ticket;

    expect(ticket).toEqual(tikcetMock);
  });

  it("Tesy ticket clear action", () => {
    store.dispatch(clearTicket());

    const ticket = store.getState().ticket;

    expect(ticket).toEqual({});
  });
});
