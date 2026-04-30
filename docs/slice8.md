Start from the current code in the `cs394_react_practice` repository.

Define a slice of a React program to show a department course schedule.

This slice should have the component App use JSX in TypeScript to show the title and courses of the schedule for 2018-2019. The interface should be responsive to screensize. Use Tailwind 4 to style the HTML. 

Make it impossible for a user to select a class that has a time conflict with classes they've already selected. A course card should be selectable only if it does not have a time conflict with any currently selected class. Unselectable courses should be marked in some way, e.g., fainter color or a small "x" somewhere. The visual display should update immediately when classes are selected and unselected.

Two classes have a time conflict if they meet in the same term, have at least one day in common, and their timespans overlap. A class meeting time is either the empty string or a meeting string like MWF 9:00-9:50 or TuTh 14:00-15:20. Any non-empty subset of days is possible. No day appears twice. The start time is always strictly less than the ending time. Times run from 0:00 to 23:59. Classes with an empty meeting string never have a time conflict.

The code for calculating conflicts should be clean and maintainable, broken down into short well-named functions, and placed in a JavaScript utility file that exports only the functions needed by the React component(s) that check for time conflicts.

This task is done when the deployed app only allows users to select classes with no time conflicts. Make sure unselecting still works!

------

Here is a list of example meeting strings, one example on each line:
"MWF 11:00-11:50"
"MWF 10:00-10:50"
"MWF 12:30-13:50"
"TuTh 15:30-16:50"
"TuTh 11:00-12:20"
"M 6:00-9:00"
"Tu 14:00-17:10"
"MW 18:00-19:30"

More information regarding meeting strings:
"M" is Monday.
"Tu" is Tuesday.
"W" is Wednesday.
"Th" is Thursday.
"F" is Friday.
