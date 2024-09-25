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
darkModeSwitch.addEventListener('change', function() {
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
  
      // Function to toggle the custom date picker
      function toggleCustomDatePicker() {
        const customDatePicker = document.getElementById('customDatePicker');
        if (customDatePicker.style.display === 'flex') {
          customDatePicker.style.display = 'none';
        } else {
          customDatePicker.style.display = 'flex';
        }
      }
  
      // Function to update the date display based on user input
      function updateDateDisplay() {
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;
        document.getElementById('startDateDisplay').textContent = formatDate(startDate);
        document.getElementById('endDateDisplay').textContent = formatDate(endDate);
      }
  
      // Helper function to format date
      function formatDate(dateString) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
      }