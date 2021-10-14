const STORAGE_KEY = "TODOLIST_APPS";
 
let tasks = [];

//cek apakah ada local storage
function isStorageExist() {
    if(typeof(Storage) === undefined){
        alert("Browser tidak mendukung local storage");
        return false;
    }
    return true;
}

function saveData() {
    const parsed = JSON.stringify(tasks);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event("ondatasaved"));
}

function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    
    let data = JSON.parse(serializedData);
    
    if(data !== null)
        tasks = data;
  
    document.dispatchEvent(new Event("ondataloaded"));
}

function updateDataToStorage() {
   if(isStorageExist())
       saveData();
}

function composeTaskObject(taskTitle, taskAuthor, taskEndDate, taskEndTime, isCompleted) {
    return {
        id: +new Date(),
        taskTitle,
        taskAuthor,
        taskEndDate,
        taskEndTime,
        isCompleted
    };
}

function findTask(taskId) {
    for(task of tasks){
        if(task.id === taskId)
            return task;
    }
    return null;
}

function findTaskIndex(taskId) {
    let index = 0
    for (task of tasks) {
        if(task.id === taskId)
            return index;
  
        index++;
    }
  
    return -1;
}

function refreshDataFromTasks() {
    const listUncompleted = document.getElementById(UNCOMPLETED_LIST_TASK_ID);
    let listCompleted = document.getElementById(COMPLETED_LIST_TASK_ID);
 
    for(task of tasks){
        const newTask = makeTask(task.taskTitle, task.taskAuthor, task.taskYear, task.isCompleted);
        newTask[TASK_ITEMID] = task.id;
 
        if(task.isCompleted){
            listCompleted.append(newTask);
        } else {
            listUncompleted.append(newTask);
        }
    }
}