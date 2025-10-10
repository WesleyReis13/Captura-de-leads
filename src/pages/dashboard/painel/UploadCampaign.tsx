import { useState } from "react";
import axios from "axios";
import './UploadCampaign.css';

export default function UploadCampaign() {
  const [file, setFile] = useState<File | null>(null);
  const [report, setReport] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === "text/csv" || droppedFile.name.endsWith('.xlsx')) {
        setFile(droppedFile);
      } else {
        alert("Por favor, selecione um arquivo CSV ou Excel.");
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsLoading(true);
    setReport(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:3000/api/upload-campaign", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setReport(response.data);
    } catch (error) {
      console.error(error);
      alert("Erro ao fazer upload do arquivo. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const getFileIcon = (fileName: string) => {
    if (fileName.endsWith('.csv')) return '📊';
    if (fileName.endsWith('.xlsx')) return '📈';
    return '📄';
  };

  return (
    <div className="upload-container">
      <div className="upload-card">
        <div className="upload-header">
          <div className="upload-icon">🚀</div>
          <h2>Upload de Campanha</h2>
          <p>Faça upload da planilha com os dados da campanha</p>
        </div>

        <div 
          className={`upload-area ${dragActive ? 'drag-active' : ''} ${file ? 'has-file' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            id="file-upload"
            accept=".csv,.xlsx,.xls"
            onChange={handleFileChange}
            className="file-input"
          />
          
          <div className="upload-content">
            {file ? (
              <div className="file-selected">
                <div className="file-icon">{getFileIcon(file.name)}</div>
                <div className="file-info">
                  <div className="file-name">{file.name}</div>
                  <div className="file-size">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
                </div>
                <button 
                  className="change-file-btn"
                  onClick={() => setFile(null)}
                >
                  Alterar
                </button>
              </div>
            ) : (
              <>
                <div className="upload-icon-large">📤</div>
                <div className="upload-text">
                  <p>Arraste e solte sua planilha aqui</p>
                  <span>ou</span>
                </div>
                <label htmlFor="file-upload" className="browse-btn">
                  Procurar arquivo
                </label>
                <div className="file-types">
                  Suporta: CSV, Excel (.xlsx, .xls)
                </div>
              </>
            )}
          </div>
        </div>

        <button 
          onClick={handleUpload}
          disabled={!file || isLoading}
          className={`upload-button ${isLoading ? 'loading' : ''}`}
        >
          {isLoading ? (
            <>
              <div className="spinner"></div>
              Processando...
            </>
          ) : (
            'Iniciar Upload da Campanha'
          )}
        </button>

        {report && (
          <div className="report-card">
            <div className="report-header">
              <h3>📋 Relatório da Campanha</h3>
              <div className="report-summary">
                <div className="summary-item total">
                  <span className="label">Total</span>
                  <span className="value">{report.totalRows}</span>
                </div>
                <div className="summary-item success">
                  <span className="label">Sucesso</span>
                  <span className="value">{report.successCount}</span>
                </div>
                <div className="summary-item failed">
                  <span className="label">Falhas</span>
                  <span className="value">{report.failedCount}</span>
                </div>
              </div>
            </div>

            <div className="table-container">
              <table className="report-table">
                <thead>
                  <tr>
                    <th>Linha</th>
                    <th>Nome</th>
                    <th>Telefone</th>
                    <th>Status</th>
                    <th>Detalhes</th>
                  </tr>
                </thead>
                <tbody>
                  {report.details.map((r: any) => (
                    <tr key={r.row} className={r.status === "failed" ? "failed-row" : "success-row"}>
                      <td className="row-number">{r.row}</td>
                      <td className="name">{r.name}</td>
                      <td className="phone">{r.phone}</td>
                      <td>
                        <span className={`status-badge ${r.status}`}>
                          {r.status === "success" ? "✅ Sucesso" : "❌ Falha"}
                        </span>
                      </td>
                      <td className="error">{r.error || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {report.failedCount > 0 && (
              <div className="warning-message">
                ⚠️ {report.failedCount} registro(s) falharam. Verifique os detalhes acima.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}