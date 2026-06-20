document.addEventListener("DOMContentLoaded", () => {

    const cards =
    document.querySelectorAll(".stat-card");

    cards.forEach((card, index) => {

        card.style.opacity = "0";

        setTimeout(() => {

            card.style.transition =
            "all .5s ease";

            card.style.opacity = "1";

            card.style.transform =
            "translateY(0)";

        }, index * 150);

    });

});
function updateClock() {

    const now = new Date();

    const time =
        now.toLocaleTimeString();

    const date =
        now.toLocaleDateString(
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

updateClock();

setInterval(updateClock, 1000);
function animateCounters(){

    const counters =
    document.querySelectorAll(".counter");

    counters.forEach(counter => {

        const target =
        Number(counter.dataset.target);

        let current = 0;

        const increment =
        target / 60;

        const update = () => {

            current += increment;

            if(current < target){

                counter.textContent =
                Math.floor(current)
                .toLocaleString();

                requestAnimationFrame(update);

            }else{

                counter.textContent =
                target.toLocaleString();
            }
        };

        update();
    });
}

animateCounters();