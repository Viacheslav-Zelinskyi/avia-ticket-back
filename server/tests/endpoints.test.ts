import request, { Response } from "supertest";
import app from "../app";
import {
  LOGIN_FULL_ROUTE,
  SIGNUP_FULL_ROUTE,
  TICKETS_FULL_ROUTE,
} from "../routes.constants";

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
      .get(TICKETS_FULL_ROUTE)
      .then((res: Response) => {
        expect(res.statusCode).toBe(200);
        done();
      });
  });

  it("Add ticket", (done) => {
    request(app)
      .post(TICKETS_FULL_ROUTE)
      .send({ ticket: ticket })
      .then((res: Response) => {
        expect(res.statusCode).toBe(200);
        done();
      });
  });

  it("Edit ticket", (done) => {
    request(app)
      .patch(TICKETS_FULL_ROUTE)
      .send({ id: ticket.id, ticket: ticket })
      .then((res: Response) => {
        expect(res.statusCode).toBe(200);
        done();
      });
  });

  it("Delete ticket", (done) => {
    request(app)
      .delete(TICKETS_FULL_ROUTE)
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
      .post(SIGNUP_FULL_ROUTE)
      .send(user)
      .then((res: Response) => {
        expect(res.statusCode).toBe(200);
        done();
      });
  });

  it("Log in", (done) => {
    request(app)
      .post(LOGIN_FULL_ROUTE)
      .send(user)
      .then((res: Response) => {
        expect(res.statusCode).toBe(200);
        done();
      });
  });
});
