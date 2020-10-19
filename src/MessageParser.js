// MessageParser starter code
import axios from "axios";
class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) {
    const lowerCaseMessage = message.toLowerCase();

    if (lowerCaseMessage.includes("hello")) {
      this.actionProvider.greet();
    }
    axios
      .post(
        `localhost:5000/api/df_text_query`, {
          text: `${message}`
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      .then((res) => {
        const topIntent = res.data.intent;
        this.actionProvider.confirmQuestion(`${res.data.result}`);
      });
  }
}

export default MessageParser;
