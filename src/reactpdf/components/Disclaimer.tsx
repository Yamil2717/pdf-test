import { Text } from '@react-pdf/renderer';
import { Styles } from '../styles';

const TEXT =
  'Si presenta inquietudes, quejas o reclamos con el presente estado de cuenta, ' +
  'por favor realizar la radicación de sus solicitudes en la Oficina Virtual mediante ' +
  'la opción "Mis PQRS" que se encuentra en el menú. Estas solicitudes recibirán ' +
  'respuesta en un plazo máximo de 15 días hábiles, posterior a su radicación.';

export function Disclaimer() {
  return <Text style={Styles.disclaimer}>{TEXT}</Text>;
}
