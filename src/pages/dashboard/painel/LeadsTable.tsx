import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  CircularProgress,
  Toolbar,
  Button,
} from "@mui/material";

type Lead = {
  id: number;
  name: string;
  email: string;
  phone: string;
  objective: string;
  routine: string;
  tags: string[];
  createdAt: string;
  isClient: boolean;
  plan: string | null;
};

export default function LeadsTable() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "leads" | "clients">("all");

  useEffect(() => {
  const fetchLeads = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/leads");
      const data = await res.json();
      console.log("📊 Dados recebidos da API:", data);
      setLeads(data);
    } catch (error) {
      console.error("Erro ao carregar leads:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchLeads();
}, []);

  const filteredLeads = leads.filter(lead => {
    if (filter === "leads") return !lead.isClient;
    if (filter === "clients") return lead.isClient;
    return true;
  });

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="300px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={2}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6">Leads & Clientes</Typography>
        <Box>
          <Button variant={filter === "all" ? "contained" : "outlined"} onClick={() => setFilter("all")} sx={{ mr: 1 }}>Todos</Button>
          <Button variant={filter === "leads" ? "contained" : "outlined"} onClick={() => setFilter("leads")} sx={{ mr: 1 }}>Leads</Button>
          <Button variant={filter === "clients" ? "contained" : "outlined"} onClick={() => setFilter("clients")}>Clientes</Button>
        </Box>
      </Toolbar>

      <Typography variant="body2" sx={{ mb: 2 }}>
        Total: {leads.length} | Clientes: {leads.filter(l => l.isClient).length}
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>WhatsApp</TableCell>
              <TableCell>Objetivo</TableCell>
              <TableCell>Rotina</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Plano</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredLeads.map(lead => (
              <TableRow key={lead.id}>
                <TableCell>{lead.name}</TableCell>
                <TableCell>{lead.email}</TableCell>
                <TableCell>{lead.phone}</TableCell>
                <TableCell>{lead.objective}</TableCell>
                <TableCell>{lead.routine}</TableCell>
                <TableCell>
                  {lead.isClient ? (
                    <Chip label="Cliente" color="success" />
                  ) : (
                    <Chip label="Lead" color="warning" />
                  )}
                </TableCell>
                <TableCell>{lead.plan || "-"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
