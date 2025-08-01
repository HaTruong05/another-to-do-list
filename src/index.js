import "./styles.css";

lucide.createIcons();


const addTaskButton = document.getElementById('new-task');
const content = document.getElementById('content');
addTaskButton.addEventListener('click', () => {
    content.innerHTML = '';
    const taskTitle = document.createElement('h1');
    

})