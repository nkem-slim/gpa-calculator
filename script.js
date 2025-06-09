// Global variables to store assignments and manage state
let assignments = [];
let currentGPA = 0.0;

// DOM Elements
const assignmentNameInput = document.getElementById("assignmentName");
const assignmentGradeInput = document.getElementById("assignmentGrade");
const addButton = document.getElementById("Bttn");
const gpaDisplay = document.getElementById("gpa");
const assignmentsList = document.getElementById("assignmentList");

// Initialize the application when everything loads
document.addEventListener("DOMContentLoaded", function () {
  // Load saved data from localStorage if available
  loadFromStorage();

  // Set up event listeners
  setupEventListeners();

  // Initial GPA calculation and display
  calculateAndDisplayGPA();
});

// Set up all event listeners
function setupEventListeners() {
  // Add assignment button click
  addButton.addEventListener("click", addAssignment);

  // Enter key press on input fields
  assignmentNameInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      addAssignment();
    }
  });

  assignmentGradeInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      addAssignment();
    }
  });

  // Global "S" key press to save assignments to console
  document.addEventListener("keypress", function (event) {
    if (event.key === "s" || event.key === "S") {
      saveToConsole();
    }
  });

  // Real-time GPA update when grade input changes
  assignmentGradeInput.addEventListener("input", function () {
    // This provides immediate feedback as user types
    if (assignments.length > 0) {
      calculateAndDisplayGPA();
    }
  });
}

// Add new assignment function
function addAssignment() {
  const name = assignmentNameInput.value.trim();
  const grade = parseFloat(assignmentGradeInput.value);

  // Validation
  if (!name) {
    alert("Please enter an assignment name.");
    assignmentNameInput.focus();
    return;
  }

  if (isNaN(grade) || grade < 0 || grade > 5) {
    alert("Please enter a valid grade between 0 and 5.");
    assignmentGradeInput.focus();
    return;
  }

  // Create assignment object
  const assignment = {
    id: Date.now(),
    name: name,
    grade: grade,
    timestamp: new Date().toLocaleString(),
  };

  // Add to assignments array
  assignments.push(assignment);

  // Clear input fields
  assignmentNameInput.value = "";
  assignmentGradeInput.value = "";
  assignmentNameInput.focus();

  // Update display
  calculateAndDisplayGPA();
  renderAssignments();

  // Save to localStorage
  saveToStorage();

  console.log("Assignment added:", assignment);
}

// Calculate GPA from all assignments
function calculateGPA() {
  if (assignments.length === 0) {
    return 0.0;
  }

  // Calculate average using reduce method
  const totalGrade = assignments.reduce((sum, assignment) => {
    return sum + assignment.grade;
  }, 0);

  const gpa = totalGrade / assignments.length;
  return Math.round(gpa * 100) / 100; // Round to 2 decimal places
}

// Calculate and display GPA
function calculateAndDisplayGPA() {
  currentGPA = calculateGPA();
  gpaDisplay.textContent = currentGPA.toFixed(2);

  // Add visual feedback based on GPA
  updateGPADisplay();
}

// Update GPA display with color coding
function updateGPADisplay() {
  const gpaElement = gpaDisplay.parentElement;

  // Remove existing classes
  gpaElement.classList.remove(
    "gpa-excellent",
    "gpa-good",
    "gpa-average",
    "gpa-poor"
  );

  // Add appropriate class based on GPA
  if (currentGPA >= 4.5) {
    gpaElement.classList.add("gpa-excellent");
  } else if (currentGPA >= 3.5) {
    gpaElement.classList.add("gpa-good");
  } else if (currentGPA >= 2.5) {
    gpaElement.classList.add("gpa-average");
  } else {
    gpaElement.classList.add("gpa-poor");
  }
}

