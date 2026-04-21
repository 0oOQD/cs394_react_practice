import { useState } from 'react';
import type { Courses } from './CourseList';
import TermSelector from './TermSelector';
import CourseList from './CourseList';

const TermPage = ({courses}: Courses) => {
    const [selected, setSelected] = useState('Fall');
    const terms = [...new Set(Object.entries(courses).flatMap(([_, course]) => course.term ?? []))].sort();

    return (
        <div className="container mx-auto px-4 w-svw">
            <TermSelector name="term-selector" options={terms} selected={selected} setSelected={setSelected}/>
            <CourseList courses={courses} selectedTerm={selected} />
        </div>
    )
}

export default TermPage;
