import { Protocol } from '../models/Protocol';
export type UrlData = {
    host: string;
    port: number;
    protocol: Protocol;
    tls?: boolean;
};
export declare const parseBrokerUrl: (url: string) => UrlData;
export declare const parseProtocolString: (protocolStr: string) => Protocol;
//# sourceMappingURL=helpers.d.ts.map