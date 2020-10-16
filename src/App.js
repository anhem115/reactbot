import React, { useEffect, Component } from "react";
import Chatbot from "react-chatbot-kit";
import "./App.css";
import {
  Widget,
  addResponseMessage,
  setQuickButtons,
  renderCustomComponent,
} from "react-chat-widget";
import "react-chat-widget/lib/styles.css";
import axios from "axios";
import ActionProvider from "./ActionProvider";
import MessageParser from "./MessageParser";
import config from "./config";

import logo from "./logo.svg";

class Image extends Component {
  render() {
    return <img alt="placeholder" src={this.props.src}></img>;
  }
}

function App() {
  useEffect(() => {
    addResponseMessage("Welcome to this awesome chat!");
  }, []);

  const handleNewUserMessage = (newMessage) => {
    console.log(`New message incoming! ${newMessage}`);
    axios
      .get(
        `https://childbenefittestresource.cognitiveservices.azure.com/luis/prediction/v3.0/apps/fa7debfd-7950-49ae-89e3-2a541b71b0ec/slots/production/predict?subscription-key=f96251a858b14671a8f4a9902c3ceaea&verbose=true&show-all-intents=true&log=true&query=${newMessage}`
      )
      .then((res) => {
        const topIntent = res.data.prediction.topIntent;
        addResponseMessage(topIntent);
        const testValue = [{ label: "abc", value: "123" }];
        setQuickButtons(testValue);
        const custom = (
          <Chatbot
            config={config}
            actionProvider={ActionProvider}
            messageParser={MessageParser}
          />
        );
        const botProps = {
          config: { config },
          actionProvider: { ActionProvider },
          messageParser: { MessageParser },
        };
        // renderCustomComponent(Chatbot, botProps);
        renderCustomComponent(Image, {
          src:
            "https://www.freecodecamp.org/news/content/images/size/w2000/2020/07/wooden-robot-6069-1.jpg",
        });
      });
    // Now send the message throught the backend API
  };

  return (
    <div className="App">
      <Widget
        handleNewUserMessage={handleNewUserMessage}
        profileAvatar={logo}
        title="My new awesome title"
        subtitle="And my cool subtitle"
      />
    </div>
  );
}

export default App;
