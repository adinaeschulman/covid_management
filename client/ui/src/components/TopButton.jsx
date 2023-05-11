import { Button } from "@mui/material";
import React, { useState } from "react";
import EditCoronaModal from "./AddCoronaModal";

export default function TopBar(props) {
  const [isAddCoronaModalOpen, setIsAddCoronaModalOpen] = useState(false);

  const openAddModal = () => {
    setIsAddCoronaModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddCoronaModalOpen(false);
  };

  return (
    <div style={{ padding: 12, textAlign:'left' }}>
      <Button onClick={openAddModal} variant="contained">
        Add Corona
      </Button>
      <EditCoronaModal
        open={isAddCoronaModalOpen}
        onClose={closeAddModal}
      />
    </div>
  );
}
