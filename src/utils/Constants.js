/**
 * Created by Anvita on 20/12/2016.
 *
 * @format
 */

import { Dimensions, Platform } from 'react-native';
import Languages from './Languages';

const { width, height } = Dimensions.get('window');
const isIphoneX =
  Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS && (height >= 812 || width >= 812);
const isTablet = Platform.isPad || width >= 581;

const Constants = {
  isIphoneX,
  isTablet,
  devDomain: 'https://avf.dev.anfast.com.vn/api',
  ToolbarHeight: Platform.OS === 'ios' ? (isIphoneX ? 35 : 0) : 0,
  HeaderHeight: Platform.OS === 'ios' ? (isIphoneX ? 44 : 44) : 56,
  VND: '₫',
  isoDateFormat: 'YYYY-MM-DD',
  defaultISOTime: 'T07:00:01Z',
  dateFormat: 'DD-MM-YYYY',
  dateTimeFormat: 'DD-MM-YYYY HH:mm',
  dateOptions: {
    all: { key: 'all', label: Languages.AllDate },
    tomorrow: { key: 'tomorrow', label: 'Ngày mai' },
    today: { key: 'today', label: 'Hôm nay' },
    yesterday: { key: 'yesterday', label: 'Hôm qua' },
    '2dayago': { key: '2dayago', label: 'Hôm kia' },
    custom: { key: 'custom', label: 'Ngày cụ thể' },
  },
  stateOptions: {
    all: { key: 'all', label: Languages.SelectState },
    pending: { key: 'pending', label: Languages.Pending },
    received: { key: 'received', label: Languages.Received },
    processing: { key: 'processing', label: Languages.Processing },
    shipping: { key: 'shipping', label: Languages.Shipping },
    shipped: { key: 'shipped', label: Languages.Shipped },
    completed: { key: 'completed', label: Languages.Completed },
    returned: { key: 'returned', label: Languages.Returned },
    cancelled: { key: 'cancelled', label: Languages.Cancelled },
  },
  dateRangeOptions: [
    { key: 'custom_range', label: 'Ngày cụ thể' },
    { key: 'today', label: 'Hôm nay' },
    { key: 'yesterday', label: 'Hôm qua' },
    { key: 'this_week', label: 'Tuần này' },
    { key: 'last_week', label: 'Tuần trước' },
    { key: 'this_month', label: 'Tháng này' },
    { key: 'last_month', label: 'Tháng trước' },
    { key: 'year_to_date', label: 'Năm nay' },
    { key: 'lifetime', label: 'Tất cả' },
  ],
  pageSize: 20,
  // fontFamily: 'Roboto-Regular',
  // fontHeader: 'Roboto-Regular',
  SplashScreen: {
    Duration: 2000,
  },
  EmitCode: {
    Toast: 'toast',
  },
  Dimension: {
    ScreenWidth(percent = 1) {
      return Dimensions.get('window').width * percent;
    },
    ScreenHeight(percent = 1) {
      return Dimensions.get('window').height * percent;
    },
  },
  Window: {
    width,
    height: Platform.OS !== 'ios' ? height : height - 20,
    headerHeight: (65 * height) / 100,
    headerBannerAndroid: (55 * height) / 100,
    profileHeight: (45 * height) / 100,
  },
};

export default Constants;
