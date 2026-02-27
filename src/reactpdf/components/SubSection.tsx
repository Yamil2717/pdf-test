import { View, Text } from '@react-pdf/renderer';
import { Styles } from '../styles';
import type { FC, ReactNode } from 'react';

interface Props {
  title: string;
  children: ReactNode;
}

export const SubSection: FC<Props> = ({ title, children }) => (
  <View wrap={false}>
    <Text style={Styles.subTitle}>{title}</Text>
    {children}
  </View>
);
