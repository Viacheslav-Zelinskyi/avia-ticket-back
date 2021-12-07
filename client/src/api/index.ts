import { ITicket } from "../models/ticket.interfaces";
import { IUser } from "../models/user.interfaces";

export const getCountries = async () => {
  const response = await fetch("https://restcountries.com/v3.1/all");

  return response.json();
};

export const loginFetch = async (user: IUser) => {
  const response = await fetch(
    //window.location.protocol + "//" + window.location.host + `/api/user/login`,
    "http://localhost:5000/api/users/login",
    {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
    }
  );

  return response.json();
}

export const signupFetch = async (user: IUser) => {
  const response = await fetch(
    //window.location.protocol + "//" + window.location.host + `/api/user/signup`,
    "http://localhost:5000/api/users/signup",
    {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
    }
  );

  return response.json();
}

export const getTicketsFetch = async () => {
  const response = await fetch(
    window.location.protocol + "//" + window.location.host + `/api/tickets`
  );

  return response.json();
};

export const addTicketFetch = async (ticket: ITicket) => {
  const response = await fetch(
    window.location.protocol + "//" + window.location.host + `/api/tickets`,
    {
      method: "POST",
      body: JSON.stringify({ ticket: ticket }),
      headers: { "Content-Type": "application/json" },
    }
  );

  return response.json();
};

export const updateTicketFetch = async (id: string | null, ticket: ITicket) => {
  const response = await fetch(
    window.location.protocol + "//" + window.location.host + `/api/tickets`,
    {
      method: "PATCH",
      body: JSON.stringify({ id: id, ticket: ticket }),
      headers: { "Content-Type": "application/json" },
    }
  );

  return response.json();
};

export const deleteTicketFetch = async (id: string | null) => {
  const response = await fetch(
    window.location.protocol + "//" + window.location.host + `/api/tickets`,
    {
      method: "DELETE",
      body: JSON.stringify({ id: id }),
      headers: { "Content-Type": "application/json" },
    }
  );

  return response.json();
};
