export const checkTimeFromPast = (time) => {
  if (new Date() - new Date(time) > 5 * 24 * 60 * 60 * 1000) return true;
  return false;
};

export const checkTimeTilFuture = (time) => {
  if (new Date(time) - new Date() > 5 * 24 * 60 * 60 * 1000) return true;
  return false;
};
