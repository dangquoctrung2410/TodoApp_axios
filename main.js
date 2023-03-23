const listTasksElement = document.getElementById("tasks");
const serverUrl = "http://192.168.1.14:3000";
let currentId = null;

function getListTask() {
  listTasksElement.innerHTML = "";
  const getUserList = axios.get(`${serverUrl}/task/list`);
  getUserList.then((abc) => {
    console.log(abc.data);

    for (let i = 0; i < abc.data.length; i++) {
      const element = abc.data[i];
        const task = document.createElement("div");
      task.classList.add('taskel')
      
        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete")
      deleteBtn.innerHTML = `DELETE`;
      deleteBtn.onclick = () => {
        axios.delete(`${serverUrl}/task/delete/${element.id}`).then(() => {
          getListTask();
        });
      };

      task.onclick = () => {
        currentId = element.id;
        const text = document.getElementById("textInput");
        const date = document.getElementById("dateInput");
        const description = document.getElementById("textarea");
        var numDate = new Date(element.date);

        text.value = element.title;
        date.value = numDate.toISOString().slice(0, 10);
          description.value = element.description;
          handleShowHideBtn();
      };
      var numDate = new Date(element.date);
      task.innerHTML = `
        <div>id : ${element.id} </div>
        <div>Title : ${element.title} </div>
        <div>Date : ${numDate.toLocaleDateString("en-US")}</div>
        <div>Description : ${element.description}</div>`;
      task.appendChild(deleteBtn);
      listTasksElement.appendChild(task);
      console.log(element);
    }
  });
}

getListTask();

const addButton = document.getElementById("addTask");
addButton.onclick = () => {
  const text = document.getElementById("textInput");
  const date = document.getElementById("dateInput");
  const description = document.getElementById("textarea");
  const d1 = new Date(date.value);

  axios
    .post(`${serverUrl}/task/add`, {
      title: text.value,
      date: d1.getTime(),
      description: description.value,
    })
    .then(() => {
      getListTask();
    });
};

const update = document.getElementById("update");
update.onclick = () => {
  const text = document.getElementById("textInput");
  const date = document.getElementById("dateInput");
  const description = document.getElementById("textarea");
  const d1 = new Date(date.value);

  axios
    .patch(`${serverUrl}/task/update/${currentId}`, {
      title: text.value,
      date: d1.getTime(),
      description: description.value,
    })
    .then(() => {
      getListTask();
    });
};

const handleShowHideBtn = () => {
    const add = document.getElementById('addTask');
    const clear = document.getElementById('clear');
    const update = document.getElementById('update');

    if (currentId) {
        update.style.display = 'block';
        clear.style.display = 'block';
        add.style.display = 'none'
    } else {
        update.style.display = 'none';
        clear.style.display = 'none';
        add.style.display = 'block'
    }
}
handleShowHideBtn();

const clear = document.getElementById('clear');
clear.onclick = () => {
    const text = document.getElementById("textInput");
    const date = document.getElementById("dateInput");
    const description = document.getElementById("textarea");

    text.value = "";
    date.value = "";
    description.value = "";
    currentId = null;
    handleShowHideBtn();

}