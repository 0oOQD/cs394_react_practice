import type { Course } from '../components/CourseList';

interface MeetingTime {
  days: string[];
  startMinutes: number;
  endMinutes: number;
}

const parseTimeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

const parseDays = (dayString: string): string[] => {
  const days: string[] = [];
  let index = 0;
  while (index < dayString.length) {
    if (index + 1 < dayString.length && (dayString[index] === 'T' || dayString[index] === 'S')) {
      const twoChar = dayString.slice(index, index + 2);
      if (twoChar === 'Tu' || twoChar === 'Th' || twoChar === 'Sa' || twoChar === 'Su') {
        days.push(twoChar);
        index += 2;
        continue;
      }
    }
    days.push(dayString[index]);
    index += 1;
  }
  return days;
};

const parseMeetingString = (meets: string): MeetingTime | null => {
  if (!meets.trim()) return null;
  const parts = meets.trim().split(' ');
  if (parts.length !== 2) return null;
  const [dayPart, timePart] = parts;
  const [startStr, endStr] = timePart.split('-');
  return {
    days: parseDays(dayPart),
    startMinutes: parseTimeToMinutes(startStr),
    endMinutes: parseTimeToMinutes(endStr),
  };
};

const timesOverlap = (a: MeetingTime, b: MeetingTime): boolean =>
  a.startMinutes < b.endMinutes && b.startMinutes < a.endMinutes;

const daysHaveConflict = (a: MeetingTime, b: MeetingTime): boolean =>
  a.days.some(day => b.days.includes(day));

export const coursesConflict = (a: Course, b: Course): boolean => {
  if (a.term !== b.term) return false;
  const meetingA = parseMeetingString(a.meets);
  const meetingB = parseMeetingString(b.meets);
  if (!meetingA || !meetingB) return false;
  return daysHaveConflict(meetingA, meetingB) && timesOverlap(meetingA, meetingB);
};
