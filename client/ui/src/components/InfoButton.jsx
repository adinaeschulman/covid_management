import { Button } from "@mui/material";
import React, { useState } from "react";
import EditCoronaInfoModal from "./AddCoronaInfoModal";





export default function InfoButton(props) {
    const [isAddCoronaInfoModalOpen, setIsCoronaInfoModalOpen] = useState(false);
    
      const openAddModal = () => {

        setIsCoronaInfoModalOpen(true);
      };
    
      const closeAddModal = () => {
        setIsCoronaInfoModalOpen(false);
      };
      return (
        <div style={{ padding: 12 }}>
      <Button onClick={openAddModal} variant="contained"> 
      Corona info
       </Button>
       <EditCoronaInfoModal
      open={isAddCoronaInfoModalOpen}
      onClose={closeAddModal}
      />
      </div>
    );
    }
   