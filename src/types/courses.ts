import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";

const Course = z.object({
    id: z.string(),
    // term: z.enum(['Fall', 'Winter', 'Spring', 'Summer'], {
    //     errorMap: () => ({ message: 'Must be Fall, Winter, Spring, or Summer' })
    // }),
    term: z.enum(['Fall', 'Winter', 'Spring', 'Summer'], {
        message: "Must be Fall, Winter, Spring, or Summer"
    }),
    number: z.string().regex(/^\d\d\d(-\d)?$/, {
        message: 'Must be a number with optional section, e.g., "213" or "213-2"'
    }),
    meets: z.string().regex(/^$|^(M|W|F|Tu|Th)+ \d\d:\d\d-\d\d:\d\d$/, {
        message: 'Must contain days and start-end, e.g., MWF 12:00-13:20'
    }),
    title: z.string().trim().min(2, {
        message: 'Must be at least 2 characters'
    })
})

export type Course = z.infer<typeof Course>;

export const validateCourse = Course.safeParse;

export const courseResolver = zodResolver(Course);
