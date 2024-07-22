import React, { useState, useContext } from "react";
import "./TaskInput.css";
import { LanguageContext } from "../../LanguageContext";

const TaskInput = ({ submit }) => {
  const [task, setTask] = useState("");
  const { language, translations } = useContext(LanguageContext);

  const onSubmit = (e) => {
    e.preventDefault();
    if (task.trim() !== "") {
      submit(task);
      setTask("");
    }
  };

  return (
    <div className="TaskInput">
      <h1>{translations[language].enterTask}</h1>
      <form onSubmit={onSubmit} className="input">
        <input
          type="text"
          placeholder={translations[language].enterTask}
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button type="submit">{translations[language].addTask}</button>
      </form>
    </div>
  );
};

export default TaskInput;
