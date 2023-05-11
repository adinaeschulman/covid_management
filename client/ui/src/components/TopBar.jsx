import { Button } from "@mui/material";
import React, { useState } from "react";
import EditEmployeeModal from "./AddEmployeeModal";

export default function TopBar(props) {
  const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false);

  const openAddModal = () => {
    setIsAddEmployeeModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddEmployeeModalOpen(false);
  };

  return (
    <div style={{ padding: 12, textAlign: 'left' }}>
      <Button style={{textAlign: 'left'}} onClick={openAddModal} variant="contained">
        Add Employee
      </Button>
      <EditEmployeeModal
        open={isAddEmployeeModalOpen}
        onClose={closeAddModal}
      />
    </div>
  );
}
