import { useState } from "react";
import "./index.css";
import TaskForm from "./components/TaskForm";
import CurrentTask from "./components/CurrentTasks";
import CompletedTasks from "./components/CompletedTasks";
import Footer from "./components/Footer";

function App() {
  interface OpenSectionProps {
    taskListForm: boolean;
    tasks: boolean;
    completedTasks: boolean;
  }

  const [openSection, setOpenSection] = useState<OpenSectionProps>({
    taskListForm: true,
    tasks: true,
    completedTasks: true,
  });

  interface taskProps {
    title: string;
    priority: "Low" | "Medium" | "High";
    date: string;
    completed?: boolean;
    id?: number;
  }

  // массив тасок
  const [tasks, setTasks] = useState<taskProps[]>([]);

  // Сортировка
  type SortType = "date" | "priority";
  type SortOrder = "asc" | "desc";
  const [sortType, setSortType] = useState<SortType>("date");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  // Открыть/закрыть окно секции
  function toggleSection(section: keyof OpenSectionProps) {
    setOpenSection((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  }

  // Добавить таску
  function addTask(task: taskProps) {
    setTasks([...tasks, { ...task, completed: false, id: Date.now() }]);
  }

  // Поменять статус таски (complete/uncomplete)
  function changeStatusTask(id: number) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  // Удалить task
  function deleteTask(id: number) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  // Переключение сортировки
  function toggleSortOrder(type: SortType) {
    if (sortType === type) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortType(type);
      setSortOrder("asc");
    }
  }

  // Сортировка
  function sortTasks(tasksArray: taskProps[]): taskProps[] {
    return tasksArray.slice().sort((a, b) => {
      if (sortType === "priority") {
        const priorityOrder = { High: 1, Medium: 2, Low: 3 };
        return sortOrder === "asc"
          ? priorityOrder[a.priority] - priorityOrder[b.priority]
          : priorityOrder[b.priority] - priorityOrder[a.priority];
      } else {
        return sortOrder === "asc"
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });
  }

  const activeTasks = sortTasks(
    tasks.filter((task) => task.completed === false)
  );
  const completedTasks = tasks.filter((task) => task.completed === true);

  // TODO: Для дебага
  console.log(tasks);

  return (
    <div className="app">
      {/* форма для создания тасок */}
      <div className="task-container">
        <h1>Task List with Priority</h1>
        <button
          className={`close-button ${openSection.taskListForm ? "open" : ""}`}
          onClick={() => toggleSection("taskListForm")}
        >
          +
        </button>
        {openSection.taskListForm && <TaskForm addTask={addTask} />}
      </div>

      {/* Отображение тасок */}
      <div className="task-container">
        <h2>Tasks</h2>
        <button
          className={`close-button ${openSection.tasks ? "open" : ""}`}
          onClick={() => toggleSection("tasks")}
        >
          +
        </button>
        <div className="sort-controls">
          <button
            className={`sort-button ${sortType === "date" ? "active" : ""}`}
            onClick={() => toggleSortOrder("date")}
          >
            By date
            {sortType === "date" &&
              (sortOrder === "asc" ? " \u2191" : " \u2193")}
          </button>
          <button
            className={`sort-button ${sortType === "priority" ? "active" : ""}`}
            onClick={() => toggleSortOrder("priority")}
          >
            By priority
            {sortType === "priority" &&
              (sortOrder === "asc" ? " \u2191" : " \u2193")}
          </button>
        </div>
        {openSection.tasks && (
          <CurrentTask
            tasks={activeTasks}
            changeStatusTask={changeStatusTask}
            deleteTask={deleteTask}
          />
        )}
      </div>

      {/* Отображение выполненных тасок */}
      <div className="task-container">
        <h2>Completed Tasks</h2>
        <button
          className={`close-button ${openSection.completedTasks ? "open" : ""}`}
          onClick={() => toggleSection("completedTasks")}
        >
          +
        </button>
        {openSection.completedTasks && (
          <CompletedTasks
            tasks={completedTasks}
            changeStatusTask={changeStatusTask}
            deleteTask={deleteTask}
          />
        )}
      </div>

      {/* Футер */}
      <Footer />
    </div>
  );
}

export default App;
