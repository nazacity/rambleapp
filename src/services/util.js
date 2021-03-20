import dayjs from 'dayjs';
import 'dayjs/locale/th';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export const checkTimeFromPast = (time) => {
  if (new Date() - new Date(time) > 5 * 24 * 60 * 60 * 1000)
    return dayjs(time).format('D MMMM YYYY');
  return dayjs(time).fromNow();
};

export const checkTimeTilFuture = (time) => {
  if (new Date(time) - new Date() > 5 * 24 * 60 * 60 * 1000) return;
  return;
};

export const shortText = (text, length) => {
  if (text.length > length) {
    return text.substring(0, length) + '...';
  } else {
    return text;
  }
};
