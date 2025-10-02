import React, { useState } from "react";
import { Box, Button, Typography, CircularProgress } from "@mui/material";

export default function UploadPlanilha() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const validExtensions = ["xlsx", "csv"];
    const ext = selectedFile.name.split(".").pop()?.toLowerCase();
    if (!ext || !validExtensions.includes(ext)) {
      setMessage("Arquivo inválido! Apenas .xlsx e .csv são permitidos.");
      setFile(null);
      return;
    }

    setFile(selectedFile);
    setMessage(`Arquivo selecionado: ${selectedFile.name}`);
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:5000/api/upload-planilha", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setMessage("Arquivo enviado com sucesso!");
        setFile(null);
      } else {
        const errData = await res.json();
        setMessage(`Erro ao enviar arquivo: ${errData.error || "desconhecido"}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("Erro ao enviar arquivo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={2} border={1} borderRadius={2} borderColor="grey.300">
      <Typography variant="h6" sx={{ mb: 2 }}>
        Upload de Planilha (.xlsx / .csv)
      </Typography>

      <input
        type="file"
        accept=".xlsx,.csv"
        onChange={handleFileChange}
        style={{ display: "none" }}
        id="upload-file"
      />
      <label htmlFor="upload-file">
        <Button variant="contained" component="span">
          Selecionar Arquivo
        </Button>
      </label>

      {file && (
        <Button
          variant="outlined"
          sx={{ ml: 2 }}
          onClick={handleUpload}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Enviar"}
        </Button>
      )}

      {message && (
        <Typography sx={{ mt: 2 }} color={message.includes("erro") ? "error" : "primary"}>
          {message}
        </Typography>
      )}
    </Box>
  );
}
