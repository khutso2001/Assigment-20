import React, { useState, useContext } from "react";
import "./ToDo.css";
import { LanguageContext } from "../../LanguageContext";

const ToDo = ({ getTask, allTask = [], toggleComplete, editTask }) => {
  // Default value for allTask
  const [editMode, setEditMode] = useState(null);
  const [newTask, setNewTask] = useState("");
  const { language, translations } = useContext(LanguageContext);

  const handleEdit = (id, task) => {
    setEditMode(id);
    setNewTask(task);
  };

  const handleSave = (id) => {
    editTask(id, newTask);
    setEditMode(null);
    setNewTask("");
  };

  return (
    <div className="ToDo">
      <h1>{translations[language].taskList}</h1>
      <div className="tasksHeader">
        <h2>{translations[language].allTasks}</h2>
      </div>
      <div className="tasksContainer">
        <div className="allTaskContainer">
          {allTask.map((task) => (
            <div
              key={task.id}
              style={{
                border: "1px solid brown",
                padding: "15px",
                textDecoration: task.isCompleted ? "line-through" : "none",
              }}
            >
              {editMode === task.id ? (
                <input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                />
              ) : (
                task.task
              )}
              <button onClick={() => toggleComplete(task.id)}>
                {task.isCompleted
                  ? translations[language].undo
                  : translations[language].complete}
              </button>
              {editMode === task.id ? (
                <button onClick={() => handleSave(task.id)}>
                  {translations[language].save}
                </button>
              ) : (
                <button onClick={() => handleEdit(task.id, task.task)}>
                  {translations[language].edit}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToDo;
