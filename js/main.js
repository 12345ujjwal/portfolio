(function () {
  var P = PORTFOLIO;
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text) n.textContent = text;
    return n;
  }
  function list(items, cls) {
    var ul = el("ul", cls);
    items.forEach(function (t) { ul.appendChild(el("li", "", t)); });
    return ul;
  }
  function chips(items) {
    var d = el("div", "chips");
    items.forEach(function (t) { d.appendChild(el("span", "chip", t)); });
    return d;
  }
  function link(label, url, cls) {
    var a = el("a", cls || "btn", label);
    a.href = url;
    if (/^https?:/.test(url)) { a.target = "_blank"; a.rel = "noopener"; }
    return a;
  }

  document.querySelectorAll("[data-t]").forEach(function (n) { n.textContent = P[n.dataset.t]; });
  document.getElementById("resume").href = P.resume;
  document.getElementById("year").textContent = new Date().getFullYear();

  var about = document.getElementById("about-body");
  P.about.forEach(function (t) { about.appendChild(el("p", "", t)); });

  var skills = document.getElementById("skills-body");
  P.skills.forEach(function (s) {
    var row = el("div", "skill-row");
    row.appendChild(el("h3", "", s.group));
    row.appendChild(chips(s.items));
    skills.appendChild(row);
  });

  var projects = document.getElementById("projects-body");
  P.projects.forEach(function (p) {
    var art = el("article", "project");
    var head = el("div", "project-head");
    head.appendChild(el("h3", "", p.title));
    head.appendChild(el("p", "muted", p.subtitle));
    head.appendChild(chips(p.tech));
    var body = el("div", "project-body");
    body.appendChild(list(p.points));
    var links = el("div", "actions");
    p.links.forEach(function (l) { links.appendChild(link(l.label, l.url)); });
    body.appendChild(links);
    art.appendChild(head);
    art.appendChild(body);
    projects.appendChild(art);
  });

  var exp = document.getElementById("exp-body");
  P.experience.forEach(function (e) {
    var li = el("li");
    li.appendChild(el("h3", "", e.role + ", " + e.org));
    li.appendChild(el("p", "muted", e.when));
    li.appendChild(list(e.points));
    exp.appendChild(li);
  });

  var ach = document.getElementById("ach-body");
  [["Achievements", P.achievements], ["Education", P.education], ["Certificates", P.certificates]].forEach(function (g) {
    var col = el("div", "col");
    col.appendChild(el("h3", "", g[0]));
    g[1].forEach(function (i) {
      var b = el("div", "item");
      b.appendChild(el("strong", "", i.title));
      b.appendChild(el("p", "muted", i.text));
      col.appendChild(b);
    });
    ach.appendChild(col);
  });

  var contact = document.getElementById("contact-body");
  contact.appendChild(link("Email me", "mailto:" + P.email, "btn primary"));
  contact.appendChild(link("GitHub", P.github));
  contact.appendChild(link("LinkedIn", P.linkedin));

  var root = document.documentElement;
  document.getElementById("theme").addEventListener("click", function () {
    var next = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) {}
  });
  var burger = document.getElementById("burger"), menu = document.getElementById("menu");
  burger.addEventListener("click", function () {
    var open = menu.classList.toggle("open");
    burger.setAttribute("aria-expanded", open);
  });
  menu.addEventListener("click", function () { menu.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); });
})();
