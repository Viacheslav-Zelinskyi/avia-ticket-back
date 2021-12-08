import request, { Response } from "supertest";
import app from "../app";

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
      .get("/api/tickets")
      .then((res: Response) => {
        expect(res.statusCode).toBe(200);
        done();
      });
  });

  it("Add ticket", (done) => {
    request(app)
      .post("/api/tickets")
      .send({ ticket: ticket })
      .then((res: Response) => {
        expect(res.statusCode).toBe(200);
        done();
      });
  });

  it("Edit ticket", (done) => {
    request(app)
      .patch("/api/tickets")
      .send({ id: ticket.id, ticket: ticket })
      .then((res: Response) => {
        expect(res.statusCode).toBe(200);
        done();
      });
  });

  it("Delete ticket", (done) => {
    request(app)
      .delete("/api/tickets")
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
      .post("/api/users/signup")
      .send(user)
      .then((res: Response) => {
        expect(res.statusCode).toBe(200);
        done();
      });
  });

  it("Log in", (done) => {
    request(app)
      .post("/api/users/login")
      .send(user)
      .then((res: Response) => {
        expect(res.statusCode).toBe(200);
        done();
      });
  });
});
