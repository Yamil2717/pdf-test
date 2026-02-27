import { Font } from '@react-pdf/renderer';
import regularUrl from './fonts/open-sans.regular.ttf?url';
import boldUrl from './fonts/open-sans.bold.ttf?url';
import lightUrl from './fonts/open-sans.light.ttf?url';

Font.register({
  family: 'Open Sans',
  fonts: [
    { src: regularUrl, fontWeight: 400 },
    { src: boldUrl, fontWeight: 700 },
    { src: lightUrl, fontWeight: 300 },
  ],
});
