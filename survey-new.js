document.addEventListener("DOMContentLoaded", () => {

    const sections =
        document.querySelectorAll(".form-section");

    sections.forEach((section, index) => {

        section.style.opacity = "0";
        section.style.transform = "translateY(20px)";

        setTimeout(() => {

            section.style.transition =
                "all .5s ease";

            section.style.opacity = "1";

            section.style.transform =
                "translateY(0)";

        }, index * 150);

    });

});

document.addEventListener("DOMContentLoaded", () => {

    generateSurveyId();

    initializeSectionToggles();

    initializeDamageSelector();

    initializePhotoPreview();

    initializeSurveyButtons();

    initializeConditionalFields();

});

function generateSurveyId(){

    const id =
        "SV" +
        Date.now()
        .toString()
        .slice(-6);

    const surveyField =
        document.getElementById("surveyId");

    const surveyLabel =
        document.getElementById("generatedSurveyId");

    if(surveyField)
        surveyField.value = id;

    if(surveyLabel)
        surveyLabel.textContent = id;
}

function initializeDamageSelector(){

    const buttons =
    document.querySelectorAll(".damage-part");

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            button.classList.toggle("selected");

        });

    });
}

function initializePhotoPreview(){

    const input =
    document.getElementById("vehiclePhotos");

    const preview =
    document.getElementById("photoPreview");

    if(!input || !preview) return;

    input.addEventListener("change", () => {

        preview.innerHTML = "";

        [...input.files].forEach(file => {

            const reader =
            new FileReader();

            reader.onload = e => {

                const img =
                document.createElement("img");

                img.src =
                e.target.result;

                preview.appendChild(img);
            };

            reader.readAsDataURL(file);

        });

    });
}

function initializeSurveyButtons(){

    const saveBtn =
    document.getElementById("saveDraftBtn");

    const submitBtn =
    document.getElementById("submitSurveyBtn");

    const message =
    document.getElementById("formMessage");

    if(saveBtn){

        saveBtn.addEventListener("click", () => {

            message.innerHTML =
            "✅ Draft saved successfully.";

        });

    }

    if(submitBtn){

        submitBtn.addEventListener("click", () => {

            message.innerHTML =
            "✅ Survey submitted successfully.";

            document
            .getElementById(
            "surveyStatusText")
            .textContent =
            "Completed";

        });

    }
}
document.addEventListener("DOMContentLoaded", () => {

    initializeProgressBar();

    initializeAddPlace();

    initializeLossDetails();

    initializeInsuranceValidation();

    initializeObservationSection();

});

function initializeAddPlace(){

    const addBtn =
    document.getElementById("addPlaceBtn");

    const container =
    document.getElementById(
        "placeSurveyContainer"
    );

    if(!addBtn || !container) return;

    addBtn.addEventListener("click", () => {

        const input =
        document.createElement("input");

        input.type = "text";

        input.placeholder =
        "Enter Additional Place";

        input.classList.add(
            "track-progress"
        );

        container.appendChild(input);

        initializeProgressBar();
    });
}

function initializeProgressBar(){

    const fields =
    document.querySelectorAll(
        ".track-progress"
    );

    fields.forEach(field => {

        field.addEventListener(
            "input",
            updateProgressBar
        );

        field.addEventListener(
            "change",
            updateProgressBar
        );
    });
    const checkboxes =
document.querySelectorAll(
    ".track-progress-checkbox"
);

checkboxes.forEach(box => {

    box.addEventListener(
        "change",
        updateProgressBar
    );
});

    updateProgressBar();
}

