import TaskItem from "./TaskItem";

interface TaskProps {
  title: string;
  priority: "Low" | "Medium" | "High";
  date: string;
  completed?: boolean;
  id?: number;
}

interface CurrentTaskProps {
  tasks: TaskProps[];
  changeStatusTask: (id: number) => void;
  deleteTask: (id: number) => void;
}

function CurrentTask({ tasks, changeStatusTask, deleteTask }: CurrentTaskProps) {
  return (
    <ul className="task-list">
      {tasks.map(
        (task) =>
          !task.completed && (
            <TaskItem
              key={task.id}
              title={task.title}
              priority={task.priority}
              date={task.date}
              completed={task.completed}
              id={task.id}
              changeStatusTask={changeStatusTask}
              deleteTask={deleteTask}
            />
          )
      )}
    </ul>
  );
}

export default CurrentTask;
