import { Document, Page } from '@react-pdf/renderer';
import { Styles } from './styles';
import { DocHeader } from './components/DocHeader';
import { Disclaimer } from './components/Disclaimer';
import { LoQueTengo } from './sections/LoQueTengo';
import { LoqueDebo } from './sections/LoqueDebo';
import type { EstadoCuentaData } from '../pdf/types';

interface Props {
  data: EstadoCuentaData;
}

export function EstadoCuentaDocument({ data }: Props) {
  return (
    <Document>
      <Page size="A4" style={Styles.page}>
        <DocHeader cliente={data.cliente} />
        <LoQueTengo data={data} />
        <LoqueDebo data={data} />
        <Disclaimer />
      </Page>
    </Document>
  );
}
