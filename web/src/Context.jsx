// createContext.js
import { createContext, useState } from "react";
import PropTypes from "prop-types";
const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [chat, setChat] = useState([]);
  const [filter, setFilter] = useState({
    health: false,
    environment: false,
    technology: false,
    economy: false,
    entertainment: false,
    sports: false,
    politics: false,
    education: false,
    travel: false,
    food: false,
  });
  return (
    <DataContext.Provider
      value={{
        chat,
        setChat,
        filter,
        setFilter,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { DataProvider, DataContext };
