(function () {
        "use strict";
        var $ = function (x) {
            return document.getElementById(x);
          },
          KEY = "ledgernight:v1",
          data = { items: [], budget: 0 };
        try {
          data = Object.assign(
            data,
            JSON.parse(localStorage.getItem(KEY) || "{}"),
          );
        } catch (x) {}
        $("date").value = new Date().toISOString().slice(0, 10);
        function save() {
          localStorage.setItem(KEY, JSON.stringify(data));
        }
        function money(n) {
          return (
            "₹" +
            n.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
          );
        }
        function visible() {
          var q = $("search").value.toLowerCase(),
            type = $("filter").value,
            month = $("month").value;
          return data.items.filter(function (x) {
            return (
              (!q || (x.title + " " + x.category).toLowerCase().includes(q)) &&
              (type === "all" || x.type === type) &&
              (!month || x.date.slice(0, 7) === month)
            );
          });
        }
        function draw() {
          var items = visible(),
            inc = items
              .filter(function (x) {
                return x.type === "income";
              })
              .reduce(function (a, x) {
                return a + x.amount;
              }, 0),
            exp = items
              .filter(function (x) {
                return x.type === "expense";
              })
              .reduce(function (a, x) {
                return a + x.amount;
              }, 0);
          $("income").textContent = money(inc);
          $("expenses").textContent = money(exp);
          $("balance").textContent = money(inc - exp);
          $("budgetText").textContent = money(data.budget);
          $("budgetBar").style.width =
            Math.min(100, data.budget ? (exp / data.budget) * 100 : 0) + "%";
          $("count").textContent =
            items.length + " entr" + (items.length === 1 ? "y" : "ies");
          $("list").innerHTML = items.length
            ? ""
            : '<p class="empty">No matching transactions yet.</p>';
          items
            .sort(function (a, b) {
              return b.date.localeCompare(a.date);
            })
            .forEach(function (x) {
              var row = document.createElement("div");
              row.className = "tx";
              row.innerHTML =
                "<div><b></b><small></small></div><span class='value " +
                x.type +
                "'></span><button aria-label='Delete'>×</button>";
              row.querySelector("b").textContent = x.title;
              row.querySelector("small").textContent =
                x.category +
                " · " +
                new Date(x.date + "T12:00").toLocaleDateString();
              row.querySelector(".value").textContent =
                (x.type === "expense" ? "−" : "+") + money(x.amount);
              row.querySelector("button").onclick = function () {
                data.items = data.items.filter(function (y) {
                  return y.id !== x.id;
                });
                save();
                draw();
              };
              $("list").appendChild(row);
            });
        }
        function addSample() {
          if (
            data.items.length &&
            !confirm("Add sample entries to your existing data?")
          )
            return;
          var d = new Date().toISOString().slice(0, 10);
          data.items = data.items.concat([
            {
              id: crypto.randomUUID(),
              title: "Freelance payment",
              amount: 18500,
              type: "income",
              category: "Salary",
              date: d,
            },
            {
              id: crypto.randomUUID(),
              title: "Groceries",
              amount: 1640,
              type: "expense",
              category: "Food",
              date: d,
            },
            {
              id: crypto.randomUUID(),
              title: "Metro pass",
              amount: 800,
              type: "expense",
              category: "Transport",
              date: d,
            },
          ]);
          data.budget = data.budget || 10000;
          save();
          draw();
        }
        $("form").onsubmit = function (ev) {
          ev.preventDefault();
          var title = $("title").value.trim(),
            amount = Number($("amount").value),
            budget = Number($("budget").value || data.budget),
            error = "";
          if (!title) error = "Add a description.";
          else if (!Number.isFinite(amount) || amount <= 0)
            error = "Enter an amount greater than zero.";
          else if (budget < 0) error = "Budget cannot be negative.";
          $("error").textContent = error;
          if (error) return;
          data.items.push({
            id: crypto.randomUUID(),
            title: title,
            amount: Math.round(amount * 100) / 100,
            type: $("type").value,
            category: $("category").value,
            date: $("date").value,
          });
          data.budget = budget;
          save();
          $("title").value = "";
          $("amount").value = "";
          draw();
        };
        ["search", "filter", "month"].forEach(function (id) {
          $(id).oninput = draw;
        });
        $("sample").onclick = addSample;
        $("clear").onclick = function () {
          if (confirm("Delete all local transactions?")) {
            data = { items: [], budget: 0 };
            save();
            draw();
          }
        };
        $("export").onclick = function () {
          var rows = ["Date,Type,Category,Description,Amount"].concat(
              data.items.map(function (x) {
                return [
                  x.date,
                  x.type,
                  x.category,
                  '"' + x.title.replaceAll('"', '""') + '"',
                  x.amount.toFixed(2),
                ].join(",");
              }),
            ),
            blob = new Blob([rows.join("\n")], { type: "text/csv" }),
            a = document.createElement("a");
          a.href = URL.createObjectURL(blob);
          a.download = "ledger-night.csv";
          a.click();
          setTimeout(function () {
            URL.revokeObjectURL(a.href);
          }, 500);
        };
        draw();
      })();
