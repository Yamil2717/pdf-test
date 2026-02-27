import { View, Text, Image } from '@react-pdf/renderer';
import { Styles } from '../styles';
import { LOGO_URL } from '../../pdf/config';
import type { EstadoCuentaData } from '../../pdf/types';

interface Props {
  cliente: EstadoCuentaData['cliente'];
}

export function DocHeader({ cliente }: Props) {
  return (
    <View style={Styles.header}>
      <View style={Styles.subHeader}>
        <Text style={Styles.mainTitle}>Estado de cuenta</Text>
        <View style={Styles.infoRow}>
          <Text style={Styles.infoLabel}>Cliente:</Text>
          <Text style={Styles.infoValue}>{cliente.documento} - {cliente.nombre}</Text>
        </View>
        <View style={Styles.infoRow}>
          <Text style={Styles.infoLabel}>Fecha de impresión:</Text>
          <Text style={Styles.infoValue}>{cliente.fechaImpresion}</Text>
        </View>
      </View>
      <Image src={LOGO_URL} style={Styles.logo} />
    </View>
  );
}
