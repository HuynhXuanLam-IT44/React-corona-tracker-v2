import React from "react";
import CountUp from "react-countup";
import Spinner from "../UI/Spinner/Spinner";
import { withStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core/";
import "./Table.css";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const TableLiveCases = (props) => {
  const { countries } = props;

  let tableContent = <Spinner />;
  if (countries) {
    tableContent = (
      <TableContainer className="table" component={Paper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Country</StyledTableCell>
              <StyledTableCell align="right">Cases</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {countries.map(({ country, cases }) => (
              <StyledTableRow key={country}>
                <StyledTableCell component="th" scope="row">
                  {country}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {
                    <CountUp
                      start={0}
                      end={cases}
                      duration={1.5}
                      separator=","
                    />
                  }
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
  return <React.Fragment>{tableContent}</React.Fragment>;
};

export default TableLiveCases;
