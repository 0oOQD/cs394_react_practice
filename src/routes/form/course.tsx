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
                <input type="text" name="courseid" value={courseId} className="hidden" />
                <CourseEditor type="text" name="title" label="Course Title" value={course ? course.title : ""} />
                <CourseEditor type="text" name="meets" label="Meeting Times" value={course ? course.meets : ""} />
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
    </div>
    
    // <div>Hello "/form/course"! {courseId} {JSON.stringify(course)}</div>
    );
}

export const Route = createFileRoute('/form/course')({
    component: RouteComponent,
})