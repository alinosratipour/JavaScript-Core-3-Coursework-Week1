let library = [];

window.addEventListener("load", function (e) {
  populateStorage();
  render();
});

function populateStorage() {
  if (library.length == 0) {
    let book1 = new Book("Robison Crusoe", "Daniel Defoe", "252", true);
    let book2 = new Book(
      "The Old Man and the Sea",
      "Ernest Hemingway",
      "127",
      true
    );
    library.push(book1);
    library.push(book2);
    render();
  }
}

const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const check = document.getElementById("check");

//check the right input from forms and if its ok -> add the new book (object in array)
//via Book function and start render function
function submit() {
  if (
    title.value == null ||
    title.value == "" ||
    pages.value == null ||
    pages.value == "" ||
    author.value == null ||
    author.value == ""
  ) {
    alert("Please fill all fields!");
    return false;
  } else {
    let book = new Book(title.value, author.value, pages.value, check.checked);
    library.push(book);
    render();
  }
}

function Book(title, author, pages, check) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.check = check;
}

function render() {
  let table = document.getElementById("display");
  let rowsNumber = table.rows.length;
  //delete old table
  for (let n = rowsNumber - 1; n > 0; n--) {
    table.deleteRow(n);
  }
  //insert updated row and cells
  let length = library.length;
  for (let i = 0; i < length; i++) {
    let row = table.insertRow(1);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    let cell5 = row.insertCell(4);
    cell1.innerHTML = library[i].title;
    cell2.innerHTML = library[i].author;
    cell3.innerHTML = library[i].pages;

    //add and wait for action for read/unread button
    let changeBut = document.createElement("button");
    changeBut.id = i;
    changeBut.className = "btn btn-success";
    cell4.appendChild(changeBut);
    let readStatus = "";
    if (library[i].check == false) {
      readStatus = "No";
    } else {
      readStatus = "Yes";
    }
    changeBut.innerHTML = readStatus;

    changeBut.addEventListener("click", function () {
      library[i].check = !library[i].check;
      render();
    });

    //add delete button to every row and render again
    let delBut = document.createElement("button");
    delBut.id = i + 5;
    cell5.appendChild(delBut);
    delBut.className = "btn btn-warning";
    delBut.innerHTML = "Delete";
    delBut.addEventListener("click", function () {
      alert(`You've deleted title: ${library[i].title}`);
      library.splice(i, 1);
      render();
    });
  }
}

//********************BUG FIXED**************************** */

// 1. Delete event fixed. changed clicks to click line 97.
// 2. myLibrary changed to library
// 3. line 40 author.value was added to fix the bug
// 4 line 80 and 82 readStatus changed to correct order
// 5. missed author field validation on line 36 and 37
