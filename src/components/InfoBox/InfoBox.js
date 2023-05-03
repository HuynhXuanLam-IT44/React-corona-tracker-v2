import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import CountUp from "react-countup";
import Spinner from "../UI/Spinner/Spinner";
import "./InfoBox.css";

const InfoBox = ({
  title,
  cases,
  active,
  isCases,
  isRecovered,
  isDeaths,
  updated,
  total,
  ...props
}) => {
  let infoBoxContent;
  if (title === undefined || cases === undefined || total === undefined) {
    infoBoxContent = <Spinner />;
  } else {
    infoBoxContent = (
      <React.Fragment>
        <Typography className="infoBox__title" color="textSecondary">
          {title}
        </Typography>
        <Typography
          className={`infoBox__total ${isCases && "infoBox--cases__total"} ${
            isRecovered && "infoBox--recovered__total"
          } ${isDeaths && "infoBox--deaths__total"}`}
          variant="h5"
          color="textSecondary"
        >
          {/* {total} */}
          <CountUp start={0} end={total} duration={1.5} separator="," />
        </Typography>
        <Typography
          className="infoBox__cases"
          variant="h6"
          color="textSecondary"
        >
          {/* + {cases} */}
          +<CountUp start={0} end={cases} duration={1.5} separator="," />
        </Typography>
        <Typography color="textSecondary" variant="subtitle2">
          {new Date(updated).toUTCString()}
        </Typography>
      </React.Fragment>
    );
  }

  return (
    <Card
      onClick={props.onClick}
      className={`infoBox ${active && "infoBox--selected"} ${
        isCases && "infoBox--cases"
      } ${isRecovered && "infoBox--recovered"} ${
        isDeaths && "infoBox--deaths"
      }`}
    >
      <CardContent>{infoBoxContent}</CardContent>
    </Card>
  );
};

export default InfoBox;
