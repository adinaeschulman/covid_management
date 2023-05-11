import * as React from "react";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { TextField } from "@mui/material";
import { useState,useEffect } from "react";
import { getCoronaByTz } from "../services/coronaService";


export default function ViewCoronaModal(props) {
  const { onClose, selectedValue, open } = props;

  const [coronaData, setCoronaData] = useState([]);

  const handleClose = () => {
    onClose(selectedValue);
  };

  useEffect(() => {
  const getCoronaData = async () => {
    try {
      const res = await getCoronaByTz(115729562);
      setCoronaData(res.data.info);
      getCoronaData(); }
      catch (e) {
        alert(e?.res?.data?.info); 
      } 
    }}, []);
    
  

 

  // Add dummy data if any part of coronaData is null
  const coronaDataWithDummy = {
    vaccinationDate: coronaData?.vaccination_date || "2022-01-01",
    vaccinationManufacturer: coronaData?.vaccination_manufacturer || "pfizer",
    exposureDate: coronaData?.exposure_date || "2021-01-01",
    recoveryDate: coronaData?.recovery_date || "2021-02-01",
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Corona Details</DialogTitle>
      {coronaDataWithDummy && (
        <>
          <TextField
            style={{ width: "200px", margin: "5px" }}
            type="date"
            label="Vaccination Date"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            value={coronaDataWithDummy.vaccinationDate}
             disabled
          />
          <TextField
            style={{ width: "200px", margin: "5px" }}
            type="text"
            label="Vaccination Manufacturer"
            variant="outlined"
            value={coronaDataWithDummy.vaccinationManufacturer}
            disabled
          /> 
          <TextField 
            style={{ width: "200px", margin: "5px" }}
            type="date"
            label="Exposure Date"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            value={coronaDataWithDummy.exposureDate}
            disabled
          />
          <TextField
            style={{ width: "200px", margin: "5px" }}
            type="date"
            label="Recovery Date"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            value={coronaDataWithDummy.recoveryDate}
            disabled
          />
        </>
      )}

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button onClick={onClose}>Close</Button>{" "}
      </div>
    </Dialog>
  );
}
