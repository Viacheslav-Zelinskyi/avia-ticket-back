import { getCountries } from "../api";

it("Test getCountries API", async () => {
  const getCountriesMock = jest.fn() as jest.MockedFunction<typeof getCountries>;

  getCountriesMock.mockImplementation(getCountries)

  await getCountriesMock();

  expect(getCountriesMock).toBeCalledTimes(1);
});