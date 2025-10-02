import React from "react";
import { Box } from "@mui/material";
import LeadsTable from "../LeadsTable";
import UploadPlanilha from "../UploadPlanilha";

export default function AdminPanel() {
  return (
    <Box p={2}>
      {/* Seção de upload */}
      <UploadPlanilha />

      {/* Espaço entre upload e tabela */}
      <Box mt={4}>
        <LeadsTable />
      </Box>
    </Box>
  );
}
