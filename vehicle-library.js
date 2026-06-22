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
const imageUpload =
document.getElementById("imageUpload");

const documentUpload =
document.getElementById("documentUpload");

const imageList =
document.getElementById("imageList");

const documentList =
document.getElementById("documentList");
imageUpload?.addEventListener(
"change",
() => {

    imageList.innerHTML = "";

    [...imageUpload.files].forEach(file => {

        const item =
        document.createElement("div");

        item.className =
        "uploaded-file";

        item.textContent =
        file.name;

        item.addEventListener(
        "click",
        () => {

            const url =
            URL.createObjectURL(file);

            openImage(url);

        });

        imageList.appendChild(item);

    });

});
documentUpload?.addEventListener(
"change",
() => {

    documentList.innerHTML = "";

    [...documentUpload.files].forEach(file => {

        const item =
        document.createElement("div");

        item.className =
        "uploaded-file";

        item.textContent =
        file.name;

        item.addEventListener(
        "click",
        () => {

            const url =
            URL.createObjectURL(file);

            openDocument(url);

        });

        documentList.appendChild(item);

    });

});
const previewModal =
document.getElementById("previewModal");

const previewContent =
document.getElementById("previewContent");
function openImage(url){

    previewContent.innerHTML =

    `<img src="${url}"
          class="preview-image">`;

    previewModal.classList.add(
    "active"
    );
}
function openDocument(url){

    previewContent.innerHTML =

    `<iframe src="${url}"
             class="preview-pdf">
     </iframe>`;

    previewModal.classList.add(
    "active"
    );
}
document
.getElementById("closePreview")
.addEventListener("click",()=>{

    previewModal.classList.remove(
    "active"
    );

});
document
.getElementById("saveImagesBtn")
.addEventListener("click",()=>{

    alert("Images saved");
});
document
.getElementById("saveDocumentsBtn")
.addEventListener("click",()=>{

    alert("Documents saved");
});
document
.getElementById("deleteImagesBtn")
.addEventListener("click",()=>{

    imageList.innerHTML = "";
    imageUpload.value = "";
});
document
.getElementById("deleteDocumentsBtn")
.addEventListener("click",()=>{

    documentList.innerHTML = "";
    documentUpload.value = "";
});
