const input = document.getElementById("input")
const btn = document.getElementById("btn")
const delete__item = document.getElementById("delete")
const count = document.getElementById("count")
const orderList = document.getElementById("orderList")

let arr = JSON.parse(localStorage.getItem("tasks")) || []

document.addEventListener("DOMContentLoaded", (event)=> {
    btn.addEventListener("click", addTask)
    delete__item.addEventListener("click", delFunc) 
    input.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            addTask()
        }else if (event.key === "Delete") {
            delFunc()
        }
    })
    updateList()
} )


function addTask() {
    let inputValue = input.value.trim()
    if (inputValue !== "") {
        arr.push({name: inputValue, disabled: false, editing: false})
        input.value = ""
        updateList()
        saveToLocalStorage()
    }
    count.innerText = arr.length
     
}

// btn.addEventListener("click", () => {
  
// })

function updateList() {
    orderList.innerHTML = ""
    arr.forEach((item, index) => {
        let li = document.createElement("li")
        // li.textContent = item.name
        if (item.editing) { // YANGI KOD
            li.innerHTML = ` 
                <div class="d-flex gap-1 align-items-center">
                    <input type="text" class="edit-input" value="${item.name}"> 
                    <button class="save-btn btn btn-success my-2">Save</button>
                </div>`
            li.querySelector(".save-btn").addEventListener("click", function() {
                saveEdit(index, li.querySelector(".edit-input").value) // YANGI KOD
            })
        }else {
            li.innerHTML = `<div class="d-flex gap-1 align-items-center">
            <input type="checkbox" class="todo-checkbox "  ${item.disabled ? "checked" : ""}></input>
            <span class="${item.disabled ? "disabled" : ""}">${item.name}</span>
             <button class="edit-btn btn btn-primary my-1 mx-5">Edit</button>
            </div>`
            li.querySelector(".edit-btn").addEventListener("click", function() { // YANGI KOD
                editTask(index) // YANGI KOD
            })
            li.querySelector(".todo-checkbox").addEventListener("change", function() {
                toggleTask(index)
            } )

        }    
        orderList.appendChild(li)
    });
    count.innerText = arr.length
}

function saveToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(arr))
}


function delFunc() {
    arr = []
    saveToLocalStorage()
    updateList()
}


function toggleTask(index) {
    arr[index].disabled = !arr[index].disabled
    saveToLocalStorage()
    updateList()
}

function editTask(index) { // YANGI KOD
    arr[index].editing = true // YANGI KOD
    updateList() // YANGI KOD
}


function saveEdit(index, newValue) { // YANGI KOD
    arr[index].name = newValue // YANGI KOD
    arr[index].editing = false // YANGI KOD
    saveToLocalStorage() // YANGI KOD
    updateList() // YANGI KOD
}