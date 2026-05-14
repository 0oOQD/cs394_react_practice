import { createFileRoute, useLocation } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import CourseEditor from '../../components/CourseEditor';


const RouteComponent = () => {
    const location = useLocation();
    const courseId = location.state.courseId;
    const course = location.state.course;
    return (
    <div>
        <form onSubmit={() => {}}>
            <CourseEditor type="text" name="courseid" label="Course ID" value={courseId} />
            <CourseEditor type="text" name="title" label="Course Title" value={course.title} />
            <CourseEditor type="text" name="term" label="Term" value={course.term} />
            <CourseEditor type="text" name="number" label="Course Number" value={course.number} />
            <CourseEditor type="text" name="meets" label="Meeting Times" value={course.meets} />
        </form>
        <input type="text" name="author" />
    </div>
    
    // <div>Hello "/form/course"! {courseId} {JSON.stringify(course)}</div>
    );
}

export const Route = createFileRoute('/form/course')({
    component: RouteComponent,
})