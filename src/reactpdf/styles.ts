import { StyleSheet } from '@react-pdf/renderer';

const COLOR = {
  primary: '#0059A7',
  dark: '#091E42',
  gray: '#505F79',
  grayLight: '#97A0AF',
  divider: '#DFE1E6',
  tableHead: '#F4F5F7',
  white: '#FFFFFF',
};

export const Styles = StyleSheet.create({
  page: {
    fontFamily: 'Open Sans',
    fontSize: 8,
    paddingTop: 30,
    paddingBottom: 42,
    paddingHorizontal: 30,
    color: COLOR.gray,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    marginBottom: 8,
  },
  subHeader: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 8
  },

  logo: {
    width: "auto",
    height: 50,
  },

  mainTitle: {
    fontSize: 13,
    fontWeight: 700,
    color: COLOR.dark,
    marginBottom: 4,
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },

  infoLabel: {
    fontSize: 8,
    fontWeight: 700,
    color: COLOR.gray,
    marginRight: 3,
  },

  infoValue: {
    fontSize: 8,
    color: COLOR.gray,
  },

  sectionTitle: {
    fontSize: 9,
    fontWeight: 700,
    color: COLOR.primary,
    marginTop: 14,
    marginBottom: 6,
  },

  subTitle: {
    fontSize: 8,
    fontWeight: 700,
    color: COLOR.dark,
    marginVertical: 10,
  },

  subTitleGray: {
    fontSize: 9,
    fontWeight: 700,
    color: COLOR.gray,
    marginTop: 10,
    marginBottom: 4,
  },

  table: {
    borderWidth: 1,
    borderColor: COLOR.divider,
    borderStyle: 'solid',
    borderRadius: 4,
    overflow: 'hidden',
  },

  tableHeaderRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLOR.divider,
    borderBottomStyle: 'solid',
    paddingTop: 15,
    paddingBottom: 10,
    paddingHorizontal: 10,
  },

  tableHeaderCell: {
    fontWeight: 700,
    fontSize: 7.5,
    color: COLOR.gray,
    textAlign: 'center',
  },

  tableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },

  tableCell: {
    fontSize: 7.5,
    color: COLOR.gray,
  },

  creditCard: {
    borderWidth: 1,
    borderColor: COLOR.divider,
    borderStyle: 'solid',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 6,
  },

  creditCardTitle: {
    fontSize: 8,
    fontWeight: 700,
    color: COLOR.gray,
    paddingTop: 10,
    paddingHorizontal: 10,
  },

  creditGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 5,
    paddingBottom: 10,
    paddingHorizontal: 10,
  },

  creditField: {
    width: '49%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    borderRadius: 4,
    paddingVertical: 5,
    paddingHorizontal: 8,
    margin: '0.5%',
  },

  creditLabel: {
    fontSize: 7.5,
    fontWeight: 700,
    color: COLOR.dark,
  },

  creditValue: {
    fontSize: 7.5,
    color: COLOR.gray,
    textAlign: 'right',
  },

  disclaimer: {
    marginTop: 14,
    fontSize: 7,
    color: COLOR.gray,
    lineHeight: 1.5,
  },

  footer: {
    position: 'absolute',
    bottom: 14,
    left: 30,
    right: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  footerText: {
    fontSize: 7,
    color: COLOR.grayLight,
  },
});