// Render all assignments to the page
function renderAssignments() {
  // Clear existing assignments
  assignmentsList.innerHTML = "";

  if (assignments.length === 0) {
    assignmentsList.innerHTML =
      '<li class="no-assignments">No assignments added yet. Add your first assignment above!</li>';
    return;
  }

  // Create list items for each assignment
  assignments.forEach((assignment, index) => {
    const listItem = document.createElement("li");
    listItem.className = "assignment-item";
    listItem.innerHTML = `
            <div class="assignment-info">
                <span class="assignment-name">${assignment.name}</span>
                <span class="assignment-grade">${assignment.grade.toFixed(
                  2
                )}/5.00</span>
                <span class="assignment-date">${assignment.timestamp}</span>
            </div>
            <button class="delete-btn" onclick="deleteAssignment(${
              assignment.id
            })">×</button>
        `;
    assignmentsList.appendChild(listItem);
  });

  // Add summary
  const summaryItem = document.createElement("li");
  summaryItem.className = "assignment-summary";
  summaryItem.innerHTML = `
        <strong>Total Assignments: ${
          assignments.length
        } | Current GPA: ${currentGPA.toFixed(2)}/5.00</strong>
    `;
  assignmentsList.appendChild(summaryItem);
}

// Delete assignment function
function deleteAssignment(id) {
  // Find and remove assignment
  assignments = assignments.filter((assignment) => assignment.id !== id);

  // Update display
  calculateAndDisplayGPA();
  renderAssignments();

  // Save to localStorage
  saveToStorage();

  console.log("Assignment deleted. Remaining assignments:", assignments.length);
}

// Save all assignments to console (triggered by "S" key)
function saveToConsole() {
  console.log("=== GPA CALCULATOR DATA ===");
  console.log("Current GPA:", currentGPA.toFixed(2));
  console.log("Total Assignments:", assignments.length);
  console.log("All Assignments:", assignments);

  if (assignments.length > 0) {
    console.log("\n=== DETAILED BREAKDOWN ===");
    assignments.forEach((assignment, index) => {
      console.log(
        `${index + 1}. ${assignment.name}: ${assignment.grade}/5.00 (Added: ${
          assignment.timestamp
        })`
      );
    });
  }

  // Also log statistics
  if (assignments.length > 0) {
    const grades = assignments.map((a) => a.grade);
    const maxGrade = Math.max(...grades);
    const minGrade = Math.min(...grades);

    console.log("\n=== STATISTICS ===");
    console.log("Highest Grade:", maxGrade.toFixed(2));
    console.log("Lowest Grade:", minGrade.toFixed(2));
    console.log("Average (GPA):", currentGPA.toFixed(2));
  }

  alert("Assignment data logged to console! Press F12 to view.");
}

// localStorage functions for data persistence
function saveToStorage() {
  try {
    localStorage.setItem(
      "gpaCalculatorData",
      JSON.stringify({
        assignments: assignments,
        lastUpdated: new Date().toISOString(),
      })
    );
  } catch (error) {
    console.warn("Could not save to localStorage:", error);
  }
}

function loadFromStorage() {
  try {
    const savedData = localStorage.getItem("gpaCalculatorData");
    if (savedData) {
      const data = JSON.parse(savedData);
      assignments = data.assignments || [];

      console.log("Loaded", assignments.length, "assignments from storage");
      renderAssignments();
    }
  } catch (error) {
    console.warn("Could not load from localStorage:", error);
    assignments = [];
  }
}

// Clear all data function (utility)
function clearAllData() {
  if (
    confirm(
      "Are you sure you want to clear all assignments? This cannot be undone."
    )
  ) {
    assignments = [];
    currentGPA = 0.0;

    calculateAndDisplayGPA();
    renderAssignments();
    saveToStorage();

    console.log("All data cleared");
    alert("All assignments cleared!");
  }
}

// Utility function to get assignment statistics
function getStatistics() {
  if (assignments.length === 0) {
    return {
      count: 0,
      average: 0,
      highest: 0,
      lowest: 0,
    };
  }

  const grades = assignments.map((a) => a.grade);
  return {
    count: assignments.length,
    average: currentGPA,
    highest: Math.max(...grades),
    lowest: Math.min(...grades),
    total: grades.reduce((sum, grade) => sum + grade, 0),
  };
}
