import type { MqttSubscription } from '../../models/MqttSubscription';
import type { PublishOptions } from '../../models/PublishOptions';
import type { MqttOptions } from 'react-native-mqtt';
import type { NativeMqtt } from '../../models/NativeMqtt';
type PublishedMsg = {
    topic: string;
    payloadBase64: string;
    publishOptions: PublishOptions;
};
declare class MqttNativeMock implements NativeMqtt {
    options: MqttOptions | undefined;
    connectionState: boolean;
    subscriptions: MqttSubscription[];
    publishedMessages: PublishedMsg[];
    resetMock(): void;
    addListener(_?: string): Promise<void>;
    removeListeners(_?: number): Promise<void>;
    createClient(options: MqttOptions): Promise<string>;
    connect(_: string): Promise<void>;
    disconnect(_: string): Promise<void>;
    reconnect(_: string): Promise<void>;
    isConnected(_: string): Promise<boolean>;
    subscribe(topics: MqttSubscription[], _: string): Promise<void>;
    unsubscribe(topics: string[], _: string): Promise<void>;
    publish(topic: string, payload: string, options: PublishOptions, _: string): Promise<void>;
    end(_1: string, _2: boolean): Promise<void>;
}
export declare const mockMqttNative: MqttNativeMock;
export {};
//# sourceMappingURL=MqttNative.mock.d.ts.map