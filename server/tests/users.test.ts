import UsersServices from "../services/users.services";

interface decodedToken {
  error?: string;
  username?: string;
}

const user = { username: "test", password: "test" };

describe("Password", () => {
  it("Hash and check password", async () => {
    const hash = (await UsersServices.hashPassword(user.password)) as string;
    const isPasswordCorrect = await UsersServices.checkPassword(
      user.password,
      hash
    );

    expect(isPasswordCorrect).toEqual(true);
  });
});

describe("JWT token", () => {
  process.env.TOKEN_SECRET = "test";
  process.env.TOKEN_LIFE = "900";
  process.env.TOKEN_REFRESH_SECRET = "testRefresh";
  process.env.TOKEN_REFRESH_LIFE = "86400";

  it("Generate and check access token", async () => {
    const token = (await UsersServices.generateAccessToken(
      user.username
    )) as string;
    const decodedToken = (await UsersServices.checkAccessToken(
      token
    )) as decodedToken;

    expect(decodedToken.username).toEqual(user.username);
  });

  it("Generate and check refresh token", async () => {
    const token = (await UsersServices.generateRefreshToken(
      user.username
    )) as string;
    const decodedToken = (await UsersServices.checkRefreshToken(
      token
    )) as decodedToken;

    expect(decodedToken.username).toEqual(user.username);
  });
});
