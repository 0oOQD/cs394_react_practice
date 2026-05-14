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
            <div className="m-5">
                <CourseEditor type="text" name="courseid" label="Course ID" value={courseId} />
                <CourseEditor type="text" name="title" label="Course Title" value={course.title} />
                <CourseEditor type="text" name="term" label="Term" value={course.term} />
                <CourseEditor type="text" name="number" label="Course Number" value={course.number} />
                <CourseEditor type="text" name="meets" label="Meeting Times" value={course.meets} />
            </div>
            <div className="m-3 mb-7">
                <Link 
                    to="/"
                    className="ml-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold" 
                >
                    Cancel
                </Link>
            </div>
        </form>
        <input type="text" name="author" />
    </div>
    
    // <div>Hello "/form/course"! {courseId} {JSON.stringify(course)}</div>
    );
}

export const Route = createFileRoute('/form/course')({
    component: RouteComponent,
})