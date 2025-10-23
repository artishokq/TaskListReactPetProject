import { useCallback, useState, type ChangeEvent } from "react";

interface TaskProps {
  title: string;
  priority: "Low" | "Medium" | "High";
  date: string;
}

interface TaskFormProps {
  addTask: (task: TaskProps) => void;
}

function TaskForm({ addTask }: TaskFormProps) {
  const [formValues, setFormValue] = useState<TaskProps>({
    title: "",
    priority: "Low",
    date: "",
  });

  // Отправляем данные
  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    addTask(formValues);
    setFormValue({
      title: "",
      priority: "Low",
      date: "",
    });
  }

  // Изменение значений в полях
  const handleInputChange = useCallback((field: keyof TaskProps) => {
    return (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setFormValue((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };
  }, []);

  return (
    <form onSubmit={handleSubmit} className="task-form">
      {/* Вводим Title */}
      <input
        type="text"
        value={formValues.title}
        onChange={handleInputChange("title")}
        placeholder="Task title..."
        required
      />

      {/* Выбираем приоритет */}
      <select
        value={formValues.priority}
        onChange={handleInputChange("priority")}
      >
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>

      {/* Выбираем дату */}
      <input
        type="date"
        value={formValues.date}
        onChange={handleInputChange("date")}
        required
      />

      {/* Кнопка отправики */}
      <button type="submit">Add task</button>
    </form>
  );
}

export default TaskForm;
