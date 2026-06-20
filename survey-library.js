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

    container.innerHTML = "";

    surveys.forEach(survey => {

        container.innerHTML += `

        <div class="card vehicle-card">

            <div class="vehicle-header">

                <div>

                    <strong>
                        ${survey.vehicleNo}
                    </strong>

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
                    class="open-btn open">
                    <i class="fas fa-chevron-down"></i>
                    Open

                </button>

            </div>

            <div class="vehicle-content">

                <!-- REPORTS -->

                <div class="folder">

                    <div class="folder-header">

                        <span>
                            📁 Reports
                        </span>

                        <i class="fas fa-chevron-down"></i>

                    </div>

                    <div class="folder-content">

                        <div class="folder-item">

                            Interim 1

                            <button
                                class="edit-btn">

                                Edit

                            </button>

                        </div>

                        <div class="folder-item">

                            Interim 2

                            <button
                                class="edit-btn">

                                Edit

                            </button>

                        </div>

                        <div class="folder-item">

                            Final Report

                            <button
                                class="edit-btn">

                                Edit

                            </button>

                        </div>

                    </div>

                </div>

                <!-- LETTERS -->

                <div class="folder">

                    <div class="folder-header">

                        <span>
                            📁 Letters
                        </span>

                        <i class="fas fa-chevron-down"></i>

                    </div>

                    <div class="folder-content">

                        <div class="folder-item">

                            LOI 1

                            <button
                                class="edit-btn">

                                Edit

                            </button>

                        </div>

                        <div class="folder-item">

                            LOR 1

                            <button
                                class="edit-btn">

                                Edit

                            </button>

                        </div>

                    </div>

                </div>

                <!-- DOCUMENTS -->

                <div class="folder">

                    <div class="folder-header">

                        <span>
                            📁 Documents
                        </span>

                        <i class="fas fa-chevron-down"></i>

                    </div>

                    <div class="folder-content">

                        <div class="sub-folder">

                            <div class="sub-folder-header">

                                📁 Vehicle Images

                            </div>

                            <div class="sub-folder-content">

                                <div class="folder-item">

                                    Front.jpg

                                    <button class="edit-btn">
                                        Edit
                                    </button>

                                </div>

                                <div class="folder-item">

                                    Rear.jpg

                                    <button class="edit-btn">
                                        Edit
                                    </button>

                                </div>

                            </div>

                        </div>

                        <div class="sub-folder">

                            <div class="sub-folder-header">

                                📁 Vehicle Documents

                            </div>

                            <div class="sub-folder-content">

                                <div class="folder-item">

                                    RC.pdf

                                    <button class="edit-btn">
                                        Edit
                                    </button>

                                </div>

                                <div class="folder-item">

                                    Insurance.pdf

                                    <button class="edit-btn">
                                        Edit
                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

        `;
    });

    initializeAccordions();
}

function initializeAccordions(){

    document
.querySelectorAll(".open-btn")
.forEach(btn => {

    btn.addEventListener(
        "click",
        () => {

            const card =
            btn.closest(".vehicle-card");

            card.classList.toggle("active");

            if(card.classList.contains("active")){

                btn.innerHTML =
                `<i class="fas fa-chevron-up"></i>
                 Close`;

                btn.classList.remove("open");
                btn.classList.add("close");

            }
            else{

                btn.innerHTML =
                `<i class="fas fa-chevron-down"></i>
                 Open`;

                btn.classList.remove("close");
                btn.classList.add("open");

            }

        });
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

    document
    .querySelectorAll(".sub-folder-header")
    .forEach(folder => {

        folder.addEventListener(
            "click",
            () => {

                folder.parentElement
                      .classList
                      .toggle("active");

            });
    });
}