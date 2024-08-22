import { Protocol } from './Protocol';
import type { Will } from './Will';
import type { Buffer } from 'buffer';
export type MqttOptions = {
    clientId?: string;
    username?: string;
    password?: string;
    keepaliveSec?: number;
    connectTimeoutMs?: number;
    will?: Will;
    tls?: boolean;
    ios_certKeyP12Base64?: String;
    android_caBase64?: String;
    android_certificateBase64?: String;
    android_privateKeyBase64?: string;
    keyStorePassword?: string;
    cleanSession?: boolean;
    protocol?: Protocol;
    protocolVersion?: number;
    reconnectPeriod?: number;
    host?: string;
    port?: number;
};
/**
 * This class serves to create an options object for the MQTT client.
 */
export declare class MqttOptionsBuilder {
    private _options;
    peek(field: string): any;
    uri(uri: string): MqttOptionsBuilder;
    uri(host: string, port: number, protocol: Protocol): MqttOptionsBuilder;
    clientId(clientId: string): MqttOptionsBuilder;
    username(username: string): MqttOptionsBuilder;
    password(password: string): MqttOptionsBuilder;
    keepalive(keepalive: number): MqttOptionsBuilder;
    connectTimeoutMs(connectTimeoutMs: number): MqttOptionsBuilder;
    will(will: Will): MqttOptionsBuilder;
    tls(tls: boolean): MqttOptionsBuilder;
    ca(ca: Buffer): MqttOptionsBuilder;
    android_caBase64(android_caBase64: String): MqttOptionsBuilder;
    clientCertificate(certificateDer: Buffer, keyRsaDer: Buffer, keyStorePassword: string): MqttOptionsBuilder;
    certificate(certificate: Buffer): MqttOptionsBuilder;
    android_certificateBase64(android_certificateBase64: String): MqttOptionsBuilder;
    keyStoreKey(keyStoreKey: string): MqttOptionsBuilder;
    keyStorePassword(keyStorePassword: string): MqttOptionsBuilder;
    cleanSession(cleanSession: boolean): MqttOptionsBuilder;
    protocolVersion(protocolVersion: number): MqttOptionsBuilder;
    reconnectPeriod(reconnectPeriod: number): MqttOptionsBuilder;
    build(): MqttOptions;
}
//# sourceMappingURL=MqttOptions.d.ts.map