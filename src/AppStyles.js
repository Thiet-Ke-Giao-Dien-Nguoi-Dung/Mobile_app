import { Platform } from 'react-native';

import { moment } from './utils/Omni';
import Constants from './utils/Constants';

const _headerHeight = Platform.OS === 'ios' ? 40 : 56;

const _colorSet = {
  background: 'white',
  customer: '#6294e3',
  arrivedColor: '#c4e3e6',
  arrivingColor: '#8accff',
  doneColor: '#C2C2C2',
  orlabColor: '#004A39',
  scheduleColor: '#d1f1b8',
  mainThemeForegroundColor: '#FF0025',
  activeColor: '#FF0025', // FF0025  d1f1b8
  tabbarActive: '#a61b1b',
  alternativeColor: '#4CD964',
  textDone: '#828282',
  inActiveColor: '#828282', // 828282  C2C2C2
  mainTextColor: '#333333',
  mainSubtextColor: '#464646',
  customersColor: '#CA7100',
  hairlineColor: '#d6d6d6',
  analyticsColor: '#5f65fc', // 5f65fc  8accff
  analyticsLightColor: '#5f65fc30',
  customersLightColor: '#ff8a0230',
  ordersColor: '#e090d7',
  ordersLightColor: '#e090d730',
  tasksColor: '#6fb168',
  tasksLightColor: '#6fb16830',
  salesColor: '#f8d246',
  salesLightColor: '#f8d24630',
  productsColor: '#bc6e7e',
  productsLightColor: '#bc6e7e30',
  taskNotStartedColor: '#f8d246',
  taskDoneColor: 'green',
  black: '#000000',
  white: '#ffffff',
  red: 'red',
  lightGrey: '#828282',
  darkGrey: '#616161',
  border: '#D1D1D6',
  // common
  Text: '#333',
  Header: '#000',
  productTitle: '#404852',
  sectionBackground: '#fff',
  sectionSeparatorColor: '#D8D8D8',
  lineColor: '#f9f9f9',
  order: {
    pending: '#FFC892',
    received: '',
    processing: '#FFF3C4',
    shipping: '#D1F1B8',
    shipped: '#C4E3E6',
    completed: '#8ACCFF',
    returned: '#D62626',
    cancelled: '#C6C6C6',
    cancelledText: '#828282',
  },
};

const _fontSizeSet = {
  xxlarge: 40,
  xlarge: 30,
  large: 25,
  middle: 20,
  normal: 16,
  small: 13,
  xsmall: 11,
};

const _sizeSet = {
  buttonWidth: '70%',
  inputWidth: '80%',
  radius: 25,
};

const _iconSizeSet = {
  large: 35,
  normal: 24,
  small: 20,
};

