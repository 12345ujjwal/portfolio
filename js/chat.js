(function () {
  var P = PORTFOLIO;
  if (!P.chatApi) return; // widget stays hidden until the API URL is set in data.js
  function mk(tag, cls, text) { var n = document.createElement(tag); if (cls) n.className = cls; if (text) n.textContent = text; return n; }

  var history = [], busy = false;
  var fab = mk("button", "chat-fab", "Ask AI");
  fab.type = "button"; fab.setAttribute("aria-expanded", "false"); fab.setAttribute("aria-controls", "chat-panel");
  var panel = mk("section", "chat"); panel.id = "chat-panel"; panel.hidden = true; panel.setAttribute("aria-label", "Ask about Ujjwal");
  var head = mk("div", "chat-head");
  head.appendChild(mk("strong", "", "Ask about Ujjwal"));
  var close = mk("button", "icon", "Close"); close.type = "button";
  head.appendChild(close);
  var log = mk("div", "chat-log"); log.setAttribute("role", "log"); log.setAttribute("aria-live", "polite");
  var chips = mk("div", "term-chips chat-chips");
  var form = mk("form", "chat-form");
  var input = mk("input"); input.type = "text"; input.maxLength = 300; input.placeholder = "Ask about projects, skills..."; input.setAttribute("aria-label", "Your question");
  var send = mk("button", "btn primary", "Send"); send.type = "submit";
  form.appendChild(input); form.appendChild(send);
  panel.appendChild(head); panel.appendChild(log); panel.appendChild(chips);
  panel.appendChild(mk("p", "chat-note muted", "AI-generated answers can be wrong. Email Ujjwal to confirm anything important."));
  panel.appendChild(form);
  document.body.appendChild(fab); document.body.appendChild(panel);

  function bubble(role, text) { var b = mk("div", "msg " + role, text); log.appendChild(b); log.scrollTop = log.scrollHeight; return b; }
  bubble("bot", "Hi! I'm an AI assistant that answers questions about Ujjwal's skills, projects and experience.");

  function toggle(open) {
    panel.hidden = !open; fab.setAttribute("aria-expanded", String(open));
    if (open) input.focus(); else fab.focus();
  }
  fab.addEventListener("click", function () { toggle(panel.hidden); });
  close.addEventListener("click", function () { toggle(false); });
  panel.addEventListener("keydown", function (e) { if (e.key === "Escape") toggle(false); });

  function ask(text) {
    text = text.trim();
    if (!text || busy) return;
    busy = true; send.disabled = true; input.value = "";
    bubble("user", text);
    var wait = bubble("bot", "Thinking...");
    fetch(P.chatApi, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: history.concat([{ role: "user", text: text }]) })
    })
      .then(function (r) { return r.ok ? r.json() : Promise.reject(); })
      .then(function (j) {
        wait.textContent = j.reply;
        history.push({ role: "user", text: text }, { role: "assistant", text: j.reply });
        history = history.slice(-6);
      })
      .catch(function () { wait.textContent = "Sorry, I can't answer right now. Please try again, or email Ujjwal."; wait.classList.add("err"); })
      .then(function () { busy = false; send.disabled = false; log.scrollTop = log.scrollHeight; });
  }
  form.addEventListener("submit", function (e) { e.preventDefault(); ask(input.value); });
  (P.chatPrompts || []).forEach(function (t) {
    var b = mk("button", "chip-btn", t); b.type = "button";
    b.addEventListener("click", function () { ask(t); });
    chips.appendChild(b);
  });
})();