function updateProgressBar(){

    const fields =
    document.querySelectorAll(
        ".track-progress"
    );

    const checkboxes =
document.querySelectorAll(
    ".track-progress-checkbox"
);

    let filled = 0;

    fields.forEach(field => {

        if(field.value.trim() !== "")
            filled++;
    });

    const totalFields =
fields.length +
checkboxes.length;

const percent =
Math.round(
    (filled / totalFields) * 100
);

    const bar =
    document.getElementById(
        "surveyProgressBar"
    );

    const text =
    document.getElementById(
        "progressPercent"
    );

    if(bar)
        bar.style.width =
        percent + "%";

    if(text)
        text.textContent =
        percent + "%";
    

checkboxes.forEach(box => {

    if(box.checked)
        filled++;
});    
}
function initializeLossDetails(){

    const addBtn =
    document.getElementById("addLossBtn");

    const container =
    document.getElementById(
        "lossDetailsContainer"
    );

    if(!addBtn || !container) return;

    function updateLossNumbers(){

        const entries =
        container.querySelectorAll(
            ".loss-entry"
        );

        entries.forEach((entry,index)=>{

            const num = index + 1;

            entry.querySelector(
                ".loss-heading"
            ).textContent =
            `Loss Details ${num}`;

            entry.querySelector(
                ".loss-date-label"
            ).textContent =
            `Date of Loss ${num}`;

            entry.querySelector(
                ".loss-time-label"
            ).textContent =
            `Time of Loss ${num}`;

            entry.querySelector(
                ".loss-place-label"
            ).textContent =
            `Place of Loss ${num}`;
        });
    }

    addBtn.addEventListener("click", () => {

        const count =
        container.querySelectorAll(
            ".loss-entry"
        ).length + 1;

        const block =
        document.createElement("div");

        block.className =
        "loss-entry";

        block.innerHTML = `

            <div class="loss-header">

                <h4 class="loss-heading">
                    Loss Details ${count}
                </h4>

                <button
                    type="button"
                    class="loss-remove-icon">

                    <i class="fas fa-minus"></i>

                </button>

            </div>

            <div class="loss-grid">

                <div>

                    <label
                        class="loss-date-label">

                        Date of Loss ${count}

                    </label>

                    <input
                        type="date"
                        class="track-progress">

                </div>

                <div>

                    <label
                        class="loss-time-label">

                        Time of Loss ${count}

                    </label>

                    <input
                        type="time"
                        class="track-progress">

                </div>

                <div>

                    <label
                        class="loss-place-label">

                        Place of Loss ${count}

                    </label>

                    <input
                        type="text"
                        class="track-progress">

                </div>

            </div>

        `;

        container.appendChild(block);

        block
        .querySelector(
            ".loss-remove-icon"
        )
        .addEventListener("click",()=>{

            block.remove();

            updateLossNumbers();

            updateProgressBar();
        });

        initializeProgressBar();

        updateLossNumbers();
    });

    updateLossNumbers();
}
function initializeInsuranceValidation(){

    const mobile =
    document.getElementById(
        "insuredMobile"
    );

    const pincode =
    document.getElementById(
        "insuredPincode"
    );

    if(mobile){

        mobile.addEventListener(
            "input",
            function(){

                this.value =
                this.value
                .replace(/\D/g,'')
                .slice(0,10);

            }
        );
    }

    if(pincode){

        pincode.addEventListener(
            "input",
            function(){

                this.value =
                this.value
                .replace(/\D/g,'')
                .slice(0,6);

            }
        );
    }
}
function initializeConditionalFields(){

    const selects =
    document.querySelectorAll(
        ".conditional-select"
    );

    selects.forEach(select => {

        const targetId =
        select.dataset.target;

        const target =
        document.getElementById(
            targetId
        );

        if(!target) return;

        select.addEventListener(
            "change",
            () => {

                if(
                    select.value === "Yes"
                ){

                    target.classList.add(
                        "active"
                    );

                }else{

                    target.classList.remove(
                        "active"
                    );

                    const input =
                    target.querySelector(
                        "input"
                    );

                    if(input)
                        input.value = "";

                    updateProgressBar();
                }
            }
        );
    });
}
function initializeSectionToggles(){

    const buttons =
    document.querySelectorAll(
        ".section-toggle"
    );

    buttons.forEach(button=>{

        const card =
        button.closest(
            ".form-section"
        );

        const content =
        card.querySelector(
            ".section-content"
        );

        /* Close all sections by default */

        content.classList.add(
            "closed"
        );

        button.classList.add(
            "rotated"
        );

        button.addEventListener(
            "click",
            ()=>{

                content.classList.toggle(
                    "closed"
                );

                button.classList.toggle(
                    "rotated"
                );

            }
        );

    });

}
let workshops = [];

fetch("workshops.json")
.then(res => res.json())
.then(data => {
    workshops = data;
});

const searchInput =
document.getElementById(
    "workshopSearch"
);

const resultBox =
document.getElementById(
    "workshopResults"
);

searchInput.addEventListener(
    "input",
    function(){

        const term =
        this.value
        .toLowerCase()
        .trim();

        resultBox.innerHTML = "";

        if(term.length < 2) return;

        const matches =
        workshops.filter(w =>

            w.garageCode
            .toLowerCase()
            .includes(term)

            ||

            w.name
            .toLowerCase()
            .includes(term)

        ).slice(0,10);

        matches.forEach(workshop => {

            const item =
            document.createElement("div");

            item.className =
            "workshop-item";

            item.innerHTML = `
                <strong>
                    ${workshop.garageCode}
                </strong>
                -
                ${workshop.name}
                <br>
                <small>
                    ${workshop.address}
                </small>
            `;

            item.addEventListener(
                "click",
                ()=>{

                    searchInput.value =
                    workshop.name;

                    document
                    .getElementById(
                        "selectedGarageCode"
                    ).value =
                    workshop.garageCode;

                    document
                    .getElementById(
                        "selectedWorkshopAddress"
                    ).value =
                    workshop.address;

                    resultBox.innerHTML =
                    "";
                }
            );

            resultBox.appendChild(item);

        });

    }
);
function initializeObservationSection(){

    const enable =
    document.getElementById(
        "enableObservation"
    );

    const container =
    document.getElementById(
        "observationContainer"
    );

    if(enable){

        enable.addEventListener(
            "change",
            ()=>{

                container.classList.toggle(
                    "active"
                );
            }
        );
    }

    const buttons =
    document.querySelectorAll(
        ".observation-btn"
    );

    buttons.forEach(btn=>{

        btn.addEventListener(
            "click",
            ()=>{

                btn.classList.toggle(
                    "added"
                );

                if(
                    btn.classList.contains(
                        "added"
                    )
                ){

                    btn.innerHTML =
                    "Added ✓";

                }else{

                    btn.innerHTML =
                    "Add";
                }

            }
        );
    });

}
const selectedObservations = [];
