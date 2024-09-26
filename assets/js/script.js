const darkModeSwitch = document.getElementById('darkModeSwitch');
const body = document.body;
const modeText = document.getElementById('modeText');

// Check localStorage for saved theme preference
if (localStorage.getItem('theme') === 'dark') {
    body.classList.replace('light-mode', 'dark-mode');
    darkModeSwitch.checked = true;
    modeText.textContent = 'Dark Mode';
}

// Toggle between dark mode and light mode
darkModeSwitch.addEventListener('change', function () {
    if (this.checked) {
        body.classList.replace('light-mode', 'dark-mode');
        localStorage.setItem('theme', 'dark');
        modeText.textContent = 'Dark Mode';
    } else {
        body.classList.replace('dark-mode', 'light-mode');
        localStorage.setItem('theme', 'light');
        modeText.textContent = 'Light Mode';
    }
});

// Function to toggle the "More" menu on mobile
function toggleMoreMenu() {
    const moreMenuDropdown = document.getElementById('moreMenuDropdown');
    if (moreMenuDropdown.style.display === 'none' || moreMenuDropdown.style.display === '') {
        moreMenuDropdown.style.display = 'flex';  // Show the menu in column format
    } else {
        moreMenuDropdown.style.display = 'none';  // Hide the menu
    }
};

// Sample data for different date ranges
const data = {
    today: { overdue: 2, pending: 3, inProgress: 1, completed: 5, inTime: 4, delayed: 1 },
    yesterday: { overdue: 0, pending: 2, inProgress: 2, completed: 3, inTime: 2, delayed: 0 },
    thisWeek: { overdue: 5, pending: 6, inProgress: 4, completed: 8, inTime: 7, delayed: 2 },
    lastWeek: { overdue: 1, pending: 1, inProgress: 0, completed: 5, inTime: 4, delayed: 0 },
    thisMonth: { overdue: 8, pending: 9, inProgress: 7, completed: 15, inTime: 12, delayed: 3 },
    lastMonth: { overdue: 3, pending: 2, inProgress: 1, completed: 7, inTime: 5, delayed: 1 },
    thisYear: { overdue: 20, pending: 18, inProgress: 12, completed: 50, inTime: 45, delayed: 5 },
    allTime: { overdue: 40, pending: 35, inProgress: 25, completed: 100, inTime: 85, delayed: 15 },
    custom: { overdue: 0, pending: 0, inProgress: 0, completed: 0, inTime: 0, delayed: 0 }
};

// Update the status data
function updateData(filter) {
    document.getElementById('overdueCount').textContent = data[filter].overdue;
    document.getElementById('pendingCount').textContent = data[filter].pending;
    document.getElementById('inProgressCount').textContent = data[filter].inProgress;
    document.getElementById('completedCount').textContent = data[filter].completed;
    document.getElementById('inTimeCount').textContent = data[filter].inTime;
    document.getElementById('delayedCount').textContent = data[filter].delayed;

    // Highlight the active button
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(button => button.classList.remove('active-btn'));
    event.target.classList.add('active-btn');
}


// Default priority selection
let selectedPriority = 'High'; // Default priority

// Priority button selection logic
document.querySelectorAll('.priority-btn').forEach(anchor => {
    anchor.addEventListener('click', function (event) {
        event.preventDefault();
        selectedPriority = this.getAttribute('data-priority');
        // Highlight selected priority
        document.querySelectorAll('.priority-btn').forEach(a => a.classList.remove('active'));
        this.classList.add('active');
    });
});

// Save task to local storage and display
function saveTask() {
    const taskTitle = document.getElementById('taskTitle').value;
    const taskDescription = document.getElementById('taskDescription').value;
    const selectedUser = document.getElementById('selectUsers').value;
    const selectedCategory = document.getElementById('selectCategory').value;
    const dueDate = document.getElementById('dueDate').value;
    const repeatTask = document.getElementById('repeatTask').checked;

    const task = {
        taskTitle: taskTitle,
        taskDescription: taskDescription,
        selectedUser: selectedUser,
        selectedCategory: selectedCategory,
        priority: selectedPriority,
        dueDate: dueDate,
        repeatTask: repeatTask
    };

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();

    // Hide modal after task is saved
    const modal = document.getElementById('assignTaskModal');
    const modalInstance = bootstrap.Modal.getInstance(modal);
    modalInstance.hide();
}

// Display tasks in table
function displayTasks(filteredTasks = null) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskTableBody = document.getElementById('taskTableBody');
    taskTableBody.innerHTML = '';

    // If a filter is applied, use filteredTasks, otherwise show all tasks
    const tasksToDisplay = filteredTasks || tasks;

    tasksToDisplay.forEach(task => {
        const row = document.createElement('tr');
        row.innerHTML = `
             <td>${task.taskTitle}</td>
             <td>${task.taskDescription}</td>
             <td>${task.selectedUser}</td>
             <td>${task.selectedCategory}</td>
             <td>${task.priority}</td>
             <td>${task.dueDate}</td>
             <td>${task.repeatTask ? 'Yes' : 'No'}</td>
         `;
        taskTableBody.appendChild(row);
    });
}

// Search tasks
function filterTasks() {
    const searchValue = document.getElementById('searchInput').value.toLowerCase();
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const filteredTasks = tasks.filter(task =>
        task.taskTitle.toLowerCase().includes(searchValue) ||
        task.taskDescription.toLowerCase().includes(searchValue) ||
        task.selectedUser.toLowerCase().includes(searchValue) ||
        task.selectedCategory.toLowerCase().includes(searchValue)
    );
    displayTasks(filteredTasks);
}

// Event listener for search
document.getElementById('searchInput').addEventListener('input', filterTasks);

// Clear search input
document.getElementById('clearButton').addEventListener('click', function () {
    document.getElementById('searchInput').value = '';
    displayTasks(); // Reset to show all tasks
});

// Initial task load
window.onload = displayTasks;

// search
document.getElementById('clearButton').addEventListener('click', function () {
    document.getElementById('searchInput').value = '';
});