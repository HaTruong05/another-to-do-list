import "./styles.css";

lucide.createIcons();


// const addTaskButton = document.getElementById('new-task');
// const content = document.getElementById('content');
// addTaskButton.addEventListener('click', () => {
//     content.innerHTML = '';
//     const taskTitle = document.createElement('h1');
    

// })

// Buttons
const save = document.getElementById('save');
const del = document.getElementById('delete');

// Info fields
const date = document.getElementById('date');
const important = document.getElementById('important');
const title = document.getElementById('title');
const description = document.getElementById('description');
const notes = document.getElementById('notes');

const taskContent = {
    date,
    important,
    title,
    description,
    notes,
    projectID: '',
}

/**
 * Initialize memory to keep track of projects in 
 * our worksapce
 */
function initProjectIdList() {
    localStorage.setItem('projectIDs', JSON.stringify([]));
}

// initProjectIdList();

/**
 * Add new task to memory and return the task's id
 */
function newTask(projectID) {
    // New task has no content when initialized
    const newTaskID = crypto.randomUUID();
    const newTask = {
        projectID: projectID,
    }

    localStorage.setItem(newTaskID, JSON.stringify(newTask));
    return newTaskID;
}

/**
 * Add new project to memory, comes with a new task
 * by default
 */
function newProject(projectName) {
    const newProjectID = crypto.randomUUID();
    const newTaskID = newTask(newProjectID);

    const newProject = {
        name: projectName,
        taskIDs: [newTaskID],
    }
    localStorage.setItem(newProjectID, JSON.stringify(newProject));
    
    const projectIDs = JSON.parse(localStorage.getItem('projectIDs'));
    projectIDs.push(newProjectID);
    localStorage.setItem('projectIDs', JSON.stringify(projectIDs));
}

// newProject('To do');

/**
 * Add new task to an existing project
 */
function newTaskInProject(projectID) {
    const newTaskID = newTask(projectID);
    const project = JSON.parse(localStorage.getItem(projectID));

    project.taskIDs.push(newTaskID);
    localStorage.setItem(projectID, JSON.stringify(project));
}

// newTaskInProject("8662b284-36dc-493d-ab8c-909c269071ec");


/**
 * Update the opened note's content stored in memory
 */
function saveCurrentTask(taskID, taskContent) {
    const newTask = {
        dueDate: taskContent.date.value,
        important: taskContent.important.checked,
        taskTitle: taskContent.title.value,
        description: taskContent.description.value,
        notes: taskContent.notes.value,
    }

    localStorage.setItem(taskID, JSON.stringify(newTask));
}

// saveCurrentTask("ce213faf-cb3e-4f3e-8c77-3bff7604f52e", taskContent);

function retrieveTask(taskID) {
    const task = localStorage.getItem(taskID);
    if (!task) {
        return {
            dueDate: '',
            important: false,
            taskTitle: '',
            description: '',
            notes: '',
        }
    }
    return JSON.parse(task);
}

// console.log(retrieveTask("8662b284-36dc-493d-ab8c-909c269071ec"));
// console.log(retrieveTask("f439cc96-2bf6-4a9c-88a6-16a00f85d781"));
// console.log(retrieveTask("ads-36dc-493d-ab8c-909c269071ec"));

function deleteTask(taskID) {
    // Remove task from associated project's task id list
    const task = JSON.parse(localStorage.getItem(taskID));
    const projectID = task.projectID;
    const project = JSON.parse(localStorage.getItem(projectID));
    const taskIDs = project.taskIDs;

    const taskIDIdx = taskIDs.indexOf(taskID);
    if (taskIDIdx !== -1) {
        project.taskIDs = taskIDs.splice(taskIDIdx, 1);
        localStorage.setItem(projectID, JSON.stringify(project));
    }

    localStorage.removeItem(taskID);
}

function deleteProject(projectID) {
    // Remove project ID from list of project IDs
    let projectIDs = JSON.parse(localStorage.getItem('projectIDs'));
    const projectIDIdx = projectIDs.indexOf(projectID);
    if (projectIDIdx !== -1) {
        projectIDs = projectIDs.splice(projectIDIdx, 1);
        localStorage.setItem('projectIDs', JSON.stringify(rojectIDs));
    }

    // Remove all tasks associated with this project from memory
    const project = JSON.parse(localStorage.getItem(projectID));
    project.taskIDs.forEach(taskID => {
        localStorage.removeItem(taskID);
    });

    localStorage.removeItem(projectID);
}