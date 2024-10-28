const inputBox = document.getElementById("input-box");
const prioritySelect = document.getElementById("priority-select");
const dueDateInput = document.getElementById("due-date");
const listContainer = document.getElementById("list-container");
const clearCompletedButton = document.getElementById("clear-completed");
const notificationContainer = document.getElementById("notification-container");

document.addEventListener("DOMContentLoaded", showTasks); // Load tasks on page load

document.getElementById("task-form").addEventListener("submit", function (e) {
    e.preventDefault();
    addTask();
});

clearCompletedButton.addEventListener("click", clearCompletedTasks);

// Function to add a new task
function addTask() {
    const taskText = inputBox.value.trim();
    const priority = prioritySelect.value;
    const dueDate = dueDateInput.value;

    if (taskText === '') {
        alert("Please enter a task.");
        return;
    }

    // Create task object
    const task = {
        text: taskText,
        priority: priority,
        dueDate: dueDate,
        completed: false
    };

    // Create and append task element
    const li = createTaskElement(task);
    listContainer.appendChild(li);
    clearInputs(); // Clear input boxes
    saveTasks(); // Save tasks to local storage
    showNotification("Task added.");
}

// Function to create an individual task element
function createTaskElement(task) {
    const li = document.createElement("li");
    li.setAttribute("role", "listitem");
    li.classList.add(task.priority.toLowerCase()); // Adds class based on priority
    li.tabIndex = 0;

    // Task text and due date display
    li.innerHTML = `<span>${task.text}</span>`;
    if (task.dueDate) {
        const dateSpan = document.createElement("span");
        dateSpan.classList.add("due-date");
        dateSpan.textContent = ` Due: ${task.dueDate}`;
        li.appendChild(dateSpan);
    }

    // Add completion class if the task is completed
    if (task.completed) {
        li.classList.add("checked");
    }

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.innerHTML = "&times;";
    deleteBtn.setAttribute("aria-label", "Delete task");
    li.appendChild(deleteBtn);

    return li;
}

// Event delegation for task interactions
listContainer.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
        toggleTask(e.target);
    } else if (e.target.classList.contains("delete-btn")) {
        deleteTask(e.target.parentElement);
    }
});

// Function to toggle task completion
function toggleTask(taskElement) {
    taskElement.classList.toggle("checked");
    const taskText = taskElement.querySelector("span").textContent;

    // Update the completed state of the task
    const tasks = getTasks();
    const task = tasks.find(t => t.text === taskText);
    if (task) {
        task.completed = !task.completed; // Toggle completion status
        saveTasks(tasks); // Update local storage
    }

    showNotification("Task marked as " + (taskElement.classList.contains("checked") ? "completed" : "incomplete"));
}

// Function to delete a task
function deleteTask(taskElement) {
    const taskText = taskElement.querySelector("span").textContent;
    taskElement.remove();

    const tasks = getTasks();
    const updatedTasks = tasks.filter(t => t.text !== taskText); // Remove task from the array
    saveTasks(updatedTasks); // Update local storage
    showNotification("Task deleted.");
}

// Function to clear all completed tasks
function clearCompletedTasks() {
    const completedTasks = document.querySelectorAll(".checked");
    completedTasks.forEach(task => {
        const taskText = task.querySelector("span").textContent;
        task.remove();
        // Remove completed tasks from local storage
        const tasks = getTasks();
        const updatedTasks = tasks.filter(t => t.text !== taskText);
        saveTasks(updatedTasks);
    });
    showNotification("Cleared completed tasks.");
}

// Save tasks to local storage
function saveTasks(tasks = getTasks()) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from local storage
function showTasks() {
    const savedTasks = getTasks();
    savedTasks.forEach(task => {
        const li = createTaskElement(task);
        listContainer.appendChild(li);
    });
}

// Retrieve tasks from local storage
function getTasks() {
    const tasksJSON = localStorage.getItem("tasks");
    return tasksJSON ? JSON.parse(tasksJSON) : []; // Parse tasks or return empty array
}

// Function to clear input fields
function clearInputs() {
    inputBox.value = ""; // Clear input box
    dueDateInput.value = ""; // Clear date input
}

// Function to show notifications
function showNotification(message) {
    notificationContainer.textContent = message;
    notificationContainer.classList.add("show");

    // Hide notification after 2 seconds
    setTimeout(() => {
        notificationContainer.classList.remove("show");
    }, 2000);
}