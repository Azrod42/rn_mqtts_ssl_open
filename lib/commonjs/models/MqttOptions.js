"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MqttOptionsBuilder = void 0;
var _Protocol = require("./Protocol");
var _helpers = require("../utils/helpers");
/**
 * This class serves to create an options object for the MQTT client.
 */
class MqttOptionsBuilder {
  _options = {};
  peek(field) {
    return this._options[field];
  }
  uri(hostOrUri, port, protocol) {
    if (port === undefined || hostOrUri.includes(":")) {
      const uri = hostOrUri;
      const {
        host,
        port,
        protocol,
        tls
      } = (0, _helpers.parseBrokerUrl)(uri);
      this._options.host = host;
      this._options.port = port;
      this._options.protocol = protocol;
      this._options.tls = tls;
    } else {
      if (protocol === undefined) {
        throw new Error('Missing protocol prefix in broker url');
      }
      this._options.host = hostOrUri;
      this._options.port = port;
      this._options.protocol = protocol;
      this._options.tls = protocol === _Protocol.Protocol.TCP_TLS || protocol === _Protocol.Protocol.WSS;
    }
    return this;
  }
  clientId(clientId) {
    this._options.clientId = clientId;
    return this;
  }
  username(username) {
    this._options.username = username;
    return this;
  }
  password(password) {
    this._options.password = password;
    return this;
  }
  keepalive(keepalive) {
    this._options.keepaliveSec = keepalive;
    return this;
  }
  connectTimeoutMs(connectTimeoutMs) {
    this._options.connectTimeoutMs = connectTimeoutMs;
    return this;
  }
  will(will) {
    this._options.will = will;
    return this;
  }
  tls(tls) {
    if (this._options.tls !== undefined && this._options.tls !== tls) {
      throw new Error('TLS is required by the chosen protocol.');
    }
    if (this._options.protocol === _Protocol.Protocol.TCP && tls === true) {
      this._options.protocol = _Protocol.Protocol.TCP_TLS;
    }
    this._options.tls = tls;
    return this;
  }
  ca(ca) {
    this._options.android_caBase64 = ca.toString('base64');
    return this;
  }
  android_caBase64(android_caBase64) {
    this._options.android_caBase64 = android_caBase64;
    return this;
  }
  clientCertificate(certificateDer, keyRsaDer, keyStorePassword) {
    this._options.android_certificateBase64 = certificateDer.toString('base64');
    this._options.android_privateKeyBase64 = keyRsaDer.toString('base64');
    this._options.keyStorePassword = keyStorePassword;
    return this;
  }
  certificate(certificate) {
    this._options.android_certificateBase64 = certificate.toString('base64');
    return this;
  }
  android_certificateBase64(android_certificateBase64) {
    this._options.android_certificateBase64 = android_certificateBase64;
    return this;
  }
  keyStoreKey(keyStoreKey) {
    this._options.android_privateKeyBase64 = keyStoreKey;
    return this;
  }
  keyStorePassword(keyStorePassword) {
    this._options.keyStorePassword = keyStorePassword;
    return this;
  }
  cleanSession(cleanSession) {
    this._options.cleanSession = cleanSession;
    return this;
  }
  protocolVersion(protocolVersion) {
    this._options.protocolVersion = protocolVersion;
    return this;
  }
  reconnectPeriod(reconnectPeriod) {
    this._options.reconnectPeriod = reconnectPeriod;
    return this;
  }
  build() {
    if (this._options.host === undefined) {
      throw new Error('Please provide a broker url to connect to.');
    }
    return this._options;
  }
}
exports.MqttOptionsBuilder = MqttOptionsBuilder;
//# sourceMappingURL=MqttOptions.js.map