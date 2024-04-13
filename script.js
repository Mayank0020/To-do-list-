async function fetchTasks() {
  const response = await fetch("/tasks");
  const tasks = await response.json();
  const taskList = document.getElementById("taskList");
  const del = document.getElementById("delete");
  del.addEventListener("click", () => {
    deleteTask(tasks[0]._id);
  });
  taskList.innerHTML = "";
  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.textContent = task.description;
    li.onclick = () => deleteTask(task._id);
    taskList.appendChild(li);
  });
}

async function addTask() {
  const taskInput = document.getElementById("taskInput");
  const description = taskInput.value.trim();
  if (description !== "") {
    await fetch("/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ description }),
    });
    taskInput.value = "";
    fetchTasks();
  }
}

async function deleteTask(id) {
  await fetch(`/tasks/${id}`, {
    method: "DELETE",
  });
  fetchTasks();
}

document.addEventListener("DOMContentLoaded", () => {
  fetchTasks();
});

document.addEventListener("keypress", (event) => {
  console.log(event.key);
  if (event.key === "Enter") {
    addTask();
  }
});
