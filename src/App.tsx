import Banner from './components/Banner';
import TermPage from './components/TermPage';
import { useJsonQuery } from './utilities/fetch';
import type { Course } from './components/CourseList';

interface CoursesInfo {
    title: string;
    courses: Record<string, Course>;
}

const App = () => {
  const [json, isLoading, error] = useJsonQuery('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php');

  if (error) return <h1>Error loading course data: {`${error}`}</h1>;
  if (isLoading) return <h1>Loading course data...</h1>;
  if (!json) return <h1>No course data found</h1>;

  const schedule = json as CoursesInfo;

  return(
    <main>
      <Banner title={schedule.title} />
      <TermPage courses={schedule.courses} />
    </main>
  )
};

export default App;