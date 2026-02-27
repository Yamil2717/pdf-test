import { DownloadButton } from './components/DownloadButton';
import { generateEstadoCuenta } from './pdf/generate';
import { createStyledRenderer } from './pdf/renderers/styled';
import { createStructureRenderer } from './pdf/renderers/structure';
import { generateEstadoCuentaReact } from './reactpdf/generate';

function App() {
  return (
    <div style={{ maxWidth: '500px', margin: '60px auto', padding: '0 20px' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '8px' }}>Estado de Cuenta</h1>
      <p style={{ color: '#666', marginBottom: '12px', fontSize: '13px', fontWeight: 600 }}>
        @libpdf/core
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <DownloadButton
          label="Descargar PDF - Estilizado"
          filename="estado-cuenta-estilizado.pdf"
          generate={() => generateEstadoCuenta(createStyledRenderer())}
        />
        <DownloadButton
          label="Descargar PDF - Solo Estructura"
          filename="estado-cuenta-estructura.pdf"
          generate={() => generateEstadoCuenta(createStructureRenderer())}
          color="#6c757d"
        />
      </div>
      <div style={{ borderTop: '1px solid #e0e0e0', marginTop: '8px', paddingTop: '16px' }}>
        <p style={{ color: '#666', marginBottom: '12px', fontSize: '13px', fontWeight: 600 }}>
          @react-pdf/renderer
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <DownloadButton
            label="Descargar PDF - ReactPDF"
            filename="estado-cuenta-reactpdf.pdf"
            generate={generateEstadoCuentaReact}
            color="#28a745"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
