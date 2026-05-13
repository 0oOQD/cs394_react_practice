import { createFileRoute, useLocation } from '@tanstack/react-router'

export const Route = createFileRoute('/form/course')({
    component: RouteComponent,
})

function RouteComponent() {
    const location = useLocation();
    const courseId = location.state.courseId;
    const course = location.state.course;
    return <div>Hello "/form/course"! {courseId} {JSON.stringify(course)}</div>
}
