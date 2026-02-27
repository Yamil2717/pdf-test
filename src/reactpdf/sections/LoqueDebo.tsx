import { Text } from '@react-pdf/renderer';
import { Styles } from '../styles';
import { fmt } from '../helpers';
import { Table } from '../components/Table';
import { SubSection } from '../components/SubSection';
import { CreditCard } from '../components/CreditCard';
import type { EstadoCuentaData } from '../../pdf/types';
import type { ColDef } from '../types';

const RESUMEN_COLS: ColDef[] = [
  { label: 'Concepto', flex: 1 },
  { label: 'Fecha próximo\nvencimiento', width: 80, align: 'right' },
  { label: 'Valor próximo\nvencimiento', width: 80, align: 'right' },
];

const TARJETAS_COLS: ColDef[] = [
  { label: 'Número de tarjeta', width: 100 },
  { label: 'Producto', flex: 1 },
  { label: 'Cupo asignado', width: 80, align: 'right' },
  { label: 'Cupo disponible', width: 80, align: 'right' },
];

interface Props {
  data: Pick<EstadoCuentaData, 'creditos' | 'tarjetas'>;
}

export function LoqueDebo({ data }: Props) {
  return (
    <>
      <Text style={Styles.sectionTitle}>LO QUE DEBO</Text>

      <SubSection title="Resumen">
        <Table
          cols={RESUMEN_COLS}
          rows={data.creditos.map(r => [
            `${r.referencia} — ${r.concepto}`.substring(0, 55),
            r.fechaProximoVencimiento,
            fmt(r.valorProximoVencimiento),
          ])}
        />
      </SubSection>

      <Text style={Styles.subTitle}>Detalles</Text>
      {data.creditos.map(cr => (
        <CreditCard key={cr.referencia} credit={cr} />
      ))}

      <SubSection title="Tarjetas">
        <Table
          cols={TARJETAS_COLS}
          rows={data.tarjetas.map(r => [
            r.numero, r.producto, fmt(r.cupoAsignado), fmt(r.cupoDisponible),
          ])}
        />
      </SubSection>
    </>
  );
}
