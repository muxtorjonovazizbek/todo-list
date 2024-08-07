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
        arr.push({name: inputValue, disabled: false})
        input.value = ""
        updateList()
        saveToLocalStorage()
    }
    count.innerText = arr.length
     
}

function updateList() {
    orderList.innerHTML = ""
    arr.forEach((item, index) => {
        let li = document.createElement("li")
    
       li.innerHTML = `<div class="d-flex gap-1 align-items-center justify-content-between">
       <div>
            <input type="checkbox" class="todo-checkbox w-2"  ${item.disabled ? "checked" : ""}></input>
            <span id="todo-${index}" onclick="editFunc(${index})" class="${item.disabled ? "disabled" : "" } fs-5" >${item.name}</span>
       </div>
        <btn id="delItem-${index}" onclick="delIndex(${index})" class="btn btn-warning my-2 mx-2">del</btn>
       </div>`
       li.querySelector(".todo-checkbox").addEventListener("change", function() {
            toggleTask(index)

       } )
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

function editFunc(index) {
    let input__el = document.getElementById(`todo-${index}`)
    let new__inp =  document.createElement("input")
    input__el.replaceWith(new__inp)
    new__inp.focus()
    new__inp.value = arr[index].name

    new__inp.addEventListener("blur", function () {
        let update__text = new__inp.value
        if (update__text) {
            arr[index].name = update__text
            saveToLocalStorage()
        }
        updateList()
    })

    new__inp.addEventListener("keydown", function (event) {
        if (event.key == "Enter") {
            let update__text = new__inp.value
            if (update__text) {
                arr[index].name = update__text
                saveToLocalStorage()
            }
            updateList()
            
        }
    })


}

function delIndex(index) {
    arr.splice(index,1)
    saveToLocalStorage()
    updateList()
}


const addCounter = document.getElementById("addCounter")
const showBtns = document.getElementById("showBtns")
const card__body = document.getElementById("card__body")

document.addEventListener("DOMContentLoaded", (event) => {
    addCounter.addEventListener("click", addBtns)
})

function addBtns() {
    let div = document.createElement("div")
    div.innerHTML = ` 
    <div class="d-flex gap-2 align-items-center justify-content-center">
        <button id="btnPlus"  class="btnPlus btn btn-secondary fs-3 mb-3">+</button>
        <p id="num" class="num">0</p>
        <button id="btnMinus" class="btnMinus btn btn-secondary fs-3 mb-3 ">−</button>
    </div>`
    card__body.appendChild(div)


    const btnPlus = div.querySelector(".btnPlus")
    const btnMinus = div.querySelector(".btnMinus")
    const num = div.querySelector(".num")

    

    btnPlus.addEventListener("click", ()=> {
        num.innerText = parseInt(num.innerText) + 1
    })

    btnMinus.addEventListener("click", () => {
        num.innerText = parseInt(num.innerText) - 1
    })

}



