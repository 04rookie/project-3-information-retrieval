// createContext.js
import { createContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
const DataContext = createContext();
import axios from "axios";
import { DateTime } from "luxon";
const DataProvider = ({ children }) => {
  const instance = axios.create({
    baseURL: "http://192.168.1.4:9999",
  });
  const [chatID, setChatID] = useState(null);
  const [showLoading, setShowLoading] = useState(false);
  const [chat, setChat] = useState([]);
  const [filter, setFilter] = useState({
    Health: false,
    Environment: false,
    Technology: false,
    Economy: false,
    Entertainment: false,
    Sports: false,
    Politics: false,
    Education: false,
    Travel: false,
    Food: false,
  });
  const topicUpdated = useRef(false);
  const stop = useRef(false);
  useEffect(() => {}, []);
  if (stop.current == false) {
    instance
      .post(
        "/init",
        // "http://34.67.220.5:9999/init",

        {
          topics: [],
        },
        { timeout: 10000 }
      )
      .then((res) => {
        console.log(res?.data);
        setChatID(res?.data?.chatID);
        setChat(() => [
          {
            message: res?.data?.content,
            sender: "bot",
            time: DateTime.now(),
          },
        ]);
        stop.current = true;
      })
      .catch((err) => {
        console.log(err);
        console.log("Error, failed to call init");
        stop.current = true;
        // code to handle timeout
        setChat((prev) => [
          ...prev,
          {
            message:
              "Failed to connect to the server. Please try again later. :( ",
            sender: "bot",
            time: DateTime.now(),
          },
        ]);
      });
  }

  async function postMessage(data) {
    const selectedTopics = Object.keys(filter).filter((key) => filter[key]);
    const res = await instance.post("/chat", {
      chatID: chatID,
      prompt: data.message,
      updTopic: topicUpdated.current,
      topics: selectedTopics,
    });
    topicUpdated.current = false;
    setChat((prev) => {
      return [
        ...prev,
        {
          message: res?.data?.content,
          sender: "bot",
          time: DateTime.now(),
        },
      ];
    });
    return;
  }

  return (
    <DataContext.Provider
      value={{
        chat,
        setChat,
        filter,
        setFilter,
        showLoading,
        setShowLoading,
        chatID,
        postMessage,
        topicUpdated,
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
