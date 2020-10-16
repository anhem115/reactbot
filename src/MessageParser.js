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
      .get(
        `https://childbenefittestresource.cognitiveservices.azure.com/luis/prediction/v3.0/apps/fa7debfd-7950-49ae-89e3-2a541b71b0ec/slots/production/predict?subscription-key=f96251a858b14671a8f4a9902c3ceaea&verbose=true&show-all-intents=true&log=true&query=${message}`
      )
      .then((res) => {
        const topIntent = res.data.prediction.topIntent;
        this.actionProvider.confirmQuestion(`You want to ${topIntent}`);
      });
  }
}

export default MessageParser;
