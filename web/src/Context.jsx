// createContext.js
import { createContext, useState } from "react";
import PropTypes from "prop-types";
const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [chat, setChat] = useState([]);

  return (
    <DataContext.Provider
      value={{
        chat,
        setChat,
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
