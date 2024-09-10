import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import zh from 'dayjs/locale/zh';

// 基础设置
dayjs.locale(zh);
dayjs.extend(utc);

const dayJS = {
  format(time: any, format = 'YYYY/MM/DD HH:mm:ss') {
    return dayjs(time).utcOffset(0).format(format);
  }
}

export default dayJS;