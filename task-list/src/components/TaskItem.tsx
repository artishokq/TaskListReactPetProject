interface TaskItemProps {
  title: string;
  priority: "Low" | "Medium" | "High";
  date: string;
  completed?: boolean;
  id?: number;
  changeStatusTask: (id: number) => void;
  deleteTask: (id: number) => void;
}

function TaskItem({
  title,
  priority,
  date,
  completed,
  id,
  changeStatusTask,
  deleteTask,
}: TaskItemProps) {
  return (
    <li
      className={`task-item ${
        priority === "Low" ? "low" : priority === "Medium" ? "medium" : "high"
      }`}
    >
      <div className="task-info">
        <div>
          {title} <strong>{priority}</strong>
        </div>

        <div className="task-deadline"> Due: {date}</div>
      </div>

      <div className="task-buttons">
        <button
          className="complete-button"
          onClick={() => changeStatusTask(id!)}
        >
          {completed === false ? "Complete" : "Uncomplete"}
        </button>
        <button className="delete-button" onClick={() => deleteTask(id!)}>
          Delete
        </button>
      </div>
    </li>
  );
}

export default TaskItem;
