const surveys = [

{
    vehicleNo: "TN38AB1234",
    surveyNo: "SV001",
    completion: 100
},

{
    vehicleNo: "TN38XY5678",
    surveyNo: "SV002",
    completion: 70
},

{
    vehicleNo: "TN39GH9012",
    surveyNo: "SV003",
    completion: 25
}

];

document.addEventListener(
"DOMContentLoaded",
() => {

    renderSurveys();

});
function getCompletionHTML(
    percentage
){

    const isCompleted =
    percentage === 100;

    return `

    <div class="completion-container">

        <div class="completion-top">

            ${
                isCompleted
                ?

                `<span class="completed-label">

                    <i class="fas fa-circle-check"></i>

                    Completed

                </span>`

                :

                `<span>

                    ${percentage}%

                </span>`
            }

        </div>

        <div class="completion-bar">

            <div
                class="completion-fill
                ${isCompleted ? "completed" : ""}"

                style="width:${percentage}%">

            </div>

        </div>

    </div>

    `;
}
function renderSurveys(){

    const container =
    document.getElementById(
        "surveyContainer"
    );

    if(!container) return;

    container.innerHTML = "";

    surveys.forEach(survey => {

        container.innerHTML += `

        <div class="card vehicle-card">

            <div class="vehicle-header">

                <div>
                    <strong>${survey.vehicleNo}</strong>
                </div>

                <div>
                    ${survey.surveyNo}
                </div>

                <div>
                    ${getCompletionHTML(
                        survey.completion
                    )}
                </div>

                <button
                    class="open-btn open"
                    data-vehicle="${survey.vehicleNo}"
                    data-survey="${survey.surveyNo}"
                    data-completion="${survey.completion}">

                    <i class="fas fa-folder-open"></i>
                    Open

                </button>

            </div>

        </div>

        `;

    });

}
document.addEventListener("click", e => {

    const btn = e.target.closest(".open-btn");

    if(!btn) return;

    localStorage.setItem(
        "selectedVehicle",
        JSON.stringify({
            vehicleNo: btn.dataset.vehicle,
            surveyNo: btn.dataset.survey,
            completion: btn.dataset.completion
        })
    );

    window.location.href =
    "vehicle-library.html";

});
const searchInput =
document.getElementById("searchInput");

if(searchInput){

    searchInput.addEventListener("input", e => {

        const value =
        e.target.value.toLowerCase();

        document
        .querySelectorAll(".vehicle-card")
        .forEach(card => {

            card.style.display =
            card.innerText
            .toLowerCase()
            .includes(value)
            ? "block"
            : "none";

        });

    });

}
