import { Link } from '@tanstack/react-router'
import { useForm, type SubmitHandler, type SubmitErrorHandler } from 'react-hook-form';
import {courseResolver, type Course} from '../types/courses';
import CourseField from './CourseField';

interface CourseEditorProps {
    course: Course;
}

const CourseEditor = ({course}:CourseEditorProps) => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Course>({
        defaultValues: course,
        mode: 'onChange',
        resolver: courseResolver 
    });

    const onSubmit: SubmitHandler<Course> = async(data) => {
        alert(`Submitting ${JSON.stringify(data)}`)
        // Simulate a 2-second API call
        await new Promise(resolve => setTimeout(resolve, 2000));
    };

    const onError: SubmitErrorHandler<Course> = () => {
        alert('Submissions prevented due to form errors')
    };

    return (
        <form onSubmit={handleSubmit(onSubmit, onError)}>
            <div className="m-5">
                <input type="text" {...register('id')} className="hidden" />
                <CourseField name="term" label="Term" errors={errors} register={register} />
                <CourseField name="number" label="Course Number" errors={errors} register={register} />
                <CourseField name="meets" label="Meeting Times" errors={errors} register={register} />
                <CourseField name="title" label="Course Title" errors={errors} register={register} />
            </div>
            <div className="m-3 mb-7">
                <Link 
                    to="/"
                    disabled={isSubmitting}
                    className="ml-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold" 
                >
                    Cancel
                </Link>
            </div>
        </form>
    );
};

export default CourseEditor;