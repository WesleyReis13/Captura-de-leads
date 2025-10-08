import React from "react";
import { Box } from "@mui/material";
import LeadsTable from "../LeadsTable";
import UploadCampaign from "../UploadCampaign";

export default function AdminPanel() {
  return (
    <Box p={2}>
      
      <UploadCampaign />

      
      <Box mt={4}>
        <LeadsTable />
      </Box>
    </Box>
  );
}
