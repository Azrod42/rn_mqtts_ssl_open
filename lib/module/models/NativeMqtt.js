import { Platform, NativeModules, NativeEventEmitter } from 'react-native';
const LINKING_ERROR = `The package 'react-native-mqtt' doesn't seem to be linked. Make sure: \n\n` + Platform.select({
  ios: "- You have run 'pod install'\n",
  default: ''
}) + '- You rebuilt the app after installing the package\n' + '- You are not using Expo managed workflow\n';
export const MqttNative = NativeModules.Mqtt ? NativeModules.Mqtt : new Proxy({}, {
  get() {
    throw new Error(LINKING_ERROR);
  }
});
export const MqttEventEmitter = () => new NativeEventEmitter(MqttNative);
//# sourceMappingURL=NativeMqtt.js.map