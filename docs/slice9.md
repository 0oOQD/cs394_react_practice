Define a slice of a React program to show a department course schedule.

This slice should have the component App use JSX in TypeScript to show the title and courses of the schedule for 2018-2019. The interface should be responsive to screensize. Use Tailwind 4 to style the HTML. 

Add a form that contains text input fields for the title and meeting times for a course. Then add a link or button on each course card to open the edit form, populated with that course's data.

Don't worry about form submission. There should be a Cancel button, but no Submit button. The form should have an onSubmit() method that does nothing. Clicking the Cancel button should return the user to the main course list.

------

The following code shows an example from a different project that should be used as reference. Follow the coding style used in this example when producing the answer. 

File: `/src/main.tsx`
```
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router'
import './index.css'

// Import the generated route tree
import { routeTree } from './routeTree.gen'

// Create a new router instance
const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Render the app
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  )
}
```

File: `/src/routes/__root.tsx`
```
import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex gap-4">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{' | '}
        <Link to="/recipes" className="[&.active]:font-bold">
          Recipes
        </Link>{' | '}
        <Link to="/quote/$index" params={{index: '0'}} className="[&.active]:font-bold">
          Quote
        </Link>
      </div>
      <hr className="my-4" />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
  notFoundComponent: () => (
    <div className="h-screen flex items-center justify-center text-6xl">
     I looked for that page, I really did! 😭
    </div>
  )
});
```

File: `/src/routes/index.tsx`
```
import { createFileRoute } from '@tanstack/react-router'

const Index = () => (
  div className="flex flex-col h-screen justify-center items-center">
    div className=" p-4 border-2 border-blue-600 rounded-lg">
      h1 className="text-xl font-bold my-2">Welcome!/h1>
      p className="text-lg">This is a small collection of React examples./p>
      p className="text-lg">Use the navigation bar at the top to visit each one./p>
    /div>
  /div>
);

export const Route = createFileRoute('/')({
  component: Index,
});
```

File: `/src/routes/recipes.tsx`
```
import { createFileRoute } from '@tanstack/react-router'
import RecipeCards from '../components/RecipeCards';


export const Route = createFileRoute('/recipes/')({
  component: RecipeCards
});
```

File: `/src/routes/quote.$index.tsx`
```
import { createFileRoute } from '@tanstack/react-router'
import { useNavigate, useParams } from '@tanstack/react-router';
import { useJsonQuery } from '../utilities/fetch';
import { validateQuoteCollection, type Quote } from '../types/quotes';
import RandomQuote from '../components/RandomQuote';

// randomly return a number between 1 and N inclusive
const pick = (n: number) => Math.floor(Math.random() * n);

const RandomQuotePage = ( ) => {
  const navigate = useNavigate();
  const { index } = useParams({ from: '/quote/$index' });
  const [json, isLoading, error] = useJsonQuery('https://dummyjson.com/quotes');

  if (error) return <h1>Error loading data: {`${error}`}</h1>;
  if (isLoading) return <h1>Loading data...</h1>;
  if (!json) return <h1>No data found</h1>;

  const validation = validateQuoteCollection(json);

   if (!validation.success) {
    console.log(validation.error);
    return <h1>Error loading quote. See console log for details.</h1>
  }

  const quotes = validation.data.quotes
  const quote = quotes[(parseInt(index) || 1) - 1]

  const goRandom = () => (
    navigate({to: `/random/${pick(quotes.length)}`})
  )

  return (
    <RandomQuote quote={quote} random={goRandom} />
  )
};

export const Route = createFileRoute('/random/$index')({
  component: RandomQuotePage
});
```

File: `/src/components/RandomQuote.tsx` (Part of the code is omitted.)
```
...
interface RandomQuoteProps {
  quote: Quote,
  random: () => void
}

const RandomQuote = ( {quote, random }: RandomQuoteProps) => (
    ...

    <Button onClick={random}>New quote</Button>
...
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
