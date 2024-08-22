import type { MqttOptions } from './models/MqttOptions';
import type { MqttSubscription } from './models/MqttSubscription';
import type { PublishOptions } from './models/PublishOptions';
import { MqttEvent } from './models/events/MqttEvent';
export * from './models/events/MqttEvent';
export * from './models/Protocol';
export * from './models/MqttOptions';
/**
 * MqttClient is a Typescript wrapper for native MQTT clients
 *
 * @param options configuration options for the client
 */
export declare class MqttClient {
    private _options;
    private _clientRef?;
    private _eventHandler;
    private _eventEmitter;
    constructor(options: MqttOptions);
    init(): Promise<void>;
    on(event: MqttEvent.CONNECTED, cb: () => void): this;
    on(event: MqttEvent.CONNECTING, cb: () => void): this;
    on(event: MqttEvent.CONNECTION_LOST, cb: (errorMsg?: string, errorCode?: number, stackTrace?: string) => void): this;
    on(event: MqttEvent.SUBSCRIBED, cb: (topic: string) => void): this;
    on(event: MqttEvent.UNSUBSCRIBED, cb: (topic: string) => void): this;
    on(event: MqttEvent.MESSAGE_RECEIVED, cb: (topic: string, payload: Uint8Array) => void): this;
    on(event: MqttEvent.MESSAGE_PUBLISHED, cb: (topic: string, payload: Uint8Array) => void): this;
    on(event: MqttEvent.DISCONNECTED, cb: () => void): this;
    on(event: MqttEvent.EXCEPTION, cb: (errorMsg?: string, errorCode?: number, stackTrace?: string) => void): this;
    on(event: MqttEvent.CLOSED, cb: () => void): this;
    connect(): void;
    connectAsync(): Promise<void>;
    disconnect(): void;
    disconnectAsync(): Promise<void>;
    subscribe(...topics: MqttSubscription[]): void;
    subscribeAsync(...topics: MqttSubscription[]): Promise<void>;
    unsubscribe(topic: string | string[]): void;
    unsubscribeAsync(topic: string | string[]): Promise<void>;
    publish(topic: string, payload: Uint8Array, options?: PublishOptions): void;
    publishAsync(topic: string, payload: Uint8Array, options?: PublishOptions): Promise<void>;
    reconnect(): void;
    isConnected(): Promise<boolean>;
    end(force?: Boolean): void;
    endAsync(force?: Boolean): Promise<void>;
    close: (force?: Boolean) => void;
    closeAsync: (force?: Boolean) => Promise<void>;
    private _removeEventListeners;
    private _setupEventListeners;
    private _addEventListener;
}
//# sourceMappingURL=index.d.ts.map