import React, { useContext } from "react";
import { LanguageContext } from "../LanguageContext";

const Header = () => {
  const { language, switchLanguage, translations } =
    useContext(LanguageContext);

  return (
    <header>
      <h1>{translations[language].header}</h1>
      <select onChange={(e) => switchLanguage(e.target.value)} value={language}>
        <option value="en">English</option>
        <option value="ka">Georgian</option>
      </select>
    </header>
  );
};

export default Header;
