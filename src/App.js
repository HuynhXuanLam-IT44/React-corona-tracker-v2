import {
  Card,
  CardContent,
  FormControl,
  MenuItem,
  Select,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import {
  getCountriesData,
  getCountryData,
  getTableData,
  getWorldwideData,
} from "./api";

import "./App.css";
import InfoBox from "./components/InfoBox/InfoBox";
import Map from "./components/Map/Map";
import Table from "./components/Table/Table";
import { sortData } from "./shared/util";
import LineGraph from "./components/LineGraph/LineGraph";
import "leaflet/dist/leaflet.css";
import Logo from "./components/assets/image/image.png";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 14.0583, lng: 108.2772 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");

  useEffect(() => {
    const getAllData = async () => {
      setCountryInfo(await getWorldwideData());
    };
    getAllData();
  }, []);

  useEffect(() => {
    const fetchAPI = async () => {
      Promise.all([await getTableData(), await getCountriesData()]).then(
        (values) => {
          setTableData(sortData(values[0]));
          setCountries(values[1]);
          setMapCountries(values[0]);
        }
      );
    };

    fetchAPI();
  }, [setTableData, setCountries]);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    const countryData = await getCountryData(countryCode);
    setCountryInfo(countryData);
    setCountry(countryCode);
    setMapCenter([countryData.countryInfo.lat, countryData.countryInfo.long]);
    setMapZoom(5);
    /*
      Select another country, and switch to worldwide > bug
      This code is done, but setMapCenter is NOT
      countryData is change, but setMapCenter is in worldwide

    if (countryCode === "worldwide") {
      setCountryInfo(await getWorldwideData());
      setMapCenter([14.0583, 108.2772]);
      setCountry(countryCode);
      setMapZoom(3);
    } else {
      const countryData = await getCountryData(countryCode);
      console.log("countryData", countryData);
      setMapCenter([countryData.countryInfo.lat, countryData.countryInfo.long]);
      setMapZoom(5);
      setCountry(countryCode);
      setCountryInfo(countryData);
    }
    */
  };

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <a
            href="https://github.com/tinspham209/react-corona-tracker-v2"
            className="app__header-logo"
          >
            <img src={Logo} alt="Logo" />
          </a>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem key="worldwide" value="worldwide">
                Worldwide
              </MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <InfoBox
            isCases
            active={casesType === "cases"}
            onClick={(e) => setCasesType("cases")}
            title="Infected"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
            updated={countryInfo.updated}
          />

          <InfoBox
            isRecovered
            active={casesType === "recovered"}
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
            updated={countryInfo.updated}
          />

          <InfoBox
            isDeaths
            active={casesType === "deaths"}
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
            updated={countryInfo.updated}
          />
        </div>
        <Map
          casesType={casesType}
          countries={mapCountries}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>
      <Card className="app__right">
        <CardContent>
          <h1>Live Case by Country</h1>
          <Table countries={tableData} />
        </CardContent>
        <CardContent>
          <h1>Worldwide new {casesType}</h1>
          <LineGraph className="app__graph" casesType={casesType} />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
