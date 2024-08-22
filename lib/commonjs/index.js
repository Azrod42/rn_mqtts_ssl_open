"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  MqttClient: true
};
exports.MqttClient = void 0;
var _MqttEvent = require("./models/events/MqttEvent");
Object.keys(_MqttEvent).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _MqttEvent[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _MqttEvent[key];
    }
  });
});
var _MqttEventParam = require("./models/events/MqttEventParam");
var _base64Js = require("base64-js");
var _NativeMqtt = require("./models/NativeMqtt");
var _Protocol = require("./models/Protocol");
Object.keys(_Protocol).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _Protocol[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Protocol[key];
    }
  });
});
var _MqttOptions = require("./models/MqttOptions");
Object.keys(_MqttOptions).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _MqttOptions[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _MqttOptions[key];
    }
  });
});
/**
 * MqttClient is a Typescript wrapper for native MQTT clients
 *
 * @param options configuration options for the client
 */
class MqttClient {
  _eventHandler = {};
  constructor(options) {
    this._options = options;
    this._eventEmitter = (0, _NativeMqtt.MqttEventEmitter)();
  }
  async init() {
    this._clientRef = await _NativeMqtt.MqttNative.createClient(this._options);
    this._setupEventListeners();
  }
  on(event, cb) {
    this._eventHandler[event] = cb;
    return this;
  }
  connect() {
    _NativeMqtt.MqttNative.connect(this._clientRef);
  }
  async connectAsync() {
    await _NativeMqtt.MqttNative.connect(this._clientRef);
  }
  disconnect() {
    _NativeMqtt.MqttNative.disconnect(this._clientRef);
  }
  async disconnectAsync() {
    await _NativeMqtt.MqttNative.disconnect(this._clientRef);
  }
  subscribe(...topics) {
    _NativeMqtt.MqttNative.subscribe([...topics], this._clientRef);
  }
  async subscribeAsync(...topics) {
    await _NativeMqtt.MqttNative.subscribe([...topics], this._clientRef);
  }
  unsubscribe(topic) {
    const readableTopics = Array.from([topic].flat());
    _NativeMqtt.MqttNative.unsubscribe(readableTopics, this._clientRef);
  }
  async unsubscribeAsync(topic) {
    const readableTopics = Array.from([topic].flat());
    await _NativeMqtt.MqttNative.unsubscribe(readableTopics, this._clientRef);
  }
  publish(topic, payload, options = {}) {
    _NativeMqtt.MqttNative.publish(topic, (0, _base64Js.fromByteArray)(payload), options, this._clientRef);
  }
  async publishAsync(topic, payload, options = {}) {
    _NativeMqtt.MqttNative.publish(topic, (0, _base64Js.fromByteArray)(payload), options, this._clientRef);
  }
  reconnect() {
    _NativeMqtt.MqttNative.reconnect(this._clientRef);
  }
  async isConnected() {
    return await _NativeMqtt.MqttNative.isConnected(this._clientRef);
  }
  end(force = false) {
    _NativeMqtt.MqttNative.end(this._clientRef, force);
    this._removeEventListeners();
  }
  async endAsync(force = false) {
    await _NativeMqtt.MqttNative.end(this._clientRef, force);
    this._removeEventListeners();
  }
  close = this.end;
  closeAsync = this.endAsync;
  _removeEventListeners() {
    this._eventEmitter.removeAllListeners(_MqttEvent.MqttEvent.CLIENT_REF_UNKNOWN);
    this._eventEmitter.removeAllListeners(_MqttEvent.MqttEvent.CONNECTED);
    this._eventEmitter.removeAllListeners(_MqttEvent.MqttEvent.CONNECTING);
    this._eventEmitter.removeAllListeners(_MqttEvent.MqttEvent.CONNECTION_LOST);
    this._eventEmitter.removeAllListeners(_MqttEvent.MqttEvent.CLOSED);
    this._eventEmitter.removeAllListeners(_MqttEvent.MqttEvent.DELIVERY_COMPLETE);
    this._eventEmitter.removeAllListeners(_MqttEvent.MqttEvent.DISCONNECTED);
    this._eventEmitter.removeAllListeners(_MqttEvent.MqttEvent.EXCEPTION);
    this._eventEmitter.removeAllListeners(_MqttEvent.MqttEvent.MESSAGE_RECEIVED);
    this._eventEmitter.removeAllListeners(_MqttEvent.MqttEvent.RECONNECT);
    this._eventEmitter.removeAllListeners(_MqttEvent.MqttEvent.SUBSCRIBED);
    this._eventEmitter.removeAllListeners(_MqttEvent.MqttEvent.UNSUBSCRIBED);
  }
  _setupEventListeners() {
    this._addEventListener(_MqttEvent.MqttEvent.CONNECTING);
    this._addEventListener(_MqttEvent.MqttEvent.CONNECTED);
    this._addEventListener(_MqttEvent.MqttEvent.CLOSED);
    this._addEventListener(_MqttEvent.MqttEvent.CONNECTION_LOST, _MqttEventParam.MqttEventParam.ERR_MESSAGE, _MqttEventParam.MqttEventParam.ERR_CODE, _MqttEventParam.MqttEventParam.STACKTRACE);
    this._addEventListener(_MqttEvent.MqttEvent.EXCEPTION, _MqttEventParam.MqttEventParam.ERR_MESSAGE, _MqttEventParam.MqttEventParam.ERR_CODE, _MqttEventParam.MqttEventParam.STACKTRACE);
    this._addEventListener(_MqttEvent.MqttEvent.SUBSCRIBED, _MqttEventParam.MqttEventParam.TOPIC);
    this._addEventListener(_MqttEvent.MqttEvent.UNSUBSCRIBED, _MqttEventParam.MqttEventParam.TOPIC);
    this._addEventListener(_MqttEvent.MqttEvent.DISCONNECTED);
    this._addEventListener(_MqttEvent.MqttEvent.MESSAGE_RECEIVED, _MqttEventParam.MqttEventParam.TOPIC, _MqttEventParam.MqttEventParam.PAYLOAD);
    this._addEventListener(_MqttEvent.MqttEvent.MESSAGE_PUBLISHED, _MqttEventParam.MqttEventParam.TOPIC, _MqttEventParam.MqttEventParam.PAYLOAD);
  }
  _addEventListener(eventType, ...eventParams) {
    this._eventEmitter.addListener(eventType, event => {
      var _this$_eventHandler$e;
      if (event[_MqttEventParam.MqttEventParam.CLIENT_REF] !== this._clientRef) return;
      if (eventType === _MqttEvent.MqttEvent.MESSAGE_PUBLISHED || eventType === _MqttEvent.MqttEvent.MESSAGE_RECEIVED) {
        event[_MqttEventParam.MqttEventParam.PAYLOAD] = (0, _base64Js.toByteArray)(event[_MqttEventParam.MqttEventParam.PAYLOAD]);
      }
      (_this$_eventHandler$e = this._eventHandler[eventType]) === null || _this$_eventHandler$e === void 0 || _this$_eventHandler$e.call(this, ...eventParams.map(e => event[e]));
    });
  }
}
exports.MqttClient = MqttClient;
//# sourceMappingURL=index.js.map