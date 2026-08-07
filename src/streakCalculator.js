import { formatDateISO } from './formatters';

export function calculateStreaks(dailyLogs = {}) {
  const dates = Object.keys(dailyLogs).sort((a, b) => b.localeCompare(a)); // Descending order
  if (dates.length === 0) return { currentStreak: 0, bestStreak: 0 };

  let currentStreak = 0;
  let bestStreak = 0;
  let tempStreak = 0;

  const today = formatDateISO(new Date());
  const yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const yesterday = formatDateISO(yesterdayDate);

  // Check if today or yesterday has a valid log
  const hasLoggedTodayOrYesterday = dates.includes(today) || dates.includes(yesterday);
  if (!hasLoggedTodayOrYesterday) {
    currentStreak = 0;
  }

  // Traverse sorted unique dates backwards to count consecutive active days
  let checkDate = new Date();
  if (!dates.includes(today) && dates.includes(yesterday)) {
    checkDate = yesterdayDate;
  }

  while (true) {
    const checkStr = formatDateISO(checkDate);
    const log = dailyLogs[checkStr];

    const isActive = log && (
      (log.workoutLogged && log.workoutLogged.completed) ||
      (log.dietLog && log.dietLog.total_calories > 0) ||
      (log.sleepHours && log.sleepHours > 0)
    );

    if (isActive) {
      currentStreak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }

  // Calculate best streak historically across all logs
  let cursor = null;
  const sortedAsc = dates.slice().sort();

  sortedAsc.forEach(dateStr => {
    const log = dailyLogs[dateStr];
    const isActive = log && (
      (log.workoutLogged && log.workoutLogged.completed) ||
      (log.dietLog && log.dietLog.total_calories > 0)
    );

    if (!isActive) return;

    if (!cursor) {
      tempStreak = 1;
    } else {
      const prev = new Date(cursor);
      prev.setDate(prev.getDate() + 1);
      if (formatDateISO(prev) === dateStr) {
        tempStreak++;
      } else {
        tempStreak = 1;
      }
    }
    cursor = dateStr;
    if (tempStreak > bestStreak) bestStreak = tempStreak;
  });

  return {
    currentStreak,
    bestStreak: Math.max(currentStreak, bestStreak)
  };
}
