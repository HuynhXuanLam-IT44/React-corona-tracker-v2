import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { getHistoricalAll } from "../../api/index";
import numeral from "numeral";

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          parser: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

const LineGraph = ({ casesType = "cases", ...props }) => {
  const [data, setData] = useState({});

  const buildChartData = (data, casesType) => {
    let chartData = [];
    let lastDataPoint;

    for (let date in data.cases) {
      if (lastDataPoint) {
        let newDataPoint = {
          x: date,
          y: data[casesType][date] - lastDataPoint,
        };
        chartData.push(newDataPoint);
      }
      lastDataPoint = data[casesType][date];
    }
    return chartData;
  };

  useEffect(() => {
    const fetchAPI = async () => {
      const historicalData = await getHistoricalAll();
      const chartData = buildChartData(historicalData, casesType);
      setData(chartData);
    };
    fetchAPI();
  }, [casesType]);

  // let backgroundColor = () => {
  //   if (casesType === "cases") {
  //     return "rgba(204, 16, 52, 0.5)";
  //   } else if (casesType === "recovered") {
  //     return "rgba(125, 215, 29, 0.5)";
  //   } else if (casesType === "deaths") {
  //     return "rgba(251, 68, 67, 0.5)";
  //   }
  // };

  return (
    <div className={props.className}>
      {data?.length > 0 && (
        <Line
          options={options}
          data={{
            datasets: [
              {
                backgroundColor: "rgba(204, 16, 52, 0.5)",
                borderColor: "#CC1034",
                data: data,
              },
            ],
          }}
        />
      )}
    </div>
  );
};

export default LineGraph;
