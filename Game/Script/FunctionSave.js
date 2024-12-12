function saveInit() {
    let tempStorage = localStorage.getItem(fileName)

    if (tempStorage === null) {
        localStorage.setItem(fileName, JSON.stringify(emptySave))
    }

    varSave = JSON.parse(localStorage.getItem(fileName))
}

function saveData() {
    JSON.setItem(fileName, JSON.stringify(varSave))
}

function loadData() {
    varSave = JSON.parse(localStorage.getItem(fileName))
}


function eraseData() {
    localStorage.setItem(fileName, JSON.stringify(emptySave))
    varSave = JSON.parse(localStorage.getItem(fileName))
}