let addButton = document.getElementById('add-baton');
let addName = document.getElementById('name');
// let addCreated = document.getElementById('created');
let addCategory = document.getElementById('category');
let addContent = document.getElementById('content');
let addDate = document.getElementById('date')

let list = [{name: 'hggyfu iugi', date: '2022-01-13', category: '2', content: 'e', detail: '2022-01-05'}];

addButton.addEventListener('click', (e) => {
    if (addName.value === '' || addCategory.value === '' || addContent.value === '' || addDate.value === '') {
        return alert('Someone field is empty!(');
    }
    let maxDate = new Date(Date.now());
    let isoDate = maxDate.toISOString();
    let date = isoDate.substr(0, 10);
    let object = {
        name: addName.value,
        date: date,
        category: addCategory.value,
        content: addContent.value,
        detail: addDate.value,
    }

    list.push(object)
    console.log(list)


    let write = '';

    let pictures = ["pic/task.png","pic/images.png","pic/idea.jfif","Task","Random Though","Idea"];

    list.forEach((element) => {
        write += `
             <div class="notes d-flex" >
                <img src="${pictures[element.category-1]}" alt="${pictures[element.category-1+3]}">
                <p class="name">${element.name}</p>
                <p class="created">${element.date}</p>
                <p class="category">${pictures[element.category-1+3]}</p>
                <p class="content">${element.content}</p>
                <p class="details">${element.detail}</p>
                <button class="edit"><img src="pic/edit.png" alt="edit"></button>
                <button class="archive"><img src="pic/archive.jpg" alt="archive"></button>
                <button class="delete"><img src="pic/delete.png" alt="delete"></button>
             </div>`
    })
    let docWrite =  document.getElementById("list")
    docWrite.innerHTML = write

    e.preventDefault()
})



