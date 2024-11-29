// createContext.js
import { createContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
const DataContext = createContext();
import axios from "axios";
import { DateTime } from "luxon";
const DataProvider = ({ children }) => {
  const instance = axios.create({
    // baseURL: "http://127.0.0.1:9999",
    baseURL: "http://35.209.223.129:9999",
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
  const [topicFrequency, setTopicFrequency] = useState({
    Health: 0,
    Environment: 0,
    Technology: 0,
    Economy: 0,
    Entertainment: 0,
    Sports: 0,
    Politics: 0,
    Education: 0,
    Travel: 0,
    Food: 0,
  });
  const topicUpdated = useRef(false);
  const stop = useRef(false);
  useEffect(() => {
    if (stop.current == false) {
      setShowLoading(true);
      instance
        .post(
          "/init",
          // "http://34.67.220.5:9999/init",

          {
            topics: [],
          },
          { timeout: 20000 }
        )
        .then((res) => {
          // console.log(res?.data);
          setChatID(res?.data?.chatID);
          setChat(() => [
            {
              message: res?.data?.content,
              sender: "bot",
              time: DateTime.now(),
            },
          ]);
          stop.current = true;
          setShowLoading(false);
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
          setShowLoading(false);
        });
    }
  }, []);

  async function postMessage(data) {
    const selectedTopics = Object.keys(filter).filter((key) => filter[key]);
    Object.keys(topicFrequency).forEach((key) => {
      if (filter[key]) {
        setTopicFrequency((prev) => {
          return {
            ...prev,
            [key]: topicFrequency[key] + 1,
          };
        });
        // topicFrequency[key] += 1;
      }
    });
    try {
      setShowLoading(true);
      const res = await instance.post(
        "/chat",
        {
          chatID: chatID,
          prompt: data.message,
          updTopic: topicUpdated.current,
          topics: selectedTopics,
        },
        { timeout: 10000 }
      );
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
      setShowLoading(false);
    } catch (err) {
      console.log(err);
      setChat((prev) => [
        ...prev,
        {
          message:
            "Failed to connect to the server. Please try again later. :( ",
          sender: "bot",
          time: DateTime.now(),
        },
      ]);
      stop.current = false;
      setShowLoading(false);
    }

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
        topicFrequency,
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
