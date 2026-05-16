import { createFileRoute, useLocation } from '@tanstack/react-router'
import CourseEditor from '../../components/CourseEditor';
import type { Course} from '../../types/courses';

const RouteComponent = () => {
    const location = useLocation();
    const courseId = location.state.courseId;
    const course = location.state.course;
    const courseObj = course ? {...course} : {term: "Fall", number:"100", meets:"", title:"None"} as const;
    return (
        <CourseEditor course={{id: courseId ? courseId : "", ...courseObj} as Course}/>
    );
}

export const Route = createFileRoute('/form/course')({
    component: RouteComponent,
})