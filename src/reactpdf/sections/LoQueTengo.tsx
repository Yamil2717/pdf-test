import { Text } from '@react-pdf/renderer';
import { Styles } from '../styles';
import { fmt } from '../helpers';
import { Table } from '../components/Table';
import { SubSection } from '../components/SubSection';
import type { EstadoCuentaData } from '../../pdf/types';
import type { ColDef } from '../types';

const AHORRO_COLS: ColDef[] = [
  { label: 'Referencia', width: 90 },
  { label: 'Concepto', flex: 1 },
  { label: 'Saldo total', width: 80, align: 'right' },
];

const COMPROMISOS_COLS: ColDef[] = [
  { label: 'Concepto', flex: 1 },
  { label: 'Compromiso', width: 90 },
  { label: 'Fecha de pago', width: 70, align: 'right' },
  { label: 'Próximo pago', width: 70, align: 'right' },
];

interface Props {
  data: Pick<EstadoCuentaData, 'cuentasAhorro' | 'aportes' | 'ahorrosProgramados' | 'cdats' | 'compromisosAhorro'>;
}

export function LoQueTengo({ data }: Props) {
  return (
    <>
      <Text style={Styles.sectionTitle}>LO QUE TENGO</Text>

      <SubSection title="Cuentas de ahorros">
        <Table
          cols={AHORRO_COLS}
          rows={data.cuentasAhorro.map(r => [r.referencia, r.concepto, fmt(r.saldo)])}
        />
      </SubSection>

      <SubSection title="Aportes">
        <Table
          cols={AHORRO_COLS}
          rows={data.aportes.map(r => [r.referencia, r.concepto, fmt(r.saldo)])}
        />
      </SubSection>

      <SubSection title="Ahorros programados">
        <Table
          cols={AHORRO_COLS}
          rows={data.ahorrosProgramados.map(r => [r.referencia, r.concepto, fmt(r.saldo)])}
        />
      </SubSection>

      <SubSection title="CDATs">
        <Table
          cols={AHORRO_COLS}
          rows={data.cdats.map(r => [r.referencia, r.concepto, fmt(r.saldo)])}
        />
      </SubSection>

      <SubSection title="Compromisos de ahorro">
        <Table
          cols={COMPROMISOS_COLS}
          rows={data.compromisosAhorro.map(r => [
            r.concepto, r.compromiso, r.fechaPago, r.proximoPago,
          ])}
        />
      </SubSection>
    </>
  );
}
