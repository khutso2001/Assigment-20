import React, { createContext, useState } from "react";

export const LanguageContext = createContext();

const translations = {
  en: {
    header: "My To-Do App",
    enterTask: "Enter The Task:",
    addTask: "Add Task",
    taskList: "Task List",
    allTasks: "All Tasks",
    complete: "Complete",
    undo: "Undo",
    edit: "Edit",
    save: "Save",
  },
  ka: {
    header: "ჩემი დავალებების აპლიკაცია",
    enterTask: "შეიყვანეთ დავალება:",
    addTask: "დავალების დამატება",
    taskList: "დავალებების სია",
    allTasks: "ყველა დავალება",
    complete: "დასრულება",
    undo: "გაუქმება",
    edit: "რედაქტირება",
    save: "შენახვა",
  },
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");

  const switchLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider
      value={{ language, switchLanguage, translations }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
