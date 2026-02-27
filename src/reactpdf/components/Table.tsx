import { View, Text } from '@react-pdf/renderer';
import { Styles } from '../styles';
import type { ColDef } from '../types';

interface TableProps {
  cols: ColDef[];
  rows: string[][];
}

function colSize(col: ColDef) {
  return col.width != null ? { width: col.width } : { flex: col.flex ?? 1 };
}

export function Table({ cols, rows }: TableProps) {
  return (
    <View style={Styles.table} wrap={false}>
      <View style={Styles.tableHeaderRow} wrap={false}>
        {cols.map((col, i) => (
          <Text
            key={i}
            style={[Styles.tableHeaderCell, colSize(col), { textAlign: col.align ?? 'left' }]}
          >
            {col.label}
          </Text>
        ))}
      </View>
      {rows.map((row, ri) => (
        <View key={ri} wrap={false} style={Styles.tableRow}>
          {cols.map((col, ci) => (
            <Text
              key={ci}
              style={[
                Styles.tableCell,
                colSize(col),
                { textAlign: col.align ?? 'left' },
              ]}
            >
              {row[ci] ?? ''}
            </Text>
          ))}
        </View>
      ))}
    </View>
  );
}
