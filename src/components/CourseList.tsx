export interface Course {
    term: string;
    number: string;
    meets: string;
    title: string;
}

export interface Courses {
    courses: Record<string, Course>;
}

interface CoursesAndTerm {
    courses: Record<string, Course>;
    selectedTerm: string;
}

const CourseList = ({ courses, selectedTerm }: CoursesAndTerm) => {
    const filteredCourses = Object.entries(courses).filter(
        ([_, course]) => course.term === selectedTerm
    );

    return (
        <div className="grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] gap-4 px-4">
        {
            filteredCourses.map(([id, course]) => (
                <div key={id} className="flex flex-col justify-items-start h-55 w-50 p-5 m-2 border-2 border-gray-300 rounded-lg">
                    <div className="text-black text-xl p-1">
                        {course.term} CS {course.number}
                    </div>
                    <div className="p-1 text-black text-sm flex-grow">
                        {course.title}
                    </div>
                    <hr className="-translate-x-3 border-gray-300 w-45 my-1"/>
                    <div className="text-black text-sm p-1 m-0">
                        {course.meets}
                    </div>
                </div>
            ))
        }
        </div>
    )
};

export default CourseList;