const _styleSet = {
  app: {
    flexGrow: 1,
  },

  toolbar: {
    marginTop: Constants.ToolbarHeight + (Constants.isIphoneX ? 0 : 5),
    backgroundColor: _colorSet.background,
    zIndex: 1,
    // paddingLeft: 15,
    // paddingRight: 15,
    paddingTop: 4,
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',

    ...Platform.select({
      ios: {
        height: Constants.isIphoneX ? 5 : 40,
      },
      android: {
        height: 52,
        paddingTop: 6,
        marginTop: 0,
        elevation: 0,
      },
    }),
  },

  headerStyle: {
    color: _colorSet.mainTextColor,
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 25,
    textAlign: 'left',
    alignSelf: 'center',
    flex: 1,
    height: 40,
    backgroundColor: 'transparent',
    marginLeft: 5,

    // fontFamily: Constants.fontFamily,
    ...Platform.select({
      ios: {
        marginTop: Constants.isIphoneX ? -18 : 10,
        marginBottom: 0,
      },
      android: {
        marginTop: 14,
        marginBottom: 0,
      },
    }),
  },
  headerTitleStyle: {
    color: _colorSet.mainTextColor,
    fontSize: 16,
    height: 40,
    textAlign: 'center',
    // fontFamily: Constants.fontFamily,
    alignSelf: 'center',
    ...Platform.select({
      ios: {
        marginBottom: 0,
        marginTop: Constants.isIphoneX ? -10 : 12,
      },
      android: {
        marginTop: 25,
      },
    }),
  },
  menuButton: {
    alignSelf: 'center',
    justifyContent: 'center',
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  columnCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  ColumnCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  ColumnCenterTop: {
    alignItems: 'center',
  },
  ColumnCenterBottom: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  ColumnCenterLeft: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  ColumnCenterRight: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  navRow: {
    flexDirection: 'row',
    top: 0,

    ...Platform.select({
      ios: {
        top: Constants.isIphoneX ? -15 : 0,
      },
      android: {
        top: 0,
      },
    }),
  },
  navIconContainer: {
    ...Platform.select({
      ios: {
        top: Constants.isIphoneX ? -30 : 0,
      },
      android: {
        top: 0,
      },
    }),
  },
  header: {
    marginTop: Constants.ToolbarHeight + (Constants.isIphoneX ? 0 : 5),
    backgroundColor: 'white', // _colorSet.background,
    zIndex: 1,
    // paddingLeft: 15,
    // paddingRight: 15,
    paddingTop: 4,
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',

    ...Platform.select({
      ios: {
        height: Constants.isIphoneX ? 5 : 40,
      },
      android: {
        height: 52,
        paddingTop: 6,
        marginTop: 0,
        elevation: 0,
      },
    }),
  },
  // Table
  tableRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  tableColumn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingVertical: 13,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#D9D9D9',
  },
  tableItemTitle: {
    // alignItems: 'flex-start',
    // justifyContent: 'flex-start',
    // fontFamily: fontSet.regular,
    fontSize: 14,
    fontWeight: '500',
    color: _colorSet.black,
  },
  tableItemSubTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: _colorSet.black,
    // fontFamily: fontSet.regular,
  },
  tableRowBackground: (state) => {
    let color = _colorSet.white;
    switch (state) {
      case Constants.stateList.shipping:
        color = _colorSet.order.shipping;
        break;
      case Constants.stateList.shipped:
        color = _colorSet.order.shipped;
        break;
      case Constants.stateList.completed:
        color = _colorSet.order.completed;
        break;
      case Constants.stateList.returned:
        color = _colorSet.order.returned;
        break;
      case Constants.stateList.cancelled:
        color = _colorSet.order.cancelled;
        break;
    }
    return {
      backgroundColor: color,
    };
  },

  // Modal
  modalBoxWrap: {
    position: 'absolute',
    borderRadius: 10,
    top: (Constants.Window.height * 7) / 100,
    // height: (Constants.Window.height * 83) / 100,
    width: (Constants.Window.width * 94) / 100,
    marginLeft: (Constants.Window.width * 3) / 100,
    // paddingHorizontal: 15,
    backgroundColor: _colorSet.background,
    // backgroundColor: 'rgba(51, 51, 51, 0.75)',
    zIndex: 10,
    // right: null,
    justifyContent: 'flex-start',
    overflow: 'hidden',
  },

  modalContainer: {
    paddingVertical: 10,
  },

  modalInfo: {
    paddingHorizontal: 25,
    maxWidth: 600,
  },
};

const _functions = {
  timeFormat: (timeStamp) => {
    let time = '';
    if (timeStamp) {
      if (moment().diff(timeStamp, 'days') == 0) {
        time = moment(timeStamp).format('H:mm');
      } else {
        time = moment(timeStamp).fromNow();
      }
    }
    // time = postTime.toUTCString();
    return time;
  },
};

const _chartConfig = {
  backgroundGradientFrom: '#FFFFFF',
  backgroundGradientTo: '#FFFFFF',
  decimalPlaces: 0,
  paddingLeft: 0,
  color: (opacity = 1) => 'rgb(48, 104, 204)',
};

const _dateRangeOptions = [
  { key: 'custom_range', label: 'Custom Range' },
  { key: 'today', label: 'Today' },
  { key: 'yesterday', label: 'Yesterday' },
  { key: 'last_week', label: 'Last Week' },
  { key: 'this_month', label: 'This Month' },
  { key: 'last_month', label: 'Last Month' },
  { key: 'year_to_date', label: 'Year to Date' },
  { key: 'lifetime', label: 'Lifetime' },
];

const _fontSet = {
  regular: 'AppleSDGothicNeo-Regular',
  bold: 'AppleSDGothicNeo-Bold',
};

export const colorSet = _colorSet;
export const iconSizeSet = _iconSizeSet;
export const sizeSet = _sizeSet;
export const fontSizeSet = _fontSizeSet;
export const styleSet = _styleSet;
export const fontSet = _fontSet;
export const utils = _functions;
export const chartConfig = _chartConfig;
export const dateRangeOptions = _dateRangeOptions;
export const headerHeight = _headerHeight;

const StyleDict = {
  colorSet: _colorSet,
  iconSizeSet: _iconSizeSet,
  sizeSet: _sizeSet,
  fontSizeSet: _fontSizeSet,
  styleSet: _styleSet,
  headerHeight: Platform.OS === 'ios' ? 40 : 56,
  utils: _functions,
  chartConfig: _chartConfig,
  dateRangeOptions: _dateRangeOptions,
  dateFormat: 'YYYY-MM-DD',
  fontSet: _fontSet,
};

export default StyleDict;
