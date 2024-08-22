import { NativeEventEmitter } from 'react-native';
import type { PublishOptions } from './PublishOptions';
import type { MqttOptions } from './MqttOptions';
import type { MqttSubscription } from './MqttSubscription';
export type NativeMqtt = {
    addListener(eventName?: string): Promise<void>;
    removeListeners(count?: number): Promise<void>;
    createClient(options: MqttOptions): Promise<string>;
    connect(clientRef: string | undefined): Promise<void>;
    disconnect(clientRef: string | undefined): Promise<void>;
    reconnect(clientRef: string | undefined): Promise<void>;
    isConnected(clientRef: string | undefined): Promise<boolean>;
    subscribe(topics: MqttSubscription[], clientRef: string | undefined): Promise<void>;
    unsubscribe(topics: string[], clientRef: string | undefined): Promise<void>;
    publish(topic: string, payload: string, options: PublishOptions, clientRef: string | undefined): Promise<void>;
    end(clientRef: string | undefined, force: Boolean): Promise<void>;
};
export declare const MqttNative: any;
export declare const MqttEventEmitter: () => NativeEventEmitter;
//# sourceMappingURL=NativeMqtt.d.ts.map