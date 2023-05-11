import * as React from "react";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { TextField } from "@mui/material";
import { useState } from "react";
import { addEmployee } from "../services/employeeService";

export default function EditEmployeeModal(props) {
  const { onClose, selectedValue, open } = props;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [tz, setTZ] = useState("");
  const [address, setAddress] = useState({
    city: "",
    street: "",
    number: "",
  });
  const [dob, setDOB] = useState("");
  const [landline, setLandline] = useState("");
  const [mobilePhone, setMobilePhone] = useState("");

  const handleClose = () => {
    onClose(selectedValue);
  };

  const onFirstNameChange = (e) => {
    console.log(e);
    setFirstName(e.target.value);
  };
  const onLastNameChange = (e) => {
    console.log(e);
    setLastName(e.target.value);
  };
  const onTZChange = (e) => {
    console.log(e);
    setTZ(e.target.value);
  };

  const onCityChange = (e) => {
    setAddress({ ...address, city: e.target.value });
  };
  
  const onStreetChange = (e) => {
    setAddress({ ...address, street: e.target.value });
  };
  
  const onNumberChange = (e) => {
    setAddress({ ...address, number: e.target.value });
  };

  const onDOBChange = (e) => {
    setDOB(e.target.value);
  };

  const onLandlineChange = (e) => {
    console.log(e);
    setLandline(e.target.value);
  };

  const onMobilePhoneChange = (e) => {
    console.log(e);
    setMobilePhone(e.target.value);
  };

  const onSubmit = async () => {
    try {
      const postBody = {
        first_name: firstName,
        last_name: lastName,
        tz: tz,
        address: address,
        dob: dob,
        landline: landline,
        mobile_phone: mobilePhone,
      };

      await addEmployee(postBody);
      alert(`added ${firstName} successfuly`);
      onClose();
    } catch (e) {
      alert(e?.response?.data?.info);
    }
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Employee Details</DialogTitle>
      <TextField
        style={{ width: "200px", margin: "5px" }}
        type="text"
        label="First Name"
        variant="outlined"
        onChange={onFirstNameChange}
      /> 
      <TextField
        style={{ width: "200px", margin: "5px" }}
        type="text"
        label="Last Name"
        variant="outlined"
        onChange={onLastNameChange}
      />
      <TextField
        style={{ width: "200px", margin: "5px" }}
        type="number"
        label="TZ"
        variant="outlined"
        onChange={onTZChange}
      />
        <TextField
        style={{ width: "200px", margin: "5px" }}
        type="text"
        label="City"
        variant="outlined"
        onChange={onCityChange}
      />
      <TextField
        style={{ width: "200px", margin: "5px" }}
        type="text"
        label="Street"
        variant="outlined"
        onChange={onStreetChange}
      />
      <TextField
        style={{ width: "200px", margin: "5px" }}
        type="text"
        label="Number"
        variant="outlined"
        onChange={onNumberChange}
      />
      <TextField
        style={{ width: "200px", margin: "5px" }}
        type="number"
        label="Landline"
        variant="outlined"
        onChange={onLandlineChange}
      />
      <TextField
        style={{ width: "200px", margin: "5px" }}
        type="number"
        label="Mobile Phone"
        variant="outlined"
        onChange={onMobilePhoneChange}
      />
      <TextField
       style={{ width: "200px", margin: "5px" }}
       type="date"
       label="Date of Birth"
      variant="outlined"
      InputLabelProps={{
      shrink: true,
      }}
      onChange={onDOBChange}
      />

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button onClick={onClose}>Close</Button>{" "}
        <Button onClick={onSubmit}>Add</Button>
      </div>
    </Dialog>
  );
}
