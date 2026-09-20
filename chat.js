(() => {
    const socket = typeof io === "function" ? io() : null;
    const dialog = document.getElementById("name-dialog");
    const nameForm = document.getElementById("name-form");
    const nameInput = document.getElementById("name-input");
    const form = document.getElementById("chat-form");
    const input = document.getElementById("message-input");
    const sendButton = form.querySelector("button");
    const messages = document.getElementById("messages");
    const status = document.getElementById("status");
    const connectionState = document.getElementById("connection-state");
    const onlineCount = document.getElementById("online-count");

    let joined = false;

    function setConnection(text, connected = false) {
        status.textContent = text;
        if (connectionState) {
            connectionState.textContent = connected ? "Connected" : "Connecting";
        }
    }

    function setChatEnabled(enabled) {
        input.disabled = !enabled;
        sendButton.disabled = !enabled;
    }

    function addMessage(message) {
        const item = document.createElement("li");
        const author = message.name || "Guest";
        const text = message.text || "";
        const timestamp = message.time ? new Date(message.time) : new Date();

        item.className = "message";
        if (author === nameInput.value.trim()) item.classList.add("mine");

        const authorElement = document.createElement("strong");
        authorElement.textContent = author;

        const timeElement = document.createElement("time");
        timeElement.dateTime = timestamp.toISOString();
        timeElement.textContent = timestamp.toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit"
        });

        const textElement = document.createElement("span");
        textElement.textContent = text;

        item.append(authorElement, timeElement, textElement);
        messages.appendChild(item);
        messages.scrollTop = messages.scrollHeight;
    }

    function addSystemMessage(text) {
        const item = document.createElement("li");
        item.className = "system";
        item.textContent = text;
        messages.appendChild(item);
        messages.scrollTop = messages.scrollHeight;
    }

    nameForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = nameInput.value.trim().replace(/\s+/g, " ").slice(0, 24);
        if (!name || !socket) return;

        nameInput.value = name;
        localStorage.setItem("farius-chat-name", name);
        socket.emit("join", name);
        joined = true;

        if (typeof dialog.close === "function") dialog.close();
        else dialog.removeAttribute("open");

        if (socket.connected) {
            setChatEnabled(true);
            input.focus();
        }
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const text = input.value.trim();
        if (!text || !socket || !socket.connected || !joined) return;

        socket.emit("chat message", text);
        input.value = "";
        input.focus();
    });

    const savedName = localStorage.getItem("farius-chat-name");
    if (savedName) nameInput.value = savedName;

    if (!socket) {
        setConnection("Chat service unavailable");
        return;
    }

    socket.on("connect", () => {
        setConnection("Connected", true);
        if (joined) {
            setChatEnabled(true);
            input.focus();
        }
    });

    socket.on("disconnect", () => {
        setConnection("Disconnected. Reconnecting...");
        setChatEnabled(false);
    });

    socket.on("online count", (count) => {
        onlineCount.textContent = Number(count) || 0;
    });

    socket.on("chat history", (history) => {
        messages.replaceChildren();
        if (Array.isArray(history)) history.forEach(addMessage);
    });

    socket.on("chat message", addMessage);
    socket.on("system message", addSystemMessage);

    nameInput.focus();
})();
