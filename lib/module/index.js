import { MqttEvent } from './models/events/MqttEvent';
import { MqttEventParam } from './models/events/MqttEventParam';
import { toByteArray, fromByteArray } from 'base64-js';
import { MqttNative, MqttEventEmitter } from './models/NativeMqtt';
export * from './models/events/MqttEvent';
export * from './models/Protocol';
export * from './models/MqttOptions';

/**
 * MqttClient is a Typescript wrapper for native MQTT clients
 *
 * @param options configuration options for the client
 */
export class MqttClient {
  _eventHandler = {};
  constructor(options) {
    this._options = options;
    this._eventEmitter = MqttEventEmitter();
  }
  async init() {
    this._clientRef = await MqttNative.createClient(this._options);
    this._setupEventListeners();
  }
  on(event, cb) {
    this._eventHandler[event] = cb;
    return this;
  }
  connect() {
    MqttNative.connect(this._clientRef);
  }
  async connectAsync() {
    await MqttNative.connect(this._clientRef);
  }
  disconnect() {
    MqttNative.disconnect(this._clientRef);
  }
  async disconnectAsync() {
    await MqttNative.disconnect(this._clientRef);
  }
  subscribe(...topics) {
    MqttNative.subscribe([...topics], this._clientRef);
  }
  async subscribeAsync(...topics) {
    await MqttNative.subscribe([...topics], this._clientRef);
  }
  unsubscribe(topic) {
    const readableTopics = Array.from([topic].flat());
    MqttNative.unsubscribe(readableTopics, this._clientRef);
  }
  async unsubscribeAsync(topic) {
    const readableTopics = Array.from([topic].flat());
    await MqttNative.unsubscribe(readableTopics, this._clientRef);
  }
  publish(topic, payload, options = {}) {
    MqttNative.publish(topic, fromByteArray(payload), options, this._clientRef);
  }
  async publishAsync(topic, payload, options = {}) {
    MqttNative.publish(topic, fromByteArray(payload), options, this._clientRef);
  }
  reconnect() {
    MqttNative.reconnect(this._clientRef);
  }
  async isConnected() {
    return await MqttNative.isConnected(this._clientRef);
  }
  end(force = false) {
    MqttNative.end(this._clientRef, force);
    this._removeEventListeners();
  }
  async endAsync(force = false) {
    await MqttNative.end(this._clientRef, force);
    this._removeEventListeners();
  }
  close = this.end;
  closeAsync = this.endAsync;
  _removeEventListeners() {
    this._eventEmitter.removeAllListeners(MqttEvent.CLIENT_REF_UNKNOWN);
    this._eventEmitter.removeAllListeners(MqttEvent.CONNECTED);
    this._eventEmitter.removeAllListeners(MqttEvent.CONNECTING);
    this._eventEmitter.removeAllListeners(MqttEvent.CONNECTION_LOST);
    this._eventEmitter.removeAllListeners(MqttEvent.CLOSED);
    this._eventEmitter.removeAllListeners(MqttEvent.DELIVERY_COMPLETE);
    this._eventEmitter.removeAllListeners(MqttEvent.DISCONNECTED);
    this._eventEmitter.removeAllListeners(MqttEvent.EXCEPTION);
    this._eventEmitter.removeAllListeners(MqttEvent.MESSAGE_RECEIVED);
    this._eventEmitter.removeAllListeners(MqttEvent.RECONNECT);
    this._eventEmitter.removeAllListeners(MqttEvent.SUBSCRIBED);
    this._eventEmitter.removeAllListeners(MqttEvent.UNSUBSCRIBED);
  }
  _setupEventListeners() {
    this._addEventListener(MqttEvent.CONNECTING);
    this._addEventListener(MqttEvent.CONNECTED);
    this._addEventListener(MqttEvent.CLOSED);
    this._addEventListener(MqttEvent.CONNECTION_LOST, MqttEventParam.ERR_MESSAGE, MqttEventParam.ERR_CODE, MqttEventParam.STACKTRACE);
    this._addEventListener(MqttEvent.EXCEPTION, MqttEventParam.ERR_MESSAGE, MqttEventParam.ERR_CODE, MqttEventParam.STACKTRACE);
    this._addEventListener(MqttEvent.SUBSCRIBED, MqttEventParam.TOPIC);
    this._addEventListener(MqttEvent.UNSUBSCRIBED, MqttEventParam.TOPIC);
    this._addEventListener(MqttEvent.DISCONNECTED);
    this._addEventListener(MqttEvent.MESSAGE_RECEIVED, MqttEventParam.TOPIC, MqttEventParam.PAYLOAD);
    this._addEventListener(MqttEvent.MESSAGE_PUBLISHED, MqttEventParam.TOPIC, MqttEventParam.PAYLOAD);
  }
  _addEventListener(eventType, ...eventParams) {
    this._eventEmitter.addListener(eventType, event => {
      var _this$_eventHandler$e;
      if (event[MqttEventParam.CLIENT_REF] !== this._clientRef) return;
      if (eventType === MqttEvent.MESSAGE_PUBLISHED || eventType === MqttEvent.MESSAGE_RECEIVED) {
        event[MqttEventParam.PAYLOAD] = toByteArray(event[MqttEventParam.PAYLOAD]);
      }
      (_this$_eventHandler$e = this._eventHandler[eventType]) === null || _this$_eventHandler$e === void 0 || _this$_eventHandler$e.call(this, ...eventParams.map(e => event[e]));
    });
  }
}
//# sourceMappingURL=index.js.map