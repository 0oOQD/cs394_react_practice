import { describe, it, expect } from 'vitest';
import { coursesConflict } from './timeConflict';
import type { Course } from '../components/CourseList';

const makeCourse = (term: string, meets: string): Course => ({
  term,
  number: '100',
  title: 'Test Course',
  meets,
});

describe('coursesConflict', () => {
  it('returns false when both courses have empty meeting strings', () => {
    const a = makeCourse('Fall', '');
    const b = makeCourse('Fall', '');
    expect(coursesConflict(a, b)).toBe(false);
  });

  it('returns false when one course has an empty meeting string', () => {
    const a = makeCourse('Fall', 'MWF 11:00-11:50');
    const b = makeCourse('Fall', '');
    expect(coursesConflict(a, b)).toBe(false);
    expect(coursesConflict(b, a)).toBe(false);
  });

  it('returns false for courses in different terms', () => {
    const a = makeCourse('Fall', 'MWF 11:00-11:50');
    const b = makeCourse('Spring', 'MWF 11:00-11:50');
    expect(coursesConflict(a, b)).toBe(false);
  });

  it('returns false for same term but no overlapping days', () => {
    const a = makeCourse('Fall', 'MWF 11:00-11:50');
    const b = makeCourse('Fall', 'TuTh 11:00-12:20');
    expect(coursesConflict(a, b)).toBe(false);
  });

  it('returns false for same term, same days, but non-overlapping times', () => {
    const a = makeCourse('Fall', 'MWF 11:00-11:50');
    const b = makeCourse('Fall', 'MWF 12:00-12:50');
    expect(coursesConflict(a, b)).toBe(false);
  });

  it('returns true for exact same meeting time', () => {
    const a = makeCourse('Fall', 'MWF 11:00-11:50');
    const b = makeCourse('Fall', 'MWF 11:00-11:50');
    expect(coursesConflict(a, b)).toBe(true);
  });

  it('returns true for overlapping times on shared days', () => {
    const a = makeCourse('Fall', 'MWF 11:00-11:50');
    const b = makeCourse('Fall', 'MWF 11:30-12:20');
    expect(coursesConflict(a, b)).toBe(true);
  });

  it('returns true when one time window contains the other', () => {
    const a = makeCourse('Fall', 'MWF 10:00-12:00');
    const b = makeCourse('Fall', 'MWF 10:30-11:30');
    expect(coursesConflict(a, b)).toBe(true);
  });

  it('returns true when only one day overlaps', () => {
    const a = makeCourse('Fall', 'MWF 11:00-11:50');
    const b = makeCourse('Fall', 'WF 11:00-11:50');
    expect(coursesConflict(a, b)).toBe(true);
  });

  it('handles TuTh days correctly', () => {
    const a = makeCourse('Fall', 'TuTh 15:30-16:50');
    const b = makeCourse('Fall', 'TuTh 16:00-17:00');
    expect(coursesConflict(a, b)).toBe(true);
  });

  it('returns false for TuTh vs MWF with overlapping times', () => {
    const a = makeCourse('Fall', 'TuTh 11:00-12:20');
    const b = makeCourse('Fall', 'MWF 11:00-11:50');
    expect(coursesConflict(a, b)).toBe(false);
  });

  it('treats adjacent times (end equals start) as non-conflicting', () => {
    const a = makeCourse('Fall', 'MWF 11:00-11:50');
    const b = makeCourse('Fall', 'MWF 11:50-12:40');
    expect(coursesConflict(a, b)).toBe(false);
  });

  it('handles single-day meetings', () => {
    const a = makeCourse('Fall', 'M 6:00-9:00');
    const b = makeCourse('Fall', 'M 8:00-10:00');
    expect(coursesConflict(a, b)).toBe(true);
  });

  it('handles single-day meetings with no conflict', () => {
    const a = makeCourse('Fall', 'Tu 14:00-17:10');
    const b = makeCourse('Fall', 'M 6:00-9:00');
    expect(coursesConflict(a, b)).toBe(false);
  });

  it('is symmetric', () => {
    const a = makeCourse('Fall', 'MW 18:00-19:30');
    const b = makeCourse('Fall', 'MWF 12:30-13:50');
    expect(coursesConflict(a, b)).toBe(coursesConflict(b, a));
  });
});
