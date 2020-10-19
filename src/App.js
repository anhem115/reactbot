import React, { useEffect, Component } from "react";
import Chatbot from "react-chatbot-kit";
import "./App.css";
import {
  Widget,
  addResponseMessage,
  addLinkSnippet,
  setQuickButtons,
  renderCustomComponent,
} from "react-chat-widget";
import "react-chat-widget/lib/styles.css";
import axios from "axios";
import ActionProvider from "./ActionProvider";
import MessageParser from "./MessageParser";
import config from "./config";

import logo from "./logo.svg";

const TestComponent = ({text}) => (<div>{text}</div>);

class Image extends Component {
  render() {
    return <img alt="placeholder" src={this.props.src}></img>;
  }
}

function App() {
  useEffect(() => {
    addResponseMessage("Hi, how could I help you today?");
  }, []);

  const handleNewUserMessage = (newMessage) => {
    console.log(`New message incoming! ${newMessage}`);
    axios
      .post(
        `http://localhost:5000/api/df_text_query`, {
          text: `${newMessage}`
        },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      )
      .then((res) => {
        // const topIntent = res.data.prediction.topIntent;
        console.log(res.data)
        const result = res.data.result;
        addResponseMessage(result);
        addLinkSnippet({
          title: 'My awesome link',
            link: 'https://github.com/Wolox/react-chat-widget',
            target: '_blank'
        })
        renderCustomComponent(TestComponent, { text: "https://github.com/Wolox/react-chat-widget" });





        // const testValue = [{ label: "abc", value: "123" }];
        // setQuickButtons(testValue);
        // const custom = (
        //   <Chatbot
        //     config={config}
        //     actionProvider={ActionProvider}
        //     messageParser={MessageParser}
        //   />
        // );
        // renderCustomComponent(Image, {
        //   src:
        //     "https://www.freecodecamp.org/news/content/images/size/w2000/2020/07/wooden-robot-6069-1.jpg",
        // });
      });
    // Now send the message throught the backend API
  };

  return (
    <div className="App">
      <Widget
        handleNewUserMessage={handleNewUserMessage}
        profileAvatar={logo}
        title="Goverment of Manitoba"
        subtitle="Support team"
      />
    </div>
  );
}

export default App;
