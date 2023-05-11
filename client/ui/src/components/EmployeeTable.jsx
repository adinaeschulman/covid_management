import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import { getEmployees } from "../services/employeeService";
import InfoButton from "./InfoButton"; // Import the InfoButton component



export default function EmployeeTable() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getEmployees();
      setEmployees(res.data.info);
    };

    fetchData();
  }, []);


  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 750, maxWidth: 800 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>TZ</TableCell>
            <TableCell align="right">First Name</TableCell>
            <TableCell align="right">Last Name</TableCell>
            <TableCell align="right">Address</TableCell>
            <TableCell align="right">DOB</TableCell>
            <TableCell align="right">Landline</TableCell>
            <TableCell align="right">Mobile Phone</TableCell>
            <TableCell align="right">Corona</TableCell> 
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.tz}
              </TableCell>
              <TableCell align="right">{row.first_name}</TableCell>
              <TableCell align="right">{row.last_name}</TableCell>
              <TableCell align="right">
                {row.address.city}, {row.address.street}, {row.address.number}
              </TableCell>
              <TableCell align="right">{row.dob}</TableCell>
              <TableCell align="right">
                {row.landline.toString().padStart(9, "0")}
              </TableCell>
              <TableCell align="right">
                {row.mobile_phone.toString().padStart(10, "0")}
              </TableCell>
              <TableCell align="right">
                <InfoButton/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

