import type { Course } from '../components/CourseList';

interface MeetingTime {
    weekDays: string[];
    startMinutes: number;
    endMinutes: number;
}

const parseMeetingString = (meetingStr: string): MeetingTime | null => {
    if (meetingStr.length === 0) {return null;};

    const re = /[ :-]/;
    const parts = meetingStr.split(re);

    const meeting: MeetingTime = {
        weekDays: [],
        startMinutes: -1,
        endMinutes: -1
    }

    const daysOfWeek = ["M", "Tu", "W", "Th", "F"];
    daysOfWeek.forEach((day) => {
        if (parts[0].includes(day)) {
            meeting.weekDays.push(day);
        }
    });

    meeting.startMinutes = parseInt(parts[1]) * 60 + parseInt(parts[2]);
    meeting.endMinutes = parseInt(parts[3]) * 60 + parseInt(parts[4]);

    // console.log(meetingStr, parts, meeting);

    return meeting;
};

const existSameDay = (meeting1: MeetingTime, meeting2: MeetingTime): boolean => 
    meeting1.weekDays.some(day => meeting2.weekDays.includes(day));

const timesOverlap = (meeting1: MeetingTime, meeting2: MeetingTime): boolean =>
    meeting1.startMinutes < meeting2.endMinutes 
        && meeting2.startMinutes < meeting1.endMinutes;

export const coursesConflict = (course1: Course, course2: Course): boolean => {
    if (course1.term !== course2.term) {return false;}
    const meeting1 = parseMeetingString(course1.meets);
    const meeting2 = parseMeetingString(course2.meets);
    if (!meeting1 || !meeting2) {return false;}
    return existSameDay(meeting1, meeting2) && timesOverlap(meeting1, meeting2);
};
