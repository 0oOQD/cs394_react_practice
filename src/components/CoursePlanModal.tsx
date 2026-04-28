import type { Course } from './CourseList';
import Modal from './Modal';

interface CoursePlanModalProps {
    selectedCourseIds: string[];
    courses: Record<string, Course>;
    isOpen: boolean;
    onClose: () => void
}

const CoursePlanModal = ({ selectedCourseIds, courses, isOpen, onClose }: CoursePlanModalProps) => {
    const selectedCourses = selectedCourseIds.map(id => courses[id]);
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="flex flex-col">
            <h2 className="text-lg font-bold m-1">Your Course Plan</h2>
            {
                selectedCourseIds.length === 0 ? (
                    <p className="text-gray-600">No courses selected yet. <br /> To select a course, click on the check box at the upper right corner of the course.</p>
                ) : (
                    <ul className="space-y-3">
                        {
                            selectedCourses.map(course => (
                                <li key={`plan-${course.number}`} className="border-l-4 border-blue-500 pl-3">
                                    <div className="font-semibold text-gray-800">
                                    CS {course.number}: {course.title}
                                    </div>
                                    <div className="text-sm text-gray-600">
                                    {course.term} • {course.meets}
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                )
            }
            </div>
        </Modal>
    );
};

export default CoursePlanModal;
