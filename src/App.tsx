import { DownloadButton } from './components/DownloadButton';
import { generateEstadoCuenta } from './pdf/generate';
import { createStyledRenderer } from './pdf/renderers/styled';
import { createStructureRenderer } from './pdf/renderers/structure';

function App() {
  return (
    <div style={{ maxWidth: '500px', margin: '60px auto', padding: '0 20px' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '8px' }}>Estado de Cuenta</h1>
      <p style={{ color: '#666', marginBottom: '32px' }}>
        Generación de PDF con @libpdf/core
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
    </div>
  );
}

export default App;
