import request, { Response } from "supertest";
import app from "../app";
import { BASE_URL, SERVER_URL } from "../routes.constants";

const ticket = {
  id: "61a8c1ee227e2fc5407105b0",
  from: "Liberia",
  fromTimezone: "UTC-05:00",
  to: "Serbia",
  destinationTimezone: "UTC+01:00",
  departureDate: 1636466435,
  passengers: { adult: 4, childrens: 3, infants: 1 },
};

const user = { username: "test", password: "test" };

describe("Ticket endpoints", () => {
  it("Get tickets", (done) => {
    request(app)
      .get(`${BASE_URL}${SERVER_URL.tickets}`)
      .then((res: Response) => {
        expect(res.statusCode).toBe(200);
        done();
      });
  });

  it("Add ticket", (done) => {
    request(app)
      .post(`${BASE_URL}${SERVER_URL.tickets}`)
      .send({ ticket: ticket })
      .then((res: Response) => {
        expect(res.statusCode).toBe(200);
        done();
      });
  });

  it("Edit ticket", (done) => {
    request(app)
      .patch(`${BASE_URL}${SERVER_URL.tickets}`)
      .send({ id: ticket.id, ticket: ticket })
      .then((res: Response) => {
        expect(res.statusCode).toBe(200);
        done();
      });
  });

  it("Delete ticket", (done) => {
    request(app)
      .delete(`${BASE_URL}${SERVER_URL.tickets}`)
      .send({ id: ticket.id })
      .then((res: Response) => {
        expect(res.statusCode).toBe(200);
        done();
      });
  });
});

describe("User endpoints", () => {
  it("Create user", (done) => {
    request(app)
      .post(`${BASE_URL}${SERVER_URL.users}${SERVER_URL.signup}`)
      .send(user)
      .then((res: Response) => {
        expect(res.statusCode).toBe(200);
        done();
      });
  });

  it("Log in", (done) => {
    request(app)
      .post(`${BASE_URL}${SERVER_URL.users}${SERVER_URL.login}`)
      .send(user)
      .then((res: Response) => {
        expect(res.statusCode).toBe(200);
        done();
      });
  });
});
