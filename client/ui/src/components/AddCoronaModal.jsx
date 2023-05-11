import * as React from "react";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { TextField } from "@mui/material";
import { useState } from "react";
import { addCorona } from "../services/coronaService";

export default function EditCoronaModal(props) {
  const { onClose, selectedValue, open } = props;

  const [TZ, setTZ] = useState("");
  const [vaccinationDate, setVaccinationDate] = useState("");
  const [vaccinationManufacturer, setVaccinationManufacturer] = useState("");
  const [exposureDate, setExposureDate] = useState("");
  const [recoveryDate, setRecoveryDate] = useState("");


  const handleClose = () => {
    onClose(selectedValue);
  };

  const onTZChange = (e) => {
    console.log(e);
    setTZ(e.target.value);
  };
  const onVaccinationDateChange = (e) => {
    console.log(e);
    setVaccinationDate(e.target.value);
  };
  const onVaccinationManufacturerChange = (e) => {
    console.log(e);
    setVaccinationManufacturer(e.target.value);
  };

  const onExposureDateChange = (e) => {
    setExposureDate( e.target.value );
  };
  

  const onRecoveryDateChange = (e) => {
    setRecoveryDate(e.target.value);
  };

 

  const onSubmit = async () => {
    try {
      const postBody = {
        TZ: TZ,
        vaccinationDate: vaccinationDate,
        vaccinationManufacturer: vaccinationManufacturer,
        exposureDate: exposureDate,
        recoveryDate: recoveryDate,
      };

      await addCorona(postBody);
      alert(`added ${TZ} successfuly`);
      onClose();
    } catch (e) {
      alert(e?.response?.data?.info);
    }
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Corona Details</DialogTitle>
      <TextField
        style={{ width: "200px", margin: "5px" }}
        type="number"
        label="TZ"
        variant="outlined"
        onChange={onTZChange}
      /> 
      <TextField
        style={{ width: "200px", margin: "5px" }}
        type="date"
        label="Vaccination Date"
        variant="outlined"
        InputLabelProps={{
            shrink: true,
            }}
        onChange={onVaccinationDateChange}
      />
      <TextField
        style={{ width: "200px", margin: "5px" }}
        type="text"
        label="vaccination Manufacturer"
        variant="outlined"
        onChange={onVaccinationManufacturerChange}
      />
        <TextField
        style={{ width: "200px", margin: "5px" }}
        type="date"
        label="Exposure Date"
        variant="outlined"
        InputLabelProps={{
            shrink: true,
            }}
        onChange={onExposureDateChange}
      />
      <TextField
        style={{ width: "200px", margin: "5px" }}
        type="date"
        label="Recovery Date"
        variant="outlined"
        InputLabelProps={{
            shrink: true,
            }}
        onChange={onRecoveryDateChange}
      />

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button onClick={onClose}>Close</Button>{" "}
        <Button onClick={onSubmit}>Add</Button>
      </div>
    </Dialog>
  );
}
