const UNCOMPLETED_LIST_TASK_ID = "incompleteTaskshelfList";
const COMPLETED_LIST_TASK_ID = "completeTaskshelfList";
const TASK_ITEMID = "itemId";

function makeTask(Title, Author, EndDate, EndTime, isCompleted) {

    const taskTitle = document.createElement("h3");
    taskTitle.innerText = Title;

    const taskAuthor = document.createElement("p");
    taskAuthor.innerText = Author;

    const taskEndDate = document.createElement("p");
    taskEndDate.innerText = EndDate;
    
    const taskEndTime = document.createElement("p");
    taskEndTime.innerText = EndTime;

    const action = document.createElement("div");
    action.classList.add("action");

    const container = document.createElement("article");
    container.classList.add("task_item");
    container.append(taskTitle, taskAuthor, taskEndDate, taskEndTime, action);
    
    if(isCompleted == false){
        action.append(
            createGreenUnreadButton(),
            createRedButton()
        );
    } else {
        action.append(
            createGreenReadButton(),
            createRedButton()
        );
    }

    return container;
}

function createRedButton() {
    return createButton("red", function(event){
        removeTaskFromCompleted(event.target.parentElement.parentElement);
    });
}

function createGreenUnreadButton() {
    return createButton("green-unread", function(event){
        addTaskToCompleted(event.target.parentElement.parentElement);
    });
}

function createGreenReadButton() {
    return createButton("green-read", function(event){
        addTaskToUncompleted(event.target.parentElement.parentElement);
    });
}

function createButton(buttonTypeClass, eventListener) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    if (button.classList == "green-unread"){
        button.innerText = "Selesai dikerjakan";
    } else if (button.classList == "green-read") {
        button.innerText = "Belum Selesai dikerjakan";
    } else {
        button.innerText = "Hapus Tugas";
    }
    button.addEventListener("click", function (event) {
        eventListener(event);
    });
    return button;
}

function addTask() {
    const uncompletedTaskKList = document.getElementById(UNCOMPLETED_LIST_TASK_ID);
    const completedTaskKList = document.getElementById(COMPLETED_LIST_TASK_ID);
    const textTitle = document.getElementById("inputTaskTitle").value;
    const textAuthor = document.getElementById("inputTaskAuthor").value;
    const taskEndDate = document.getElementById("inputTaskEndDate").value;
    const taskEndTime = document.getElementById("inputTaskEndTime").value;
    const check = document.getElementById("inputTaskIsComplete").checked;
    
    let task;
    let taskObject;
    if (check == false){
        task = makeTask(textTitle, textAuthor, taskEndDate, taskEndTime, false);
        taskObject = composeTaskObject(textTitle, textAuthor, taskEndDate, taskEndTime, false);
        
        task[TASK_ITEMID] = taskObject.id;
        tasks.push(taskObject);

        uncompletedTaskKList.append(task);
        updateDataToStorage();
    }else{
        task = makeTask(textTitle, textAuthor, taskEndDate, taskEndTime, true);
        taskObject = composeTaskObject(textTitle, textAuthor, taskEndDate, taskEndTime, true);
        
        task[TASK_ITEMID] = taskObject.id;
        tasks.push(taskObject);

        completedTaskKList.append(task);
        updateDataToStorage();
    }
}

function addTaskToCompleted(taskElement) {
    const listCompleted = document.getElementById(COMPLETED_LIST_TASK_ID);
    const taskTitle = taskElement.querySelector("h3").innerText;
    const taskAuthor = taskElement.querySelector("p").innerText;
    const taskEndDate = taskElement.querySelector("p:nth-child(3)").innerText;
    const taskEndTime = taskElement.querySelector("p:nth-child(4)").innerText;
  
    const newTask = makeTask(taskTitle, taskAuthor, taskEndDate, taskEndTime, true);
    const task = findTask(taskElement[TASK_ITEMID]);
    task.isCompleted = true;
    newTask[TASK_ITEMID] = task.id;
  
    listCompleted.append(newTask);
    taskElement.remove();
  
    updateDataToStorage();
}

function addTaskToUncompleted(taskElement) {
    const listUncompleted = document.getElementById(UNCOMPLETED_LIST_TASK_ID);
    const taskTitle = taskElement.querySelector("h3").innerText;
    const taskAuthor = taskElement.querySelector("p").innerText;
    const taskEndDate = taskElement.querySelector("p:nth-child(3)").innerText;
    const taskEndTime = taskElement.querySelector("p:nth-child(4)").innerText;
    
    const newTask = makeTask(taskTitle, taskAuthor, taskEndDate, taskEndTime, false);
    const task = findTask(taskElement[TASK_ITEMID]);
    task.isCompleted = false;
    newTask[TASK_ITEMID] = task.id;
  
    listUncompleted.append(newTask);
    taskElement.remove();
    
    updateDataToStorage();
}

function removeTaskFromCompleted(taskElement) {
 
    const taskPosition = findTaskIndex(taskElement[TASK_ITEMID]);
    tasks.splice(taskPosition, 1);
  
    taskElement.remove();
    updateDataToStorage();
}