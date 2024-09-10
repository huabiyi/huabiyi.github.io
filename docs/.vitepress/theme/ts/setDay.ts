import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

// 基础设置
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Shanghai");

const dayJS = {
  format(time: any, format = 'YYYY/MM/DD HH:mm:ss') {
    // console.log('>>>> dayjs(time).format(format)', dayjs(time).utc(true).format(format));
    return dayjs(time).utc(true).format(format);
  }
}

export default dayJS;