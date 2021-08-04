const addButton = document.getElementById("add");

const updateLocalStorageData = () => {
  const textareaData = document.querySelectorAll("textarea");
  const notes = [];

  textareaData.forEach((ele) => {
    return notes.push(ele.value);
  });
  localStorage.setItem("notes", JSON.stringify(notes));
};

const addNewNote = (text = "") => {
  const note = document.createElement("div");
  note.classList.add("note");
  const htmlData = `
  <div class="operation tools">
        <button class="edit"><i class="fas fa-edit"></i></button>
        <button class="delete"><i class="fas fa-trash-alt"></i></button>
      </div>
      <div class="main ${text ? "" : "hidden"}"></div>
      <textarea class="${text ? "hidden" : ""}"></textarea>`;

  note.insertAdjacentHTML("afterbegin", htmlData);

  const editButton = note.querySelector(".edit");
  const deleteButton = note.querySelector(".delete");
  const mainDiv = note.querySelector(".main");
  const textarea = note.querySelector("textarea");

  //   Deleting the node
  deleteButton.addEventListener("click", () => {
    note.remove();
    updateLocalStorageData();
  });

  // toggle using edit button
  textarea.value = text;
  mainDiv.innerHTML = text;

  editButton.addEventListener("click", () => {
    mainDiv.classList.toggle("hidden");
    textarea.classList.toggle("hidden");
  });

  textarea.addEventListener("change", (event) => {
    const value = event.target.value;
    mainDiv.innerHTML = value;

    updateLocalStorageData();
  });

  document.body.appendChild(note);
};

// getting data from Local storage
const notes = JSON.parse(localStorage.getItem("notes"));

if (notes) {
  notes.forEach((ele) => addNewNote(ele));
}

addButton.addEventListener("click", () => addNewNote());
