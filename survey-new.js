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

    initializeDamageSelector();

    initializePhotoPreview();

    initializeSurveyButtons();

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