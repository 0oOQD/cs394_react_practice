interface Course {
    term: string;
    number: string;
    meets: string;
    title: string;
}

interface Courses {
    courses: Record<string, Course>;
}

const CourseList = ({courses}: Courses) => (
    <ul>
    {
        Object.entries(courses).map(([id, course]) => (
            <li key={id}>{course.term} CS {course.number}: {course.title}</li>
        ))
    }
    </ul>
);

export default CourseList;