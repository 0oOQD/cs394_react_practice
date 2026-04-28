import { useState } from 'react';
import CourseCard from './CourseCard';
import CoursePlanModal from './CoursePlanModal';

export interface Course {
    term: string;
    number: string;
    meets: string;
    title: string;
}

export interface Courses {
    courses: Record<string, Course>;
}

interface CoursesProps {
    courses: Record<string, Course>;
    selectedTerm: string;
}

const toggleList = <T,>(x: T, lst: T[]): T[] => (
  lst.includes(x) ? lst.filter(y => y !== x) : [...lst, x]
);

const CourseList = ({ courses, selectedTerm }: CoursesProps) => {
    const filteredCourses = Object.entries(courses).filter(
        ([_, course]) => course.term === selectedTerm
    );

    const [selectedCourseIds, setSelectedCourseIds] = useState<string[]>([]);

    const toggleCourse = (courseId: string) => {
        setSelectedCourseIds(selectedCourseIds => 
            toggleList(courseId, selectedCourseIds));
    };

    const [coursePlanOpen, setCoursePlanOpen] = useState(false);

    return (
        <div>
            <div className="flex justify-end">
                <button className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold" onClick={() => setCoursePlanOpen(true)}>
                    Course Plan
                </button>
            </div>
            <div className="grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] gap-4 px-4 m-3">
            {
                filteredCourses.map(([id, course]) => (
                    <CourseCard key={id} courseId={id} course={course}
                        isSelected={selectedCourseIds.includes(id)} 
                        onToggle={toggleCourse} />
                ))
            }
            </div>
            <h2 className="text-center font-black">Your Selection</h2>
            <ul className="ml-6 h-54 overflow-auto border border-gray-400 p-4 m-5">
                {
                selectedCourseIds.map(id => <li key={`selectedCourse-${id}`}>{courses[id].term} CS {courses[id].number}</li>)
                }
            </ul>
            <div className="absolute z-20">
                <CoursePlanModal selectedCourseIds={selectedCourseIds} courses={courses} isOpen={coursePlanOpen} onClose={() => setCoursePlanOpen(false)} />
            </div>
      </div>
    )
};

export default CourseList;