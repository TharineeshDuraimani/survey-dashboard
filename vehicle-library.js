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

let imageDeleteMode = false;
let documentDeleteMode = false;

/* =========================
   IMAGE UPLOAD
========================= */

imageUpload?.addEventListener(
"change",
() => {

    imageList.innerHTML = "";

    [...imageUpload.files].forEach(file => {

        const item =
        document.createElement("div");

        item.className =
        "uploaded-file";

        item.innerHTML = `

        <div class="file-card">

            <input
                type="checkbox"
                class="delete-checkbox">

            <img
                src="${URL.createObjectURL(file)}"
                class="image-thumbnail">

            <div class="file-name">
                ${file.name}
            </div>

        </div>

        `;

        item.addEventListener(
        "click",
        (e) => {

            if(imageDeleteMode){
                return;
            }

            if(
            e.target.classList.contains(
            "delete-checkbox"
            )){
                return;
            }

            openImage(
            URL.createObjectURL(file)
            );

        });

        imageList.appendChild(item);

    });

});

/* =========================
   DOCUMENT UPLOAD
========================= */

documentUpload?.addEventListener(
"change",
() => {

    documentList.innerHTML = "";

    [...documentUpload.files].forEach(file => {

        const item =
        document.createElement("div");

        item.className =
        "uploaded-file";

        const extension =
        file.name
        .split(".")
        .pop()
        .toLowerCase();

        let icon =
        "fa-file";

        if(extension === "pdf"){

            icon =
            "fa-file-pdf";

        }else if(
        ["doc","docx"]
        .includes(extension)){

            icon =
            "fa-file-word";

        }else if(
        ["xls","xlsx"]
        .includes(extension)){

            icon =
            "fa-file-excel";

        }else if(
        ["jpg","jpeg","png","gif","webp"]
        .includes(extension)){

            icon =
            "fa-image";
        }

        item.innerHTML = `

        <div class="file-card">

            <input
                type="checkbox"
                class="delete-checkbox">

            <i class="fas ${icon} file-icon"></i>

            <div class="file-name">
                ${file.name}
            </div>

        </div>

        `;

        item.addEventListener(
        "click",
        (e) => {

            if(documentDeleteMode){
                return;
            }

            if(
            e.target.classList.contains(
            "delete-checkbox"
            )){
                return;
            }

            openDocument(
            URL.createObjectURL(file)
            );

        });

        documentList.appendChild(item);

    });

});

/* =========================
   PREVIEW
========================= */

const previewModal =
document.getElementById(
"previewModal"
);

const previewContent =
document.getElementById(
"previewContent"
);

function openImage(url){

    previewContent.innerHTML =

    `<img
        src="${url}"
        class="preview-image">`;

    previewModal.classList.add(
    "active"
    );
}

function openDocument(url){

    previewContent.innerHTML =

    `<iframe
        src="${url}"
        class="preview-pdf">
     </iframe>`;

    previewModal.classList.add(
    "active"
    );
}

document
.getElementById(
"closePreview"
)
.addEventListener(
"click",
()=>{

    previewModal.classList.remove(
    "active"
    );

});

/* =========================
   SAVE BUTTONS
========================= */

document
.getElementById(
"saveImagesBtn"
)
.addEventListener(
"click",
()=>{

    alert(
    "Images saved"
    );

});

document
.getElementById(
"saveDocumentsBtn"
)
.addEventListener(
"click",
()=>{

    alert(
    "Documents saved"
    );

});

/* =========================
   DELETE IMAGES
========================= */

document
.getElementById(
"deleteImagesBtn"
)
.addEventListener(
"click",
()=>{

    const btn =
    document.getElementById(
    "deleteImagesBtn"
    );

    if(!imageDeleteMode){

        imageDeleteMode = true;

        imageList.classList.add(
        "delete-mode"
        );

        btn.textContent =
        "Delete Selected";

        return;
    }

    const checkedFiles =
    imageList.querySelectorAll(
    ".delete-checkbox:checked"
    );

    if(!checkedFiles.length){

        alert(
        "Select image(s) to delete"
        );

        return;
    }

    if(
    !confirm(
    `Delete ${checkedFiles.length} image(s)?`
    )
    ){
        return;
    }

    checkedFiles.forEach(cb=>{

        cb.closest(
        ".uploaded-file"
        ).remove();

    });

    imageDeleteMode = false;

    imageList.classList.remove(
    "delete-mode"
    );

    btn.textContent =
    "Delete Images";

});

/* =========================
   DELETE DOCUMENTS
========================= */

document
.getElementById(
"deleteDocumentsBtn"
)
.addEventListener(
"click",
()=>{

    const btn =
    document.getElementById(
    "deleteDocumentsBtn"
    );

    if(!documentDeleteMode){

        documentDeleteMode = true;

        documentList.classList.add(
        "delete-mode"
        );

        btn.textContent =
        "Delete Selected";

        return;
    }

    const checkedFiles =
    documentList.querySelectorAll(
    ".delete-checkbox:checked"
    );

    if(!checkedFiles.length){

        alert(
        "Select document(s) to delete"
        );

        return;
    }

    if(
    !confirm(
    `Delete ${checkedFiles.length} document(s)?`
    )
    ){
        return;
    }

    checkedFiles.forEach(cb=>{

        cb.closest(
        ".uploaded-file"
        ).remove();

    });

    documentDeleteMode = false;

    documentList.classList.remove(
    "delete-mode"
    );

    btn.textContent =
    "Delete Documents";

});
