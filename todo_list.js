function addTask (description, dueTime) {
    // Create new task
    const newtask = document.createElement("li");
    newtask.textContent = description;
    
    if (dueTime) {
        // Add Span
        const span = document.createElement("span");
        span.classList.add("due");
        const date = new Date(dueTime);
        span.textContent = "due " + date.toLocaleDateString() + " " + date.toLocaleTimeString();
        newtask.append(span);
    }
    // Add button
    const button = document.createElement("button");
    button.className = "btn btn-sm btn-outline-danger done";
    button.type = "button";
    button.textContent = "Done";
    newtask.append(button);
    // Add event listener for removing done tasks
    button.addEventListener("click", () => {
        newtask.remove();
    })

    // Add new task to the list
    const taskList = document.querySelector("ul#task_list");
    taskList.append(newtask);
}

addTask("Buy milk");
addTask("Buy bread", Date.now());

function addTaskFromInput () {
    const descriptionInput = document.querySelector("input#task_description_input");
    const dueDateInputElement = document.querySelector("input#duedate_input");
    const dueTimeInputElement = document.querySelector("input#duetime_input");
    const timestamp = dateAndTimeToTimestamp(dueDateInputElement, dueTimeInputElement);
    addTask(descriptionInput.value, timestamp);

    // Clear input elements after adding the task
    descriptionInput.value = "";
    dueDateInputElement.value = "";
    // dueTimeInputElement.value = "";   
}

// Event Listener for Add Button
document.getElementById("add_task").addEventListener('click', (event) => {
    addTaskFromInput();
})

// Event Listener for Keyboard shortcut
document.querySelector('#task_description_input').addEventListener('keydown', (event) => {
    if(event.key == "Enter") {
        addTaskFromInput();
    }
})

function dateAndTimeToTimestamp(dateInputElement, timeInputElement) {
    const dueDate = dateInputElement.valueAsNumber; // Returns the timestamp at midnight for the given date
    const dueTime = timeInputElement.valueAsNumber; // Returns the number of milliseconds from midnight to the time

    if(dueDate && dueTime) { // The user specified both a due date & due time
        //Add the timezone offset to account for the fact that timestamps are specified by UTC
        const timezoneOffset =  (new Date()).getTimezoneOffset() * 60 * 1000;
        return dueDate + dueTime + timezoneOffset;
    } else {
        // if the user did not specify both a due date and due time, return false
        return false;
    }
}