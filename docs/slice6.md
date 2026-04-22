Define a slice of a React program to show a department course schedule.

This slice should have the component App use JSX in TypeScript to show the title and courses of the schedule for 2018-2019. The interface should be responsive to screensize. Use Tailwind 4 to style the HTML. 

Change the user interface so that clicking on a course card adds it to a list of selected classes. Clicking a course already selected unselects it. Selected classes should highlight in some clear way, e.g., change in background color, text, or added icon, such as a checkmark.

This task requires defining a new state variable to hold the list of selected classes, code to add or remove a class from that list, and code to display a course different depending on whether it is selected.

The task is done when a user can select and unselect any number of classes on the deployed app.

The following code shows an example from a different project that should be used as reference. Follow the coding style used in this example when producing the answer. 

```
import { useState } from 'react';
import RecipeCard from './RecipeCard';
import { type Recipe } from '../types/recipes';

const toggleList = <T,>(x: T, lst: T[]): T[] => (
  lst.includes(x) ? lst.filter(y => y !== x) : [...lst, x]
);

interface RecipeSelectorProps {
  recipes: Recipe[]
}

const RecipeSelector = ({recipes}: RecipeSelectorProps) => {
  const [menu, setMenu] = useState<Recipe[]>([]);

  const toggleMenu = (item: Recipe) => {
    setMenu(menu => toggleList(item, menu));
  };

  return (
    <div className="container mx-auto px-4 w-svw">
      <h1 className="text-2xl">Your menu</h1>
      <ul className="ml-6 h-24 overflow-auto border border-gray-400 p-4">
        {
          menu.map(recipe => <li key={`menu-${recipe.id}`}>{recipe.name}</li>)
        }
      </ul>
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] gap-4 px-4">
        { 
          recipes.map(recipe => (
            <div key={recipe.id} className="relative">
              <RecipeCard recipe={recipe} />)
              <input type="checkbox" onChange={() => togglemenu(recipe)}
                className="absolute top-10 right-0 z-10 border-2 border-white rounded-sm checked:bg-blue-500 checked:border-blue-500" />
            </div>
          ))
        }
      </div>
    </div>
  )
};

export default RecipeSelector;
```