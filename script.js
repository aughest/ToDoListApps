document.addEventListener("DOMContentLoaded", function () {

    const submitForm = document.getElementById("inputTask");
  
    submitForm.addEventListener("submit", function (event) {
        event.preventDefault();
        addTask();
    });
  
    if(isStorageExist()){
        loadDataFromStorage();
    }
});

document.addEventListener("ondataloaded", () => {
    refreshDataFromTasks();
});

const searchSubmit = document.getElementById("searchTask");

searchTask.addEventListener("submit", function searchTask() {
    let inputTitle, i, article, searchTitle, title;
    inputTitle = document.getElementById('searchTaskTitle').value.toUpperCase();
    articleUnread = document.getElementById("incompleteTaskshelfList").getElementsByTagName("article");
    articleRead = document.getElementById("completeTaskshelfList").getElementsByTagName("article");

    for (i = 0; i < articleUnread.length; i++) {
        title = articleUnread[i].getElementsByTagName("h3")[0];
        searchTitle = title.textContent || title.innerText;

        if (searchTitle.toUpperCase().indexOf(inputTitle) > -1) {
            articleUnread[i].style.display = "block";
        } else {
            articleUnread[i].style.display = "none";
        }
    }

    for (i = 0; i < articleRead.length; i++) {
        title = articleRead[i].getElementsByTagName("h3")[0];
        searchTitle = title.textContent || title.innerText;

        if (searchTitle.toUpperCase().indexOf(inputTitle) > -1) {
            articleRead[i].style.display = "block";
        } else {
            articleRead[i].style.display = "none";
        }
    }
});

