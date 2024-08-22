"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MqttNative = exports.MqttEventEmitter = void 0;
var _reactNative = require("react-native");
const LINKING_ERROR = `The package 'react-native-mqtt' doesn't seem to be linked. Make sure: \n\n` + _reactNative.Platform.select({
  ios: "- You have run 'pod install'\n",
  default: ''
}) + '- You rebuilt the app after installing the package\n' + '- You are not using Expo managed workflow\n';
const MqttNative = exports.MqttNative = _reactNative.NativeModules.Mqtt ? _reactNative.NativeModules.Mqtt : new Proxy({}, {
  get() {
    throw new Error(LINKING_ERROR);
  }
});
const MqttEventEmitter = () => new _reactNative.NativeEventEmitter(MqttNative);
exports.MqttEventEmitter = MqttEventEmitter;
//# sourceMappingURL=NativeMqtt.js.map