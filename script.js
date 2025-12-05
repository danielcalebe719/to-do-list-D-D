const btnAdd = document.getElementById("btnAdd");
const formContainer = document.getElementById("formContainer");
const taskTitle = document.getElementById("tarefasTitle");
const taskDescription = document.getElementById("tarefasDesc");
const saveTaskBtn = document.getElementById("saveTarefasBtn");
const taskGrid = document.getElementById("tarefasGrid");
const errorMsg = document.getElementById("errorMsg");
const filterSelect = document.getElementById("filterSelect");

let tasks = JSON.parse(localStorage.getItem("tasks")) || []; 

function salvarStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    taskGrid.innerHTML = "";
    const filtro = filterSelect.value;

    tasks.forEach((task, index) => {

        if (filtro === "completa" && !task.completed) return;
        if (filtro === "pendende" && task.completed) return;

        const card = document.createElement("div");
        card.className = `task-card ${task.completed ? "completed" : ""}`;

        card.innerHTML = `
            <p class="task-title">${task.title}</p>
            <p class="task-desc">${task.desc}</p>

            <div class="actions">
                <label>
                    <input id="task-check" class="input-check" type="checkbox" data-index="${index}" ${task.completed ? "checked" : ""}>
                </label>

                <button class="remove-btn" data-remove="${index}">Apagar</button>
            </div>
        `;

        taskGrid.appendChild(card);
    });
}

btnAdd.addEventListener("click", () => {
    formContainer.classList.toggle("hidden");
});

saveTaskBtn.addEventListener("click", () => {
    const title = taskTitle.value;
    const desc = taskDescription.value;

    if (!title) {
        errorMsg.textContent = "título é obrigatório!";
        return;
    }

    errorMsg.textContent = "";

    tasks.push({
        title,
        desc,
        completed: false
    });

    salvarStorage();
    renderTasks();

    taskTitle.value = "";
    taskDescription.value = "";
    formContainer.classList.add("hidden");
});

document.addEventListener("change", (e) => {
    if (e.target.type === "checkbox") {
        const index = e.target.dataset.index;
        tasks[index].completed = e.target.checked;

        salvarStorage();
        renderTasks();
    }
});

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-btn")) {
        const index = e.target.dataset.remove;
        tasks.splice(index, 1);

        salvarStorage();
        renderTasks();
    }
});

filterSelect.addEventListener("change", renderTasks);

renderTasks();
                                                                                                                                                                            