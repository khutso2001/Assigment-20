import React, { useState, useEffect } from "react";
import "./App.css";
import ToDo from "./components/todo/ToDo";
import TaskInput from "./components/taskInput/TaskInput";
import Header from "./components/Header";
import { LanguageProvider } from "./LanguageContext";

const API_KEY = "zYgMSWkDXkfF5fS7e5KzMLhBM_lH37zd83yNOPeM1SZPyfzi9A";

function App() {
  const [taskList, setTaskList] = useState([]);
  const [allTask, setAllTask] = useState([]); // Initialize as empty array

  useEffect(() => {
    getTask();
  }, []);

  const getTask = () => {
    fetch("https://crudapi.co.uk/api/v1/task", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Response Failed");
        return response.json();
      })
      .then((data) =>
        setAllTask(
          data.items.map((task) => {
            return {
              task: task.task,
              id: task._uuid,
              isCompleted: task.isCompleted || false,
            };
          })
        )
      )
      .catch((error) => console.log(error));
  };

  const submit = (task) => {
    fetch("https://crudapi.co.uk/api/v1/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify([{ task, isCompleted: false }]),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Response Failed");
        return response.json();
      })
      .then((data) => {
        setTaskList((prev) => [
          ...prev,
          {
            task: data.items[0].task,
            id: data.items[0]._uuid,
            isCompleted: data.items[0].isCompleted,
          },
        ]);
        getTask();
      })
      .catch((error) => console.log(error));
  };

  const toggleComplete = (id) => {
    const taskToToggle = allTask.find((task) => task.id === id);
    const updatedTask = {
      ...taskToToggle,
      isCompleted: !taskToToggle.isCompleted,
    };

    fetch(`https://crudapi.co.uk/api/v1/task/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify(updatedTask),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Response Failed");
        return response.json();
      })
      .then(() => {
        setAllTask((prev) =>
          prev.map((task) =>
            task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
          )
        );
      })
      .catch((error) => console.log(error));
  };

  const editTask = (id, newTask) => {
    const taskToEdit = allTask.find((task) => task.id === id);
    const updatedTask = { ...taskToEdit, task: newTask };

    fetch(`https://crudapi.co.uk/api/v1/task/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify(updatedTask),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Response Failed");
        return response.json();
      })
      .then(() => {
        setAllTask((prev) =>
          prev.map((task) =>
            task.id === id ? { ...task, task: newTask } : task
          )
        );
      })
      .catch((error) => console.log(error));
  };

  return (
    <LanguageProvider>
      <div className="App">
        <Header />
        <TaskInput submit={submit} />
        <ToDo
          taskList={taskList}
          getTask={getTask}
          allTask={allTask}
          toggleComplete={toggleComplete}
          editTask={editTask}
        />
      </div>
    </LanguageProvider>
  );
}

export default App;
