import { View, Text } from '@react-pdf/renderer';
import { Styles } from '../styles';
import { fmt } from '../helpers';
import type { CreditoData } from '../../pdf/types';

type Field = [label: string, value: string];

function buildFields(cr: CreditoData): Field[] {
  return [
    ['Fecha préstamo', cr.fechaPrestamo],
    ['Monto solicitado', fmt(cr.montoSolicitado)],
    ['Saldo cancelación', fmt(cr.saldoCancelacion)],
    ['Valor colocarse al día', fmt(cr.valorColocarseAlDia)],
    ['Fecha próx. vencimiento', cr.fechaProximoVencimiento],
    ['Valor próx. vencimiento', fmt(cr.valorProximoVencimiento)],
    ['Cuotas pendientes', cr.cuotasPendientes],
    ['Periodicidad', cr.periodicidad],
    ['Tasa', cr.tasa],
  ];
}

interface Props {
  credit: CreditoData;
}

export function CreditCard({ credit }: Props) {
  return (
    <View style={Styles.creditCard} wrap={false}>
      <Text style={Styles.creditCardTitle}>
        {credit.referencia} - {credit.concepto}
      </Text>
      <View style={Styles.creditGrid}>
        {buildFields(credit).map(([label, value]) => (
          <View key={label} style={Styles.creditField}>
            <Text style={Styles.creditLabel}>{label}</Text>
            <Text style={Styles.creditValue}>{value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
