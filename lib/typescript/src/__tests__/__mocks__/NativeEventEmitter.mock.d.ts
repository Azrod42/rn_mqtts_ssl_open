declare class NativeEventEmitterMock {
    isTestEventEmitter: boolean;
    listeners: {
        event: string;
        callback: (event: any) => void;
    }[];
    constructor(_: any);
    resetMock(): void;
    triggerEvent(eventType: string, params: any): void;
    removeAllListeners(eventType: string): void;
    addListener(eventType: string, callback: (event: any) => void): void;
}
export declare const mockEmitter: NativeEventEmitterMock;
export {};
//# sourceMappingURL=NativeEventEmitter.mock.d.ts.map