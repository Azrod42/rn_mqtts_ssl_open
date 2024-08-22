"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseProtocolString = exports.parseBrokerUrl = void 0;
var _Protocol = require("../models/Protocol");
const parseBrokerUrl = url => {
  const destructured = url.match(/^((mqtt[s]?|ws[s]?|tcp?|ssl?)?:(\/\/)([0-9a-zA-Z_\/\.\-]*):?(\d+))$/);
  if (!destructured || destructured.length != 6) {
    throw new Error(`Invalid broker url: ${url}`);
  }
  const [,, protocolStr,, host, portStr] = destructured;
  const port = parseInt(portStr);
  const protocol = parseProtocolString(protocolStr);
  const tls = protocol === _Protocol.Protocol.TCP_TLS || protocol === _Protocol.Protocol.WSS ? true : undefined;
  return {
    host: host,
    port,
    protocol,
    tls
  };
};
exports.parseBrokerUrl = parseBrokerUrl;
const parseProtocolString = protocolStr => {
  switch (protocolStr) {
    case 'mqtt':
    case 'tcp':
      return _Protocol.Protocol.TCP;
    case 'ssl':
    case 'mqtts':
      return _Protocol.Protocol.TCP_TLS;
    case 'ws':
      return _Protocol.Protocol.WS;
    case 'wss':
      return _Protocol.Protocol.WSS;
    default:
      throw new Error(`Invalid protocol: ${protocolStr}`);
  }
};
exports.parseProtocolString = parseProtocolString;
//# sourceMappingURL=helpers.js.map