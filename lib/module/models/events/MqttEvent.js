export let MqttEvent;
(function (MqttEvent) {
  MqttEvent["EXCEPTION"] = "EXCEPTION";
  MqttEvent["RECONNECT"] = "RECONNECT";
  MqttEvent["CONNECTING"] = "CONNECTING";
  MqttEvent["CONNECTED"] = "CONNECTED";
  MqttEvent["CLOSED"] = "CLOSED";
  MqttEvent["DISCONNECTED"] = "DISCONNECTED";
  MqttEvent["SUBSCRIBED"] = "SUBSCRIBED";
  MqttEvent["UNSUBSCRIBED"] = "UNSUBSCRIBED";
  MqttEvent["CONNECTION_LOST"] = "CONNECTION_LOST";
  MqttEvent["MESSAGE_RECEIVED"] = "MESSAGE_RECEIVED";
  MqttEvent["MESSAGE_PUBLISHED"] = "MESSAGE_PUBLISHED";
  MqttEvent["DELIVERY_COMPLETE"] = "DELIVERY_COMPLETE";
  MqttEvent["CONNECTION_COMPLETE"] = "CONNECTION_COMPLETE";
  MqttEvent["CLIENT_REF_UNKNOWN"] = "CLIENT_REF_UNKNOWN";
})(MqttEvent || (MqttEvent = {}));
//# sourceMappingURL=MqttEvent.js.map