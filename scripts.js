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
    idValue += 1
    itemList.push({
        isTitle: false,
        id: idValue,
        name: addItemsName.value,
        price: addItemsPrice.value,
        halfprice: addItemsHalf.value,
        discription: addItemsDisc.value
    })
    toHtml()
}
//add title
function addTitleAction() {
    idValue += 1
    itemList.push({
        isTitle: true,
        id: idValue,
        name: addTitleName.value,
        price: "none",
        halfprice: "none",
        discription:"none"
    })
    toHtml()
}



function toHtml(){
    let parent = document.getElementById("pageContent")
    parent.innerHTML = ""
    itemList.forEach(el => {
        if(el.isTitle === false)
        {
            let wrapperDiv = document.createElement("div")
            wrapperDiv.setAttribute("id", "item")
            let title = document.createElement("h4")
            title.setAttribute("id", "title")
            title.innerHTML = `${el.id}. ${el.name}`
            let prijs = document.createElement("h4")
            prijs.setAttribute("id", "prijs")
            prijs.innerHTML = `€${el.price}`
            let halfprijs = document.createElement("h4")
            halfprijs.setAttribute("id", "prijshalf")
            if(el.halfprice === "")
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
            let title = document.createElement("h3")
            title.innerHTML = `${el.id}. ${el.name}`
            parent.appendChild(title)
        }
    });
}

addTitleBtn.onclick = pressAddTitle
addItemsBtn.onclick = pressAddItems
removeBtn.onclick = pressRemove
addItemsAdd.onclick = addItemsAction
addTitleAdd.onclick = addTitleAction

