import { useState } from "react";
import axios from "axios";

export default function UploadCampaign() {
  const [file, setFile] = useState<File | null>(null);
  const [report, setReport] = useState<any>(null);

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:3000/api/upload-campaign", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setReport(response.data);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input type="file" onChange={e => setFile(e.target.files?.[0] || null)} />
      <button onClick={handleUpload}>Enviar Planilha</button>

      {report && (
        <div>
          <h3>Relatório da Campanha</h3>
          <p>Total: {report.totalRows}</p>
          <p>Sucesso: {report.successCount}</p>
          <p>Falhas: {report.failedCount}</p>

          <table>
            <thead>
              <tr>
                <th>Row</th>
                <th>Nome</th>
                <th>Telefone</th>
                <th>Status</th>
                <th>Erro</th>
              </tr>
            </thead>
            <tbody>
              {report.details.map((r: any) => (
                <tr key={r.row} style={{ color: r.status === "failed" ? "red" : "green" }}>
                  <td>{r.row}</td>
                  <td>{r.name}</td>
                  <td>{r.phone}</td>
                  <td>{r.status}</td>
                  <td>{r.error || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
