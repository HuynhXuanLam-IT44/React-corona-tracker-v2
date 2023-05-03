import axios from "axios";

const url = "https://disease.sh/v3/covid-19";

export const getCountriesData = async () => {
  try {
    const { data } = await axios.get(`${url}/countries`);
    const countries = data.map((country) => ({
      name: country.country, //Vietnam
      value: country.countryInfo.iso2, //VN
    }));
    return countries;
  } catch (error) {
    console.log("error.message getCountries");
  }
};

export const getTableData = async () => {
  try {
    const { data } = await axios.get(`${url}/countries`);
    return data;
  } catch (error) {
    console.log("error.message getCountries");
  }
};

export const getCountryData = async (countryCode) => {
  let urlCountry = "";
  countryCode === "worldwide"
    ? (urlCountry = `${url}/all`)
    : (urlCountry = `${url}/countries/${countryCode}`);

  try {
    const { data } = await axios.get(urlCountry);
    return data;
  } catch (error) {
    console.log("error.message getCountry", error.message);
  }
};

export const getWorldwideData = async () => {
  try {
    const { data } = await axios.get(`${url}/all`);
    return data;
  } catch (error) {
    console.log("error.message getAll", error.message);
  }
};

export const getHistoricalAll = async () => {
  try {
    const { data } = await axios.get(`${url}/historical/all?lastdays=120`);
    return data;
  } catch (error) {
    console.log("error.message getAll", error.message);
  }
};
