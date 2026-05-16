Define a slice of a React program to show a department course schedule.

This slice should have the component App use JSX in TypeScript to show the title and courses of the schedule for 2018-2019. The interface should be responsive to screen size. Use Tailwind 4 to style the HTML. 

Add code to check that the form data is valid course data and give user feedback about which fields have bad data.

This involves define a type schema for course data and a validator function that can be used a a resolver in the form. At a minimum:

- the course title must be at least two characters, e.g., "AI" would be accepted but not "X"
- the term must be the string Fall, Winter, Spring, or Summer
- the course number must be a string that is a number with an optional section, e.g., "213-2"
- the meeting time must be either the empty string or a legal meeting time with one or more days and a non-empty timespan.

Helpful messages should appear next to form fields with invalid data, such "must contain days and start-end, e.g., MWF 12:00-13:20".

------

The following code shows an example from a different project that should be used as reference. Follow the coding style used in this example when producing the answer. 

File: `/src/types/quotes.tsx`
```
import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";

const Quote = z.object({
  id: z.int(),
  author: z.string().trim().min(1),
  quote: z.string().trim().min(1)
})

const QuoteCollection = z.object({
  quotes: z.array(Quote)
})

export type Quote = z.infer<typeof Quote>;

export type QuoteCollection = z.infer<typeof QuoteCollection>;

export const validateQuoteCollection = QuoteCollection.safeParse;

export const quoteResolver = zodResolver(Quote);
```

File: `/src/components/QuoteField.tsx`
```
import type { Quote } from '../types/quotes';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';

interface QuoteFieldProps {
  name: keyof Quote;
  label: string;
  errors: FieldErrors<Quote>;
  register: UseFormRegister<Quote>
}

const QuoteField = ({name, label, errors, register}: QuoteFieldProps) => (
  <label>
    <p className="text-lg">{label}{ errors[name] && <span className="text-sm inline-block pl-2 text-red-400 italic">
      {errors[name].message}</span> }
    </p>
    <input {...register(name)}
      className={`w-full rounded border ${errors[name] ? 'border-red-500' : 'border-gray-300'} bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-80`}
    />
  </label>
)

export default QuoteField;
```

File: `/src/components/QuoteEditor.tsx`
```
import { useForm, type SubmitHandler, type SubmitErrorHandler } from 'react-hook-form';
import Button from './Button';
import QuoteField from './QuoteField';
import { quoteResolver, type Quote } from '../types/quotes';

const QuoteEditor = ({quote}: { quote: Quote }) => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Quote>({
    defaultValues: quote,
    mode: 'onChange',
    resolver: quoteResolver 
  });
  
  const onSubmit: SubmitHandler<Quote> = async(data) => {
    alert(`Submitting ${JSON.stringify(data)}`)
    // Simulate a 2-second API call
    await new Promise(resolve => setTimeout(resolve, 2000));
  };

  const onError: SubmitErrorHandler<Quote> = () => {
    alert('Submissions prevented due to form errors')
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <input type="number" {...register('id')} className="hidden" />
      <QuoteField name="author" label="Author" errors={errors} register={register} />
      <QuoteField name="quote" label="Quote" errors={errors} register={register} />
      <Button type="submit" disabled={isSubmitting}>Submit</Button>
    </form>
  )
};

export default QuoteEditor;
```
