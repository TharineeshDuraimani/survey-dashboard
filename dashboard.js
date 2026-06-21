document.addEventListener("DOMContentLoaded", () => {

    initializeStatCards();
    initializeDashboardSearch();
    initializeSurveyRows();
    initializeTasks();
    initializeUploadDocumentsButton();

    updateClock();
    setInterval(updateClock, 1000);

    animateCounters();

});

/* ==========================================
   STAT CARD ANIMATION
========================================== */

function initializeStatCards() {

    const cards = document.querySelectorAll(".stat-card");

    cards.forEach((card, index) => {

        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";

        setTimeout(() => {

            card.style.transition = "all 0.5s ease";

            card.style.opacity = "1";
            card.style.transform = "translateY(0)";

        }, index * 150);

    });

}

/* ==========================================
   LIVE CLOCK
========================================== */

function updateClock() {

    const now = new Date();

    const time = now.toLocaleTimeString();

    const date = now.toLocaleDateString(
        "en-IN",
        {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    );

    const timeElement =
        document.getElementById("liveTime");

    const dateElement =
        document.getElementById("liveDate");

    if (timeElement) {
        timeElement.textContent = time;
    }

    if (dateElement) {
        dateElement.textContent = date;
    }

}

/* ==========================================
   COUNTER ANIMATION
========================================== */

function animateCounters() {

    const counters =
        document.querySelectorAll(".counter");

    counters.forEach(counter => {

        const target =
            Number(counter.dataset.target);

        let current = 0;

        const increment =
            target / 60;

        function update() {

            current += increment;

            if (current < target) {

                counter.textContent =
                    Math.floor(current)
                    .toLocaleString();

                requestAnimationFrame(update);

            } else {

                counter.textContent =
                    target.toLocaleString();

            }

        }

        update();

    });

}

/* ==========================================
   DASHBOARD SEARCH
========================================== */

function initializeDashboardSearch() {

    const search =
        document.getElementById(
            "dashboardSearch"
        );

    if (!search) return;

    search.addEventListener(
        "input",
        (e) => {

            const value =
                e.target.value
                .toLowerCase();

            const rows =
                document.querySelectorAll(
                    ".table-card tbody tr"
                );

            rows.forEach(row => {

                row.style.display =
                    row.innerText
                    .toLowerCase()
                    .includes(value)
                        ? ""
                        : "none";

            });

        }
    );

}

/* ==========================================
   RECENT SURVEY ROW CLICK
========================================== */

function initializeSurveyRows() {

    const rows =
        document.querySelectorAll(
            ".table-card tbody tr"
        );

    rows.forEach(row => {

        row.style.cursor = "pointer";

        row.addEventListener(
            "click",
            () => {

                const surveyId =
                    row.cells[0].textContent.trim();

                const vehicleNo =
                    row.cells[1].textContent.trim();

                const status =
                    row.cells[2].textContent.trim();

                localStorage.setItem(
                    "selectedVehicle",
                    JSON.stringify({
                        surveyNo: surveyId,
                        vehicleNo: vehicleNo,
                        status: status
                    })
                );

                window.location.href =
                    "vehicle-library.html";

            }
        );

    });

}

/* ==========================================
   TASK CHECKBOX PERSISTENCE
========================================== */

function initializeTasks() {

    const tasks =
        document.querySelectorAll(
            ".task-item input"
        );

    tasks.forEach((task, index) => {

        const storageKey =
            `task-${index}`;

        task.checked =
            localStorage.getItem(storageKey)
            === "true";

        task.addEventListener(
            "change",
            () => {

                localStorage.setItem(
                    storageKey,
                    task.checked
                );

            }
        );

    });

}

/* ==========================================
   UPLOAD DOCUMENTS BUTTON
========================================== */

function initializeUploadDocumentsButton() {

    const button =
        document.getElementById(
            "uploadDocumentsBtn"
        );

    if (!button) return;

    button.addEventListener(
        "click",
        () => {

            window.location.href =
                "survey-library.html";

        }
    );

}
