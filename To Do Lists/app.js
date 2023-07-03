let data = JSON.parse(localStorage.getItem('data')) || [];
data.map(item => createItem(item.text, item.done));

function save(text) {
    let data = JSON.parse(localStorage.getItem('data')) || [];
    data.push({ text, done: false }); //text: text
    localStorage.setItem('data', JSON.stringify(data));
}

function remove(text) {
    let data = JSON.parse(localStorage.getItem('data')) || [];

    let update = JSON.filter(item => item.text != text);
    localStorage.setItem('data', JSON.stringify(update));
}

function markDone(text) {
    let data = JSON.parse(localStorage.getItem('data')) || [];

    let update = data.map(item => {
        if (item.text == text) item.done = true;
        return item;
    });

    localStorage.setItem('data', JSON.stringify(update));
}

function clear() {
    let data = JSON.parse(localStorage.getItem('data')) || [];

    let update = data.filter(item => !item.done);
    localStorage.setItem('data', JSON.stringify(update));
}

document.querySelector("#clear").onclick = function () {
    document.querySelector("#done").innerHTML = "";
    clear();
}

function updateCount() {
    document.querySelector(".badge").textContent =
        document.querySelectorAll("#todo li").length;
}

document.querySelector("button").onclick = function () {
    let text = document.querySelector("input").value;
    if (!text) return (false);
    createItem(text);
    save(text);
    document.querySelector("input").value = "";
    document.querySelector("input").focus();
}

document.querySelector("input").onkeydown = function (e) {
    if (e.key == "Enter") {
        document.querySelector("button").onclick();
    }
}

function createItem(text, done = false) {
    let li = document.createElement("li");
    li.classList.add("list-group-item");
    li.textContent = text;

    let check = document.createElement("a");
    check.setAttribute("href", "#");
    check.classList.add("fas", "fa-check", "float-start", "me-3");
    check.onclick = function () {
        document.querySelector("#done").appendChild(check.parentElement);
        check.remove();
        updateCount();
        markDone(text);
    }
    if (!done) li.appendChild(check);

    let del = document.createElement("a");
    del.setAttribute("href", "#");
    del.classList.add("fas", "fa-trash", "float-end", "text-warning");
    del.onclick = function () {
        del.parentElement.remove();
        updateCount();
        remove(text);
    }
    li.appendChild(del);

    if (done) {
        document.querySelector("#done").appendChild(li);
    } else {
        document.querySelector("#todo").appendChild(li);
    }
    updateCount();
}