#  GPA Tracker – A Smart Grade Assistant
Welcome to GPA Tracker, a clean and minimalistic tool that helps you track your academic progress in real time. 
Designed for learners, by learners — this calculator lets you record assignment grades, 
compute your GPA on the fly, and reflect on your performance with ease.

Built using *HTML*, *CSS*, and *pure JavaScript* (no frameworks, no fluff).

---

## Why We Built This

Grades matter — but it’s not always easy to track them consistently, especially when assignments pile up.
Our goal was to build a **simple, transparent GPA calculator** that could:

- Let students enter assignments anytime.
- Show GPA updates instantly.
- Store progress safely, even after closing the tab.
- Encourage coding collaboration and learning in the process!

---

## What It function

. Add assignments with a name and grade (out of 5)  
. Instantly calculate and display the updated GPA  
. See all your assignment entries on the screen  
. Press “S” to log the data in your browser console  
. Automatically saves data using **localStorage**  
. Clean, intuitive interface for any device  
## How It Works

The functionality is broken down across HTML, CSS, and JavaScript:

 1. `index.html` – Structure
Provides the layout for:
- Assignment input form (name + grade)
- Assignment list container
- GPA display section

```html
<form id="assignmentForm">
  <input type="text" id="assignmentName" placeholder="Assignment Name" />
  <input type="number" id="assignmentGrade" placeholder="Grade (0–5)" />
  <button type="submit">Add Assignment</button>
</form>
## more info
[GitHub Pages Link https://github.com/nkem-slim/gpa-calculator.git]
