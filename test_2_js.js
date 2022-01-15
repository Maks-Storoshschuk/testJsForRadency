let addButton = document.getElementById('add-baton');
let addName = document.getElementById('name');
let addCategory = document.getElementById('category');
let addContent = document.getElementById('content');
let addDate = document.getElementById('date');
let showFormButton = document.getElementById('showForm');
let showArchiveButton = document.getElementById('showArchive');
let form = document.getElementById('input');
let archiveDiv = document.getElementById('archive');

let list = [
    {name: 'магазин', created: '2022-01-13', category: '2', content: 'купити молоко і зубну пасту', date: '2022-02-05'},
    {name: 'день народження', created: '2022-01-14', category: '3', content: 'підготувати поляну', date: '2022-01-23'},
    {name: 'уроки англійської', created: '2022-01-14', category: '1', content: 'підготуватись до співбесіди', date: '2022-01-17'},
    {name: 'рибка', created: '2022-01-15', category: '2', content: 'купити корм і компресор', date: '2022-01-17'},
    {name: 'день народження дівчини', created: '2022-01-15', category: '2', content: 'купити подарунок', date: '2022-04-08'},
    {name: 'мтоцикл', created: '2022-01-17', category: '3', content: 'підготувати мотоцикл до сезону', date: '2022-03-01'},
    {name: 'зустріч однокласників', created: '2022-01-15', category: '2', content: 'не напитись', date: '2022-06-03'},
];
let archivedList = [
    {name: 'зразок', created: '2022-01-14', category: '2', content: 'зробити стилізацію', date: '2022-01-01'}
];

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
    list.push(object);

    refresh();
    e.preventDefault();
})

let pictures = ['pic/task.png', 'pic/images.png', 'pic/idea.jfif', 'Task', 'Random Though', 'Idea'];

function refresh() {
    let write = '';
    let activeTaskCount = 0;
    let activeRandomCount = 0;
    let activeIdeaCount = 0;
    list.forEach((element) => {
        write += `
             <div class='notes d-flex' >
                <img id='categoryPic' src='${pictures[element.category - 1]}' alt='${pictures[element.category - 1 + 3]}'>
                <p class='name'>${element.name}</p>
                <p class='created'>${element.created}</p>
                <p class='category'>${pictures[element.category - 1 + 3]}</p>
                <p class='content'>${element.content}</p>
                <p class='date'>${element.date}</p>
                <button id='${list.indexOf(element)}' onclick='editObject(this.id)'><img src='pic/edit.png' alt='edit'></button>
                <button id='${list.indexOf(element)}' onclick='archiveObject(this.id)'><img src='pic/archive.jpg' alt='archive'></button>
                <button id='${list.indexOf(element)}' onclick='deleteObject(this.id)'><img src='pic/delete.png' alt='delete'></button>
             </div>`
        switch (element.category) {
            case '1':
                activeTaskCount = activeTaskCount + 1;
                break;
            case '2':
                activeRandomCount = activeRandomCount + 1;
                break;
            case '3':
                activeIdeaCount = activeIdeaCount + 1;
                break;
        }
    });
    let archivedTaskCount = 0;
    let archivedRandomCount = 0;
    let archivedIdeaCount = 0;
    for (const archived of archivedList) {
        switch (archived.category) {
            case '1':
                archivedTaskCount = archivedTaskCount + 1;
                break;
            case '2':
                archivedRandomCount = archivedRandomCount + 1;
                break;
            case '3':
                archivedIdeaCount = archivedIdeaCount + 1;
                break;
        }
    }

    let docWrite = document.getElementById('list');

    docWrite.innerHTML = write;
    document.getElementById('ActiveTask').innerText = activeTaskCount.toString();
    document.getElementById('ArchivedTask').innerText = archivedTaskCount.toString();
    document.getElementById('ActiveRandom').innerText = activeRandomCount.toString();
    document.getElementById('ArchivedRandom').innerText = archivedRandomCount.toString();
    document.getElementById('ActiveIdea').innerText = activeIdeaCount.toString();
    document.getElementById('ArchivedIdea').innerText = archivedIdeaCount.toString();
}

function deleteObject(index) {
    list.splice(index, 1);
    refresh();
}

archiveDiv.className = 'hide';

function archiveObject(index) {
    let archiveObject = list.splice(index, 1);
    archivedList.push(...archiveObject);
    refresh();
    archiveDiv.className = 'hide';
}

function editObject(id) {
        addName.value = list[id].name;
        addCategory.value = list[id].category;
        addContent.value = list[id].content;
        addDate.value = list[id].date;
    list.splice(id, 1);
    form.className = 'show';
    refresh();
}

showFormButton.addEventListener('click', (e) => {
    if (form.className === 'hide') {
        form.className = 'show';
    } else form.className = 'hide';
})

showArchiveButton.addEventListener('click', (e) => {
    let archive = ''
    if (archiveDiv.className === 'hide') {
        archiveDiv.className = 'show';
    } else archiveDiv.className = 'hide';
    archivedList.forEach((element) => {
        archive += `
             <div class='d-flex' id='archiveOne' >
                <p class='name'>${element.name}</p>
                <p class='created'>${element.created}</p>
                <button id='${archivedList.indexOf(element)}' onclick='unArchiveObject(this.id)'><img src='pic/unArchived.png' alt='UnArchive'></button>
                <button id='${archivedList.indexOf(element)}' onclick='deleteObjectArchive(this.id)'><img src='pic/delete.png' alt='delete'></button>
             </div>`
    });
    document.getElementById('archive').innerHTML = archive;
})

function deleteObjectArchive(index) {
    archivedList.splice(index, 1);
    archiveDiv.className = 'hide';
    showArchiveButton.click();
    refresh()
}

function unArchiveObject(index) {
    let unArchiveObject = archivedList.splice(index, 1);
    list.push(...unArchiveObject);
    refresh();
    archiveDiv.className = 'hide';
    showArchiveButton.click();
}

refresh();

