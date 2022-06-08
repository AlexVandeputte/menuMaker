window.onload = init
let itemList = []
let idValue = 0
const addItems = document.getElementById("addItems")
const addTitle = document.getElementById("addTitle")
const remove = document.getElementById("remove")
const addTitleBtn = document.getElementById("addTitleBtn")
const addItemsBtn = document.getElementById("addItemsBtn")
const removeBtn = document.getElementById("removeBtn")
const addItemsAdd = document.getElementById("addItemsAdd")
const addItemsName = document.getElementById("addItemsName")
const addItemsPrice = document.getElementById("addItemsPrice")
const addItemsHalf = document.getElementById("addItemsHalf")
const addItemsDisc = document.getElementById("addItemsDiscription")
const addTitleAdd = document.getElementById("addTitleAdd")
const addTitleName = document.getElementById("addTitleName")
const removeId = document.getElementById("removeId")
const removeConfirm  = document.getElementById("removeConfirm") 
const itemPlace = document.getElementById("addItemsPlace")
const titlePlace = document.getElementById("addTitlePlace")
const addTitleDiscription = document.getElementById("addTitleDiscription")
const save = document.getElementById("saveBtn")
const load = document.getElementById("loadBtn")


function init()
{
    addItems.style.display = "none"
    addTitle.style.display = "none"
    remove.style.display = "none"
}

//navbar
function pressAddItems() {
    addItems.style.display = "grid"
    addTitle.style.display = "none"
    remove.style.display = "none"
}
function pressAddTitle() {
    addItems.style.display = "none"
    addTitle.style.display = "grid"
    remove.style.display = "none"
}
function pressRemove() {
    addItems.style.display = "none"
    addTitle.style.display = "none"
    remove.style.display = "grid"
}

//add item
function addItemsAction() {
    let item = {
        isTitle: false,
        id: idValue,
        name: addItemsName.value,
        price: addItemsPrice.value,
        halfprice: addItemsHalf.value,
        discription: addItemsDisc.value,
        titleDiscription: "none"
    }
    if(itemPlace.value === "place" || itemPlace.value === "")
    {
        itemList.push(item)
        idValue += 1
        toHtml(false)
    }
    else
    {
        itemList.splice(itemPlace.value, 0, item )
        idValue = 0
        itemList.forEach(el => {
            el.id = idValue
            idValue += 1
        });
        toHtml(false)
    }
}
//add title
function addTitleAction() {
    let item = {
        isTitle: true,
        id: idValue,
        name: addTitleName.value,
        price: "none",
        halfprice: "none",
        discription:"none",
        titleDiscription: addTitleDiscription.value
    }
    if(titlePlace.value === "place" || titlePlace.value === "")
    {
        itemList.push(item)
        idValue += 1
        toHtml(false)
    }
    else
    {
        itemList.splice(titlePlace.value, 0, item )
        idValue = 0
        itemList.forEach(el => {
            el.id = idValue
            idValue += 1
        });
        toHtml(false)
    }
}
//remove 
function removeConfirmAction() {
    idValue = 0
    let idRemove = removeId.value
    itemList = itemList.filter((el) => ((el.id).toString() !== idRemove))
    itemList.forEach(el => {
        el.id = idValue
        idValue += 1
    });
    toHtml(false)
}



function toHtml(save){
    console.log(itemList)
    let parent = document.getElementById("pageContent")
    parent.innerHTML = ""
    itemList.forEach(el => {
        if(el.isTitle === false)
        {
            let wrapperDiv = document.createElement("div")
            wrapperDiv.setAttribute("id", "item")
            let title = document.createElement("h4")
            title.setAttribute("id", "title")
            title.innerHTML = save === true ? `${el.name}` : `${el.id}. ${el.name}`
            let prijs = document.createElement("h4")
            prijs.setAttribute("id", "prijs")
            prijs.innerHTML = `€${el.price}`
            let halfprijs = document.createElement("h4")
            halfprijs.setAttribute("id", "prijshalf")
            if(el.halfprice === "" || el.halfprice === "1/2 price")
            {
                halfprijs.innerHTML = ""
            }
            else
            {
                halfprijs.innerHTML = `€${el.halfprice}`
            }
            let discription = document.createElement("p")
            discription.setAttribute("id", "discription")
            discription.innerHTML = `${el.discription}`
            wrapperDiv.appendChild(title)
            wrapperDiv.appendChild(prijs)
            wrapperDiv.appendChild(halfprijs)
            wrapperDiv.appendChild(discription)
            parent.appendChild(wrapperDiv)
        }
        if(el.isTitle === true)
        {
            let wrapperDiv = document.createElement("div")
            wrapperDiv.setAttribute("id", "divTitle")
            let title = document.createElement("h3")
            title.innerHTML = save === true ? `${el.name}` : `${el.id}. ${el.name}`
            let discription = document.createElement("p")
            discription.setAttribute("id", "titleDiscription")
            discription.innerHTML = `${el.titleDiscription}`
            wrapperDiv.appendChild(title)
            wrapperDiv.appendChild(discription)
            parent.appendChild(wrapperDiv)
        }
    });
}

// Function to download data to a file
async function saveAction() {
    let name = prompt("geef nummer van pagina")
    let newJson = JSON.stringify(itemList)
    var a = document.createElement("a")
    var file = new Blob([newJson], {type: "JSON"})
    a.href = URL.createObjectURL(file)
    a.download = `${name}.json`
    a.click()
    toHtml(true)
}
//function to load json file
function loadAction() {
    let file = load.files[0]
    if(file)
    {   
        var reader = new FileReader()
        reader.readAsText(file, "UTF-8")
        reader.onload = function (evt) {
            itemList = JSON.parse(evt.target.result)
            toHtml(false)
        }
    }
}


addTitleBtn.onclick = pressAddTitle
addItemsBtn.onclick = pressAddItems
removeBtn.onclick = pressRemove
addItemsAdd.onclick = addItemsAction
addTitleAdd.onclick = addTitleAction
removeConfirm.onclick = removeConfirmAction
save.onclick = saveAction
load.addEventListener("change", loadAction)

//load json file
// const response = await fetch("demo.json")
// if (!response.ok) throw new Error("http error")
// const result = await response.json()
// console.log(result)


