import dayjs from 'dayjs';
import zhcn from 'dayjs/locale/zh-cn';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import weekOfYear from 'dayjs/plugin/weekOfYear';

// 基础设置
dayjs.locale(zhcn);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(weekOfYear)

// 时间格式设置
dayjs.extend(relativeTime);
dayjs.extend(updateLocale);
dayjs.updateLocale('zh-cn', {
  relativeTime: {
    past: "%s前",
    s: '%d秒',
    mm: "%d分钟",
    hh: "%d小时",
    dd: "%d天",
    MM: "%d月",
    yy: "%d年"
  }
})

const regTime = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;
const dayJS = {
  format(time: any, format = 'YYYY/MM/DD HH:mm:ss'):string {
    let utc = true;

    // 如果time值为空，则返回当前时间
    if (!time) return dayjs().format(format);

    // 判断time是否为ISO格式
    if (Object.prototype.toString.call(time) == '[object Date]') time = time.toISOString();
    if (regTime.test(time)) utc = false;

    return dayjs(time).utc(utc).format(format);
  },
  fromNow(time: any): string {
    try {
      return dayjs(time).fromNow();
    } catch (error) {
      console.log('fromnow error -->', error);
      return '';
    }
  },
  getWeek(time: any = dayjs()): number {
    return dayjs(time).week();
  },
  getMonth(time: any = dayjs()): number {
    return dayjs(time).month();
  },
  getYear(time: any = dayjs()): number {
    return dayjs(time).year();
  },
}

export default dayJS;