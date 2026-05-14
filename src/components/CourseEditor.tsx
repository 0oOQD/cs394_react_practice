interface CourseEditorProps {
    type: string;
    name: string;
    label: string;
    value: string | number;
}

const CourseEditor = ({type, name, label, value}: CourseEditorProps) => {
    return (
        <>
            <p className="text-lg font-bold">{label}</p>
            <input type={type} name={name} defaultValue={value} onChange={(evt) => {}}
                className={`w-full rounded border border-gray-300 bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-80`}
            />
        </>
    )
}

export default CourseEditor;
