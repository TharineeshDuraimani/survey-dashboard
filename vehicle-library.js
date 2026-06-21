const data =
JSON.parse(
localStorage.getItem(
"selectedVehicle"
)
);

if(data){

    document.getElementById(
    "vehicleNo"
    ).textContent =
    data.vehicleNo;

    document.getElementById(
    "surveyNo"
    ).textContent =
    data.surveyNo;

    document.getElementById(
    "completionText"
    ).textContent =
    `Completion: ${data.completion}%`;

}

document
.querySelector(".back-btn")
.addEventListener("click", () => {

    localStorage.removeItem(
        "selectedVehicle"
    );

    window.location.href =
    "survey-library.html";

});
document
.querySelectorAll(".folder-header")
.forEach(folder => {

    folder.addEventListener(
        "click",
        () => {

            folder.parentElement
                  .classList
                  .toggle("active");

        });
});