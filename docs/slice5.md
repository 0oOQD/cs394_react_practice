Define a slice of a React program to show a department course schedule.

This slice should have the component App use JSX in TypeScript to show the title and courses of the schedule for 2018-2019. The interface should be responsive to screensize. Use Tailwind 4 to style the HTML. 

Implement an interactive user interface element to let users choose whether to see classes for fall, winter, or spring. Key steps in this task:

- A term selector component that holds three button, for Fall, Winter, and Spring respectively.
- A term page component that holds the term selector and course list.
- A selected term state variable that is initially set to Fall.
- Code in the course list component to only show classes that are in the selected term.
- Code in the term selector to change the selected term state when a term button is clicked.

Clicking on the Fall, Winter, or Spring buttons should immediately update the set of classes displayed.


The following code (two files) shows an example from a different project that should be used as reference. Follow the coding style used in this example when producing the answer. 

Filename: "/src/components/RadioControl.tsx"
```
import type { Dispatch, SetStateAction } from "react"

interface RadioControlProps {
  name: string,
  options: string[],
  selected: string,
  setSelected: Dispatch<SetStateAction<string>>
}

const RadioControl = ({ name, options, selected, setSelected }: RadioControlProps) => (
  <div className="flex justify-center gap-1">
    { options.map(option  => (
        <div key={option}>
          <input type="radio" name={name} id={option} value={option}
                 checked={option === selected}
                 onChange={() => setSelected(option)}
          />
          <label className="ml-1 mr-1" htmlFor={option}>
            {option}
          </label>
        </div>
      ))
    }
  </div>
);

export default RadioControl;
```

Filename: "/src/components/RecipeCards.tsx"
```
const RecipeCards = ( ) => {
  const [selected, setSelected] = useState('');
  const [json, isLoading, error] = useJsonQuery('https://dummyjson.com/recipes');

  if (error) return <h1>Error loading recipes: {`${error}`}</h1>;
  if (isLoading) return <h1>Loading recipess...</h1>;
  if (!json) return <h1>No recipe data found</h1>;

  const result = parseRecipes(json);

  if (!result.success) {
    console.log(result.error);
    return <h1>Error loading recipes. See console log for details.</h1>
  }

  const recipes = result.data.recipes;
  const mealTypes = [...new Set(recipes.flatMap(recipe => recipe.mealType ?? []))].sort();
  const selectedRecipes = selected === '' ? recipes : recipes.filter(recipe => recipe.mealType && recipe.mealType.includes(selected))
  
  return (
    <div className="container mx-auto px-4 w-svw">
      <h1 className="text-2xl">Our Top Recipes</h1>
      <RadioControl name="meal-type" options={mealTypes} selected={selected} setSelected={setSelected}/>
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] gap-4 px-4">
        { selectedRecipes.map(recipe => <RecipeCard key={recipe.id} recipe={recipe} />) }
      </div>
    </div>
  )
}
```

