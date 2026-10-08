const form = document.getElementById("taskForm");
const judulInput = document.getElementById("judul");
const matkulInput = document.getElementById("matkul");
const deadlineInput = document.getElementById("deadline");

const taskList = document.getElementById("taskList");
const errorText = document.getElementById("errorText");
const counter = document.getElementById("counter");

const filterButtons = document.querySelectorAll(".filter-btn");

let tasks = [
    {
        id: 1,
        judul: "Membuat halaman katalog",
        matkul: "Pemrograman Web",
        deadline: "2026-10-10",
        selesai: false
    },
    {
        id: 2,
        judul: "Laporan topologi jaringan",
        matkul: "Komunikasi Data dan Jaringan Komputer",
        deadline: "2026-10-12",
        selesai: true
    }
];

let currentFilter = "semua";

function render() {

    taskList.textContent = "";

    let filteredTasks = tasks;

    if (currentFilter === "aktif") {
        filteredTasks = tasks.filter(
            task => task.selesai === false
        );
    }

    if (currentFilter === "selesai") {
        filteredTasks = tasks.filter(
            task => task.selesai === true
        );
    }

    if (filteredTasks.length === 0) {

        const emptyItem = document.createElement("li");

        emptyItem.textContent =
            "Belum ada tugas yang ditampilkan.";

        emptyItem.className = "empty";

        taskList.appendChild(emptyItem);
    }

    filteredTasks.forEach(task => {

        const li = document.createElement("li");
        li.className = "task-item";

        if (task.selesai) {
            li.classList.add("done");
        }

        li.dataset.id = task.id;

        const left = document.createElement("div");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.selesai;
        checkbox.className = "toggle";

        const content = document.createElement("div");

        const title = document.createElement("h3");
        title.textContent = task.judul;

        const info = document.createElement("p");
        info.textContent =
            `${task.matkul} | Deadline: ${task.deadline}`;

        content.appendChild(title);
        content.appendChild(info);

        left.appendChild(checkbox);
        left.appendChild(content);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Hapus";
        deleteBtn.className = "delete-btn";

        li.appendChild(left);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });

    const activeCount = tasks.filter(
        task => !task.selesai
    ).length;

    counter.textContent =
        `${activeCount} tugas aktif`;
}

form.addEventListener("submit", function (e) {

    e.preventDefault();

    const judul = judulInput.value.trim();
    const matkul = matkulInput.value;
    const deadline = deadlineInput.value;

    errorText.textContent = "";

    if (judul.length < 3) {

        errorText.textContent =
            "Judul tugas minimal 3 karakter.";

        return;
    }

    if (deadline === "") {

        errorText.textContent =
            "Deadline wajib diisi.";

        return;
    }

    const taskBaru = {
        id: Date.now(),
        judul: judul,
        matkul: matkul,
        deadline: deadline,
        selesai: false
    };

    tasks.push(taskBaru);

    form.reset();

    render();
});

taskList.addEventListener("click", function (e) {

    const item = e.target.closest(".task-item");

    if (!item) return;

    const id = Number(item.dataset.id);

    if (e.target.classList.contains("delete-btn")) {

        tasks = tasks.filter(
            task => task.id !== id
        );

        render();
    }
});

taskList.addEventListener("change", function (e) {

    if (!e.target.classList.contains("toggle")) {
        return;
    }

    const item = e.target.closest(".task-item");

    const id = Number(item.dataset.id);

    const task = tasks.find(
        task => task.id === id
    );

    if (task) {
        task.selesai = e.target.checked;
    }

    render();
});

filterButtons.forEach(button => {

    button.addEventListener("click", function () {

        filterButtons.forEach(btn => {
            btn.classList.remove("on");
        });

        button.classList.add("on");

        currentFilter =
            button.dataset.filter;

        render();
    });
});

render();