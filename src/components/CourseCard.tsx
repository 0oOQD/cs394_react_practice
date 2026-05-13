import type { Course } from './CourseList';
import { Link } from '@tanstack/react-router'

interface CourseCardProps {
  courseId: string;
  course: Course;
  isSelected: boolean;
  isDisabled: boolean;
  onToggle: (courseId: string) => void;
}

const CourseCard = ({ courseId, course, isSelected, isDisabled, onToggle }: CourseCardProps) => (
    <div className={`relative ${isDisabled ? 'opacity-25 cursor-not-allowed' : ''}`}>
        <div className={`flex flex-col justify-items-start h-60 w-50 p-5 m-2 border-2 border-gray-300 rounded-lg 
            ${ isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
        `}>
            <div className="text-black text-xl p-1">
                {course.term} CS {course.number}
            </div>
            <div className="p-1 text-black text-sm flex-grow">
                {course.title}
            </div>
            <hr className="-translate-x-3 border-gray-300 w-45 my-1"/>
            <div className="text-black text-sm p-1 m-0 pb-7">
                {course.meets}
            </div>
        </div>
        <input 
            type="checkbox" 
            checked={isSelected}
            disabled={isDisabled}
            onChange={() => onToggle(courseId)}
                className="absolute top-5 left-45 z-10 border-2 border-white rounded-sm checked:bg-blue-500 checked:border-blue-500 disabled:cursor-not-allowed" 
        />
        <div className="absolute bottom-5 right-5">
            <Link 
                to="/form/course/"
                state={{ courseId: courseId, course: course}}
                className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold" 
            >
                Edit
            </Link>
        </div>
    </div>
);

export default CourseCard;
