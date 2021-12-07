import { ITicket } from "../models/ticket.interfaces";
import { IUser } from "../models/user.interfaces";

export const getCountries = async () => {
  const response = await fetch("https://restcountries.com/v3.1/all");

  return response.json();
};

export const loginFetch = async (user: IUser) => {
  const response = await fetch(
    window.location.protocol + "//" + window.location.host + `/api/users/login`,
    {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.json();
};

export const logoutFetch = async () => {
  const response = await fetch(
    window.location.protocol +
      "//" +
      window.location.host +
      `/api/users/logout`,
    {
      method: "POST",
      credentials: "include",
    }
  );

  return response.json();
};

export const signupFetch = async (user: IUser) => {
  const response = await fetch(
    window.location.protocol +
      "//" +
      window.location.host +
      `/api/users/signup`,
    {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
    }
  );

  return response.json();
};

export const refreshTokenFetch = async () => {
  const response = await fetch(
    window.location.protocol +
      "//" +
      window.location.host +
      `/api/users/refresh-token`,
    {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    }
  );

  return response.json();
};

export const getTicketsFetch = async () => {
  const accessToken = localStorage.getItem("AT") as string;

  const response = await fetch(
    window.location.protocol + "//" + window.location.host + `/api/tickets`,
    {
      headers: { authentication: accessToken },
    }
  );

  return response.json();
};

export const addTicketFetch = async (ticket: ITicket) => {
  const accessToken = localStorage.getItem("AT") as string;

  const response = await fetch(
    window.location.protocol + "//" + window.location.host + `/api/tickets`,
    {
      method: "POST",
      body: JSON.stringify({ ticket: ticket }),
      headers: {
        "Content-Type": "application/json",
        authentication: accessToken,
      },
    }
  );

  return response.json();
};

export const updateTicketFetch = async (id: string | null, ticket: ITicket) => {
  const accessToken = localStorage.getItem("AT") as string;

  const response = await fetch(
    window.location.protocol + "//" + window.location.host + `/api/tickets`,
    {
      method: "PATCH",
      body: JSON.stringify({ id: id, ticket: ticket }),
      headers: {
        "Content-Type": "application/json",
        authentication: accessToken,
      },
    }
  );

  return response.json();
};

export const deleteTicketFetch = async (id: string | null) => {
  const accessToken = localStorage.getItem("AT") as string;

  const response = await fetch(
    window.location.protocol + "//" + window.location.host + `/api/tickets`,
    {
      method: "DELETE",
      body: JSON.stringify({ id: id }),
      headers: {
        "Content-Type": "application/json",
        authentication: accessToken,
      },
    }
  );

  return response.json();
};
