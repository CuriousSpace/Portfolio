(function () {
  const brokerUrlEl = document.getElementById("broker-url");
  const protocolModeEl = document.getElementById("protocol-mode");
  const transportEl = document.getElementById("transport");
  const reconnectDelayEl = document.getElementById("reconnect-delay");
  const connectHeadersEl = document.getElementById("connect-headers");
  const subscribeTopicEl = document.getElementById("subscribe-topic");
  const sendDestinationEl = document.getElementById("send-destination");
  const sendHeadersEl = document.getElementById("send-headers");
  const sendBodyEl = document.getElementById("send-body");
  const presetNameEl = document.getElementById("preset-name");
  const presetListEl = document.getElementById("preset-list");
  const logEl = document.getElementById("log");
  const connectionStatusEl = document.getElementById("connection-status");
  const subscriptionStatusEl = document.getElementById("subscription-status");

  let client = null;
  let rawSocket = null;
  let subscription = null;

  function log(message) {
    const time = new Date().toLocaleTimeString();
    logEl.textContent += `[${time}] ${message}\n`;
    logEl.scrollTop = logEl.scrollHeight;
  }

  function setConnectionStatus(connected) {
    connectionStatusEl.textContent = connected ? "connected" : "disconnected";
    connectionStatusEl.className = connected ? "badge on" : "badge off";
  }

  function setSubscriptionStatus(topic) {
    if (topic) {
      subscriptionStatusEl.textContent = `subscribed: ${topic}`;
      subscriptionStatusEl.className = "badge subscribed";
      return;
    }
    subscriptionStatusEl.textContent = "not subscribed";
    subscriptionStatusEl.className = "badge off";
  }

  function parseJson(text, fieldName) {
    const trimmed = text.trim();
    if (!trimmed) {
      return {};
    }
    try {
      return JSON.parse(trimmed);
    } catch (error) {
      throw new Error(`${fieldName} JSON parse failed: ${error.message}`);
    }
  }

  function currentPresetPayload() {
    return {
      brokerUrl: brokerUrlEl.value.trim(),
      protocolMode: protocolModeEl.value,
      transport: transportEl.value,
      reconnectDelay: reconnectDelayEl.value.trim(),
      connectHeaders: connectHeadersEl.value,
      subscribeTopic: subscribeTopicEl.value.trim(),
      sendDestination: sendDestinationEl.value.trim(),
      sendHeaders: sendHeadersEl.value,
      sendBody: sendBodyEl.value
    };
  }

  function applyPreset(payload) {
    brokerUrlEl.value = payload.brokerUrl || "";
    protocolModeEl.value = payload.protocolMode || "stomp";
    transportEl.value = payload.transport || "websocket";
    reconnectDelayEl.value = payload.reconnectDelay || "5000";
    connectHeadersEl.value = payload.connectHeaders || "{\n}";
    subscribeTopicEl.value = payload.subscribeTopic || "";
    sendDestinationEl.value = payload.sendDestination || "";
    sendHeadersEl.value = payload.sendHeaders || "{\n}";
    sendBodyEl.value = payload.sendBody || "{\n  \"message\": \"hello\"\n}";
  }

  function loadPresets() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    } catch (error) {
      log(`[warn] preset localStorage parse failed: ${error.message}`);
      return {};
    }
  }

  function savePresets(presets) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(presets));
  }

  function refreshPresetOptions() {
    const presets = loadPresets();
    const names = Object.keys(presets).sort();
    presetListEl.innerHTML = "";
    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "select preset";
    presetListEl.appendChild(placeholder);

    names.forEach((name) => {
      const option = document.createElement("option");
      option.value = name;
      option.textContent = name;
      presetListEl.appendChild(option);
    });
  }

  function buildClient() {
    const brokerUrl = brokerUrlEl.value.trim();
    if (!brokerUrl) {
      throw new Error("Broker URL is required.");
    }

    const reconnectDelay = Number(reconnectDelayEl.value || 0);
    const connectHeaders = parseJson(connectHeadersEl.value, "connect headers");
    const transport = transportEl.value;

    const options = {
      reconnectDelay: Number.isFinite(reconnectDelay) ? reconnectDelay : 0,
      connectHeaders,
      debug: (value) => log(`[debug] ${value}`)
    };

    if (transport === "sockjs") {
      options.webSocketFactory = () => new SockJS(brokerUrl);
    } else {
      options.brokerURL = brokerUrl;
    }

    const stompClient = new StompJs.Client(options);

    stompClient.onConnect = (frame) => {
      setConnectionStatus(true);
      log("connected");
      if (frame && frame.headers) {
        log(`[connected-headers] ${JSON.stringify(frame.headers)}`);
      }
    };

    stompClient.onDisconnect = () => {
      setConnectionStatus(false);
      setSubscriptionStatus(null);
      subscription = null;
      log("disconnected");
    };

    stompClient.onStompError = (frame) => {
      const message = frame && frame.headers ? frame.headers["message"] || "" : "";
      log(`[stomp-error] ${message}`);
      if (frame && frame.body) {
        log(frame.body);
      }
    };

    stompClient.onWebSocketError = (event) => {
      log(`[ws-error] ${JSON.stringify(event)}`);
    };

    stompClient.onWebSocketClose = (event) => {
      setConnectionStatus(false);
      setSubscriptionStatus(null);
      subscription = null;
      log(`[ws-close] code=${event.code}, reason=${event.reason || ""}`);
    };

    return stompClient;
  }

  function buildRawSocket() {
    const brokerUrl = brokerUrlEl.value.trim();
    if (!brokerUrl) {
      throw new Error("Broker URL is required.");
    }

    const transport = transportEl.value;
    if (transport === "sockjs") {
      return new SockJS(brokerUrl);
    }
    return new WebSocket(brokerUrl);
  }

  function isStompMode() {
    return protocolModeEl.value === "stomp";
  }

  function ensureConnected() {
    if (isStompMode()) {
      if (!client || !client.connected) {
        throw new Error("Connect first before using this action.");
      }
      return;
    }

    if (!rawSocket || rawSocket.readyState !== 1) {
      throw new Error("Connect first before using this action.");
    }
  }

  document.getElementById("connect").onclick = () => {
    try {
      if (isStompMode()) {
        if (client && client.active) {
          log("already connected");
          return;
        }
        client = buildClient();
        client.activate();
        return;
      }

      if (rawSocket && (rawSocket.readyState === 0 || rawSocket.readyState === 1)) {
        log("already connected");
        return;
      }

      rawSocket = buildRawSocket();
      rawSocket.onopen = () => {
        setConnectionStatus(true);
        log("connected (raw)");
      };
      rawSocket.onmessage = (event) => {
        log(`[message] ${event.data}`);
      };
      rawSocket.onerror = (event) => {
        log(`[ws-error] ${JSON.stringify(event)}`);
      };
      rawSocket.onclose = (event) => {
        setConnectionStatus(false);
        setSubscriptionStatus(null);
        rawSocket = null;
        log(`[ws-close] code=${event.code || ""}, reason=${event.reason || ""}`);
      };
    } catch (error) {
      log(`[error] ${error.message}`);
    }
  };

  document.getElementById("disconnect").onclick = async () => {
    if (isStompMode()) {
      if (!client) {
        log("client not initialized");
        return;
      }
      await client.deactivate();
      return;
    }

    if (!rawSocket) {
      log("client not initialized");
      return;
    }
    rawSocket.close(1000, "manual-close");
  };

  document.getElementById("subscribe").onclick = () => {
    try {
      if (!isStompMode()) {
        log("[info] raw mode has no standard subscribe. If your server expects a subscribe message, send it manually.");
        return;
      }
      ensureConnected();
      const topic = subscribeTopicEl.value.trim();
      if (!topic) {
        throw new Error("Subscribe topic is required.");
      }
      if (subscription) {
        subscription.unsubscribe();
        subscription = null;
      }
      subscription = client.subscribe(topic, (message) => {
        log(`[message] ${message.body}`);
      });
      setSubscriptionStatus(topic);
      log(`subscribed: ${topic}`);
    } catch (error) {
      log(`[error] ${error.message}`);
    }
  };

  document.getElementById("unsubscribe").onclick = () => {
    if (!isStompMode()) {
      log("[info] raw mode has no standard unsubscribe.");
      return;
    }
    if (!subscription) {
      log("subscription not found");
      return;
    }
    subscription.unsubscribe();
    log(`unsubscribed: ${subscribeTopicEl.value.trim()}`);
    subscription = null;
    setSubscriptionStatus(null);
  };

  document.getElementById("send").onclick = () => {
    try {
      ensureConnected();
      const body = sendBodyEl.value;

      if (isStompMode()) {
        const destination = sendDestinationEl.value.trim();
        if (!destination) {
          throw new Error("Send destination is required.");
        }
        const headers = parseJson(sendHeadersEl.value, "send headers");
        client.publish({
          destination,
          headers,
          body
        });
        log(`[send] destination=${destination}`);
      } else {
        if (!body.trim()) {
          throw new Error("Body is required in raw mode.");
        }
        if (sendDestinationEl.value.trim()) {
          log("[info] destination is ignored in raw mode.");
        }
        if (sendHeadersEl.value.trim() && sendHeadersEl.value.trim() !== "{}") {
          log("[info] send headers are ignored in raw mode.");
        }
        rawSocket.send(body);
        log("[send-raw]");
      }
      if (body.trim()) {
        log(body);
      }
    } catch (error) {
      log(`[error] ${error.message}`);
    }
  };

  document.getElementById("clear-log").onclick = () => {
    logEl.textContent = "";
  };

  document.getElementById("save-preset").onclick = () => {
    const name = presetNameEl.value.trim();
    if (!name) {
      log("[error] preset name is required.");
      return;
    }
    const presets = loadPresets();
    presets[name] = currentPresetPayload();
    savePresets(presets);
    refreshPresetOptions();
    presetListEl.value = name;
    log(`[preset] saved: ${name}`);
  };

  document.getElementById("load-preset").onclick = () => {
    const name = presetListEl.value;
    if (!name) {
      log("[error] select a preset first.");
      return;
    }
    const presets = loadPresets();
    const payload = presets[name];
    if (!payload) {
      log(`[error] preset not found: ${name}`);
      return;
    }
    applyPreset(payload);
    presetNameEl.value = name;
    log(`[preset] loaded: ${name}`);
  };

  document.getElementById("delete-preset").onclick = () => {
    const name = presetListEl.value || presetNameEl.value.trim();
    if (!name) {
      log("[error] no preset name to delete.");
      return;
    }
    const presets = loadPresets();
    if (!presets[name]) {
      log(`[error] preset not found: ${name}`);
      return;
    }
    delete presets[name];
    savePresets(presets);
    refreshPresetOptions();
    presetNameEl.value = "";
    log(`[preset] deleted: ${name}`);
  };

  refreshPresetOptions();
  setConnectionStatus(false);
  setSubscriptionStatus(null);
})();
