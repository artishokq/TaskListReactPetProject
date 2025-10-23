import TaskItem from "./TaskItem";

interface TaskProps {
  title: string;
  priority: "Low" | "Medium" | "High";
  date: string;
  completed?: boolean;
  id?: number;
}

interface CompletedTasksProps {
  tasks: TaskProps[];
  changeStatusTask: (id: number) => void;
  deleteTask: (id: number) => void;
}

function CompletedTasks({
  tasks,
  changeStatusTask,
  deleteTask,
}: CompletedTasksProps) {
  return (
    <ul className="completed-task-list">
      {tasks.map(
        (task, index) =>
          task.completed && (
            <TaskItem
              key={index}
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

export default CompletedTasks;
