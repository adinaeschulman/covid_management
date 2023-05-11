import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import { getCoronas } from "../services/coronaService";

export default function EmployeeTable() {
  const [coronas, setCoronas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getCoronas();
      setCoronas(res.data.info);
    };

    fetchData();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 750 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>TZ</TableCell>
            <TableCell align="right">Vaccination Date</TableCell>
            <TableCell align="right">Vaccination Manufacturer</TableCell>
            <TableCell align="right">Exposure Date</TableCell>
            <TableCell align="right">Recovery Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {coronas.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.tz}
              </TableCell>
              <TableCell align="right">{row.vaccination_date}</TableCell>
              <TableCell align="right">{row.vaccination_manufacturer}</TableCell>
              <TableCell align="right">{row.exposure_date}</TableCell>
              <TableCell align="right">
                {row.recovery_date}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
