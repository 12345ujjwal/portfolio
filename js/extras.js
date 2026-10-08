(function () {
  var P = PORTFOLIO;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function $(s) { return document.querySelector(s); }
  function mk(tag, cls, text) { var n = document.createElement(tag); if (cls) n.className = cls; if (text) n.textContent = text; return n; }
  function openUrl(u) { window.open(u, "_blank", "noopener"); }
  var themeBtn = $("#theme");

  /* 1. Interactive terminal */
  var out = $("#term-out"), input = $("#term-input"), hist = [], hi = 0;
  function print(lines, cls) {
    [].concat(lines).forEach(function (t) { out.appendChild(mk("div", "ln" + (cls ? " " + cls : ""), t)); });
    out.scrollTop = out.scrollHeight;
  }
  var cmds = {
    help: function () { print(["Commands:", "  whoami   about   skills   projects", "  experience   contact   resume", "  open github | open linkedin", "  theme   clear"]); },
    whoami: function () { print([P.name, P.role, P.summary]); },
    about: function () { print(P.about); },
    skills: function () { print(P.skills.map(function (s) { return s.group + ": " + s.items.join(", "); })); },
    projects: function () { print(P.projects.map(function (p) { return "- " + p.title + ": " + p.subtitle; })); },
    experience: function () { print(P.experience.map(function (e) { return e.role + ", " + e.org + " (" + e.when + ")"; })); },
    contact: function () { print(["email:    " + P.email, "github:   " + P.github, "linkedin: " + P.linkedin]); },
    resume: function () { print("Opening resume..."); openUrl(P.resume); },
    theme: function () { themeBtn.click(); print("Theme switched."); },
    clear: function () { out.textContent = ""; },
    ls: function () { print("about  skills  projects  experience  contact  resume"); }
  };
  var alias = { "ls projects": "projects", "cat skills": "skills", "cat skills.txt": "skills", "cat about": "about", "cat resume": "resume" };
  function run(raw) {
    var c = raw.trim().toLowerCase().replace(/\s+/g, " ");
    if (!c) return;
    print("$ " + raw.trim(), "cmd");
    c = alias[c] || c;
    if (c === "open github") { print("Opening GitHub..."); openUrl(P.github); }
    else if (c === "open linkedin") { print("Opening LinkedIn..."); openUrl(P.linkedin); }
    else if (cmds[c]) cmds[c]();
    else print("command not found: " + c + ". Type help to see commands.", "err");
  }
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") { hist.push(input.value); hi = hist.length; run(input.value); input.value = ""; }
    else if (e.key === "ArrowUp" && hi > 0) { e.preventDefault(); input.value = hist[--hi]; }
    else if (e.key === "ArrowDown") { e.preventDefault(); if (hi < hist.length - 1) input.value = hist[++hi]; else { hi = hist.length; input.value = ""; } }
  });
  ["help", "projects", "skills", "contact"].forEach(function (c) {
    var b = mk("button", "chip-btn", c); b.type = "button";
    b.addEventListener("click", function () { run(c); });
    $("#term-chips").appendChild(b);
  });
  (function intro() {
    var text = "whoami", i = 0;
    function done() { run(text); print("Type help to see all commands.", "hint"); }
    function step() {
      if (i < text.length) { input.value += text[i++]; setTimeout(step, 90); }
      else setTimeout(function () { input.value = ""; done(); }, 350);
    }
    if (reduce) done(); else setTimeout(step, 500);
  })();

  /* 2. Last-deployed badge (GitHub Actions status) */
  function ago(iso) {
    var s = (Date.now() - new Date(iso)) / 1000;
    if (s < 3600) return Math.max(1, Math.round(s / 60)) + " min ago";
    if (s < 86400) return Math.round(s / 3600) + " h ago";
    return Math.round(s / 86400) + " days ago";
  }
  if (P.repo) {
    fetch("https://api.github.com/repos/" + P.repo + "/actions/runs?per_page=1&status=completed")
      .then(function (r) { return r.ok ? r.json() : Promise.reject(); })
      .then(function (j) {
        var run = j.workflow_runs && j.workflow_runs[0];
        if (!run) return;
        var ok = run.conclusion === "success", a = $("#deploy");
        a.textContent = "Last deploy " + ago(run.updated_at) + " \u00b7 " + run.head_sha.slice(0, 7) + " \u00b7 " + (ok ? "passing" : "failing");
        a.href = run.html_url;
        a.className = "deploy " + (ok ? "ok" : "bad");
        a.hidden = false;
      }).catch(function () {});
  }

  /* 3. Clickable architecture diagram */
  var info = $("#node-info");
  function showNode(g) {
    var n = P.nodes[g.dataset.node];
    if (!n) return;
    document.querySelectorAll("[data-node]").forEach(function (x) { x.classList.toggle("sel", x === g); });
    info.textContent = "";
    info.appendChild(mk("h3", "", n.title));
    info.appendChild(mk("p", "", n.text));
    info.appendChild(mk("p", "muted", n.status));
  }
  document.querySelectorAll("[data-node]").forEach(function (g) {
    g.addEventListener("click", function () { showNode(g); });
    g.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); showNode(g); } });
  });
  showNode($('[data-node="cloudfront"]'));

  /* 4. Command palette (Ctrl/Cmd + K) */
  var dlg = $("#palette"), q = $("#pal-q"), listEl = $("#pal-list"), act = 0, shown = [];
  function go(h) { return function () { location.hash = h; }; }
  var actions = [
    ["Go to About", go("#about")], ["Go to Skills", go("#skills")], ["Go to Architecture", go("#architecture")],
    ["Go to Projects", go("#projects")], ["Go to Experience", go("#experience")], ["Go to Achievements", go("#achievements")], ["Go to Contact", go("#contact")],
    ["Switch theme", function () { themeBtn.click(); }],
    ["Open terminal", function () { window.scrollTo({ top: 0 }); input.focus(); }],
    ["Open GitHub", function () { openUrl(P.github); }], ["Open LinkedIn", function () { openUrl(P.linkedin); }],
    ["Download resume", function () { openUrl(P.resume); }], ["Send email", function () { location.href = "mailto:" + P.email; }]
  ];
  function draw() {
    var t = q.value.toLowerCase();
    shown = actions.filter(function (a) { return a[0].toLowerCase().indexOf(t) > -1; });
    if (act >= shown.length) act = 0;
    listEl.textContent = "";
    shown.forEach(function (a, i) {
      var li = mk("li", i === act ? "on" : "", a[0]);
      li.setAttribute("role", "option");
      li.addEventListener("click", function () { choose(i); });
      listEl.appendChild(li);
    });
    if (!shown.length) listEl.appendChild(mk("li", "muted", "No match"));
  }
  function choose(i) { var a = shown[i]; if (!a) return; dlg.close(); a[1](); }
  function openPal() { q.value = ""; act = 0; draw(); dlg.showModal(); q.focus(); }
  q.addEventListener("input", function () { act = 0; draw(); });
  q.addEventListener("keydown", function (e) {
    var n = Math.max(shown.length, 1);
    if (e.key === "ArrowDown") { e.preventDefault(); act = (act + 1) % n; draw(); }
    else if (e.key === "ArrowUp") { e.preventDefault(); act = (act - 1 + n) % n; draw(); }
    else if (e.key === "Enter") { e.preventDefault(); choose(act); }
  });
  dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
  $("#cmdk").addEventListener("click", openPal);
  document.addEventListener("keydown", function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); if (!dlg.open) openPal(); }
  });
})();
