let addButton = document.getElementById('add-baton');
let addName = document.getElementById('name');
let addCategory = document.getElementById('category');
let addContent = document.getElementById('content');
let addDate = document.getElementById('date');
let showFormButton = document.getElementById('showForm');
let showArchiveButton = document.getElementById('showArchive');
let form = document.getElementById('input');

let list = [{name: 'hggyfu iugi', created: '2022-01-13', category: '2', content: 'e', date: '2022-01-05'}];
let archivedList = [];

addButton.addEventListener('click', (e) => {
    if (addName.value === '' || addCategory.value === '' || addContent.value === '' || addDate.value === '') {
        return alert('Someone field is empty!(');
    }
    let maxDate = new Date(Date.now());
    let isoDate = maxDate.toISOString();
    let date = isoDate.substr(0, 10);
    let object = {
        name: addName.value,
        created: date,
        category: addCategory.value,
        content: addContent.value,
        date: addDate.value,
    }

    list.push(object)

    refresh();
    e.preventDefault()
})

let pictures = ["pic/task.png", "pic/images.png", "pic/idea.jfif", "Task", "Random Though", "Idea"];

function refresh() {
    let write = '';
    let activeTaskCount = 0;
    let activeRandomCount = 0;
    let activeIdeaCount = 0;
    list.forEach((element) => {
        write += `
             <div class="notes d-flex" >
                <img src="${pictures[element.category - 1]}" alt="${pictures[element.category - 1 + 3]}">
                <p class="name">${element.name}</p>
                <p class="created">${element.created}</p>
                <p class="category">${pictures[element.category - 1 + 3]}</p>
                <p class="content">${element.content}</p>
                <p class="date">${element.date}</p>
                <button id="${list.indexOf(element)}" onclick="editObject(this.id)"><img src="pic/edit.png" alt="edit"></button>
                <button id="${list.indexOf(element)}" onclick="archiveObject(this.id)"><img src="pic/archive.jpg" alt="archive"></button>
                <button id="${list.indexOf(element)}" onclick="deleteObject(this.id)"><img src="pic/delete.png" alt="delete"></button>
             </div>`
        switch (element.category) {
            case "1":
                activeTaskCount = activeTaskCount + 1;
                break;
            case "2":
                activeRandomCount = activeRandomCount + 1;
                break;
            case "3":
                activeIdeaCount = activeIdeaCount + 1;
                break;
        }
    })
    let archivedTaskCount = 0;
    let archivedRandomCount = 0;
    let archivedIdeaCount = 0
    for (const archived of archivedList) {
        switch (archived.category) {
            case "1":
                archivedTaskCount = archivedTaskCount + 1;
                break;
            case "2":
                archivedRandomCount = archivedRandomCount + 1;
                break;
            case "3":
                archivedIdeaCount = archivedIdeaCount + 1;
                break;
        }
    }

    let docWrite = document.getElementById("list")

    docWrite.innerHTML = write

    let activeTask = document.getElementById('ActiveTask').innerText = activeTaskCount;
    let archiveTask = document.getElementById('ArchivedTask').innerText = archivedTaskCount;
    let activeRandom = document.getElementById('ActiveRandom').innerText = activeRandomCount;
    let archiveRandom = document.getElementById('ArchivedRandom').innerText = archivedRandomCount;
    let activeIdea = document.getElementById('ActiveIdea').innerText = activeIdeaCount;
    let archiveIdea = document.getElementById('ArchivedIdea').innerText = archivedIdeaCount;

}

function deleteObject(index) {
    list.splice(index, 1);
    refresh()
}

function archiveObject(index) {
    let archiveObject = list.splice(index, 1)
    archivedList.push(...archiveObject);
    refresh()
}

function editObject(index) {
    list.findIndex((element, index) => {
        addName.value = element.name;
        addCategory.value = element.category;
        addContent.value = element.content;
        addDate.value = element.date;
    });
    list.splice(index, 1);
    form.className = 'show'
    refresh();
}

showFormButton.addEventListener('click', (e) => {
    if (form.className === 'hide') {
        form.className = 'show'
    } else form.className = 'hide';
})

showArchiveButton.addEventListener('click', (e) => {
    let archive = ''
    archivedList.forEach((element) => {
        archive += `
             <div class="archive d-flex" >
                <p class="name">${element.name}</p>
                <p class="created">${element.created}</p>
                <button id="${archivedList.indexOf(element)}" onclick="unArchiveObject(this.id)"><img src="pic/archive.jpg" alt="UnArchive"></button>
                <button id="${archivedList.indexOf(element)}" onclick="deleteObjectArchive(this.id)"><img src="pic/delete.png" alt="delete"></button>
             </div>`
    })
    document.getElementById('archive').innerHTML = archive
})

function deleteObjectArchive(index) {
    archivedList.splice(index, 1);
    showArchiveButton.click()
}

function unArchiveObject(index) {
    let unArchiveObject = archivedList.splice(index, 1)
    list.push(...unArchiveObject);
    refresh();
    showArchiveButton.click()
}

refresh();

