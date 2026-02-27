import { pdf } from '@react-pdf/renderer';
import { generateData } from '../pdf/data';
import { EstadoCuentaDocument } from './document';
import './fonts';

export async function generateEstadoCuentaReact(): Promise<Uint8Array> {
  const data = generateData();
  const blob = await pdf(<EstadoCuentaDocument data={data} />).toBlob();
  const arrayBuffer = await blob.arrayBuffer();
  return new Uint8Array(arrayBuffer);
}
