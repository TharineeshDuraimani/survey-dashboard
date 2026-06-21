document.addEventListener("DOMContentLoaded", () => {

    const hamburger = document.getElementById("hamburger");
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");

    if (hamburger && sidebar && overlay) {

        hamburger.addEventListener("click", () => {

            sidebar.classList.toggle("show");
            overlay.classList.toggle("show");

        });

        overlay.addEventListener("click", () => {

            sidebar.classList.remove("show");
            overlay.classList.remove("show");

        });
    }

    const mobileSurveyBtn =
        document.getElementById("mobileSurveyBtn");

    const mobileSurveyMenu =
        document.getElementById("mobileSurveyMenu");

    if (mobileSurveyBtn && mobileSurveyMenu) {

        mobileSurveyBtn.addEventListener("click", () => {

            mobileSurveyMenu.classList.toggle("open");

        });
    }
    document
    .querySelectorAll(".sidebar a")
    .forEach(link => {

        link.addEventListener("click", () => {

            sidebar.classList.remove("show");
            overlay.classList.remove("show");

    });

});

});
