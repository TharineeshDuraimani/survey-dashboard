/* ==========================================================
   SURVEY REPORT
   PART 3A-1
========================================================== */

"use strict";

/* ==========================================================
   REPORT DATA
========================================================== */

let reportData = {};
let verificationData = {};

/* ==========================================================
   SHORTCUT
========================================================== */

const $ = (id) => document.getElementById(id);

/* ==========================================================
   SAFE VALUE
========================================================== */

function value(v){

    if(
        v === undefined ||
        v === null ||
        v === ""
    ){

        return "-";

    }

    return v;

}

/* ==========================================================
   TEXT SETTER
========================================================== */

function setText(id,data){

    const el = $(id);

    if(!el) return;

    el.textContent = value(data);

}

/* ==========================================================
   FORMAT DATE
========================================================== */

function formatDate(date){

    if(!date) return "-";

    try{

        const d = new Date(date);

        if(isNaN(d)) return date;

        return d.toLocaleDateString(
            "en-IN",
            {
                day:"2-digit",
                month:"2-digit",
                year:"numeric"
            }
        );

    }catch{

        return date;

    }

}

/* ==========================================================
   LOAD DATA
========================================================== */

function loadSurveyData(){

    reportData =
        JSON.parse(
            localStorage.getItem("selectedVehicle")
        ) || {};

    verificationData =
        JSON.parse(
            localStorage.getItem("documentVerification")
        ) || {};

}

/* ==========================================================
   HEADER
========================================================== */

function populateHeader(){

    setText(
        "reportNo",
        reportData.surveyNo
    );

    setText(
        "reportDate",
        formatDate(
            reportData.surveyDate
        )
    );

    setText(
        "vehicleNumber",
        reportData.vehicleNo
    );

}

/* ==========================================================
   SECTION 1
========================================================== */

function populateSurveyDetails(){

    setText(
        "surveyNo",
        reportData.surveyNo
    );

    setText(
        "appointmentDate",
        formatDate(
            reportData.appointmentDate
        )
    );

    setText(
        "surveyType",
        reportData.surveyType
    );

    setText(
        "surveyConducted",
        formatDate(
            reportData.surveyDate
        )
    );

    setText(
        "surveyPlace",
        reportData.placeOfSurvey
    );

    setText(
        "appointedBy",
        reportData.appointedBy
    );

}

/* ==========================================================
   SECTION 3
========================================================== */

function populateInsurerDetails(){

    setText(
        "company",
        reportData.company
    );

    setText(
        "policyNo",
        reportData.policyNo
    );

    setText(
        "claimNo",
        reportData.claimNo
    );

    setText(
        "idv",
        reportData.idv
    );

    if(
        reportData.policyStart &&
        reportData.policyEnd
    ){

        setText(
            "policyPeriod",
            `${formatDate(reportData.policyStart)}
             to
             ${formatDate(reportData.policyEnd)}`
        );

    }
    else{

        setText(
            "policyPeriod",
            "-"
        );

    }

    setText(
        "endorsement",
        reportData.endorsement
    );

}

/* ==========================================================
   SECTION 4
========================================================== */

function populateInsuredDetails(){

    setText(
        "insuredName",
        reportData.insuredName
    );

    setText(
        "insuredAddress",
        reportData.address
    );

    setText(
        "insuredMobile",
        reportData.mobile
    );

    setText(
        "insuredPincode",
        reportData.pincode
    );

}

/* ==========================================================
   SECTION 5
========================================================== */

function populateVehicleDetails(){

    setText(
        "registrationNo",
        reportData.vehicleNo
    );

    setText(
        "ownerName",
        reportData.owner
    );

    setText(
        "engineNo",
        reportData.engineNo
    );

    setText(
        "chassisNo",
        reportData.chassisNo
    );

    setText(
        "make",
        reportData.make
    );

    setText(
        "model",
        reportData.model
    );

    setText(
        "bodyType",
        reportData.bodyType
    );

    setText(
        "vehicleClass",
        reportData.vehicleClass
    );

    setText(
        "colour",
        reportData.colour
    );

    setText(
        "fuel",
        reportData.fuel
    );

    setText(
        "year",
        reportData.year
    );

    setText(
        "odometer",
        reportData.odometer
    );

    setText(
        "verified",
        reportData.rcVerified
            ? "YES"
            : "NO"
    );

    setText(
        "condition",
        reportData.preAccidentCondition
    );

}

/* ==========================================================
   SECTION 6
========================================================== */

function populateTripSheet(){

    setText(
        "tripNo",
        reportData.tripNo
    );

    setText(
        "tripVehicle",
        reportData.tripVehicle
    );

    setText(
        "tripFrom",
        reportData.tripFrom
    );

    setText(
        "tripTo",
        reportData.tripTo
    );

    setText(
        "tripLoad",
        reportData.tripLoad
    );

}

/* ==========================================================
   REPORT
========================================================== */

function populateReport(){

    populateHeader();

    populateSurveyDetails();

    populateInsurerDetails();

    populateInsuredDetails();

    populateVehicleDetails();

    populateTripSheet();

}

/* ==========================================================
   TOOLBAR
========================================================== */

function initializeToolbar(){

    $("backBtn")
    ?.addEventListener(
        "click",
        ()=>{

            history.back();

        }
    );

    $("previewBtn")
    ?.addEventListener(
        "click",
        ()=>{

            window.scrollTo({

                top:0,

                behavior:"smooth"

            });

        }
    );

}

/* ==========================================================
   INITIALIZE
========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    ()=>{

        loadSurveyData();

        populateReport();

        populateRemainingSections();

        initializeToolbar();

        reportReady();

        initializeDownloadButton();

    }
);
/* ==========================================================
   PART 3A-2
   FIR, TP DETAILS & DOCUMENT VERIFICATION
========================================================== */

/* ==========================================================
   CHECK MARK
========================================================== */

function mark(value){

    if(
        value === true ||
        value === "Yes" ||
        value === "YES" ||
        value === "yes" ||
        value === 1
    ){

        return '<span class="tick">✓</span>';

    }

    return '<span class="cross">✗</span>';

}

/* ==========================================================
   SECTION 7
   FIR DETAILS
========================================================== */

function populateFirDetails(){

    const container =
        $("firContainer");

    if(!container) return;

    if(
        !reportData.firNo ||
        reportData.firNo === ""
    ){

        container.innerHTML =

        `
        <div class="nil-box">

            NIL

        </div>
        `;

        return;

    }

    setText(
        "firNo",
        reportData.firNo
    );

    setText(
        "firDate",
        formatDate(
            reportData.firDate
        )
    );

    setText(
        "policeStation",
        reportData.policeStation
    );

    setText(
        "mva",
        reportData.mva
    );

    setText(
        "ipc",
        reportData.ipc
    );

    setText(
        "withoutLicence",
        reportData.driverWithoutLicence
    );

    setText(
        "policeRecords",
        reportData.previousPoliceRecords
    );

}

/* ==========================================================
   SECTION 8
   THIRD PARTY
========================================================== */

function populateThirdPartyDetails(){

    if(
        reportData.tpInjury !== "Yes" &&
        reportData.propertyDamage !== "Yes"
    ){

        setText(
            "tpInjury",
            "NIL"
        );

        setText(
            "propertyDamage",
            "NIL"
        );

        setText(
            "tppd",
            "NIL"
        );

        setText(
            "tpRemarks",
            "NIL"
        );

        return;

    }

    setText(
        "tpInjury",
        reportData.tpInjury
    );

    setText(
        "propertyDamage",
        reportData.propertyDamage
    );

    setText(
        "tppd",
        reportData.tppd
    );

    setText(
        "tpRemarks",
        reportData.tpRemarks
    );

}

/* ==========================================================
   DOCUMENT VERIFICATION
========================================================== */

function populateVerificationTable(){

    const tbody =
        $("verificationTable");

    if(!tbody) return;

    const docs = [

        {
            name:"Registration Certificate",
            key:"rc"
        },

        {
            name:"Driving Licence",
            key:"dl"
        },

        {
            name:"Permit",
            key:"permit"
        },

        {
            name:"Fitness Certificate",
            key:"fitness"
        },

        {
            name:"Tax",
            key:"tax"
        },

        {
            name:"Trip Sheet",
            key:"trip"
        },

        {
            name:"Authorization",
            key:"authorization"
        }

    ];

    tbody.innerHTML = "";

    docs.forEach(doc=>{

        const item =
        verificationData[doc.key] || {};

        tbody.innerHTML +=

        `
        <tr>

            <td>

                ${doc.name}

            </td>

            <td>

                ${mark(item.original)}

            </td>

            <td>

                ${mark(item.copy)}

            </td>

            <td>

                ${mark(item.insurer)}

            </td>

            <td>

                ${mark(item.online)}

            </td>

            <td>

                ${mark(item.extract)}

            </td>

        </tr>
        `;

    });

}

/* ==========================================================
   COMPLETE REPORT
========================================================== */

function populateRemainingSections(){

    populateFirDetails();

    populateThirdPartyDetails();

    populateVerificationTable();

}
/* ==========================================================
   PART 3B-1
   TOOLBAR, PREVIEW, PRINT & PAGE NUMBERING
========================================================== */

/* ==========================================================
   SCROLL TO TOP
========================================================== */

function scrollToTop(){

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}

/* ==========================================================
   PREVIEW
========================================================== */

function previewReport(){

    scrollToTop();

    const paper =
    document.querySelector(".report-paper");

    if(!paper) return;

    paper.animate(

        [

            {

                transform:"scale(.98)",

                opacity:.85

            },

            {

                transform:"scale(1)",

                opacity:1

            }

        ],

        {

            duration:300,

            easing:"ease"

        }

    );

}

/* ==========================================================
   PRINT
========================================================== */

function printReport(){

    document.title =
    generateFileName(false);

    window.print();

}

/* ==========================================================
   PAGE NUMBER
========================================================== */

function addPageNumber(){

    let page =
    document.querySelector(
    ".page-number"
    );

    if(!page){

        page =
        document.createElement(
        "div"
        );

        page.className =
        "page-number";

        document
        .querySelector(
        ".report-paper"
        )
        ?.appendChild(page);

    }

    page.innerHTML =

    `
    Page 1
    `;

}

/* ==========================================================
   FILE NAME
========================================================== */

function generateFileName(
    includeExtension=true
){

    const surveyNo =

        reportData.surveyNo ||

        "Survey";

    const vehicle =

        reportData.vehicleNo ||

        "Vehicle";

    let file =

        `Survey_${vehicle}_${surveyNo}`;

    file =

        file.replace(

            /[\\/:*?"<>| ]+/g,

            "_"

        );

    if(includeExtension)

        file += ".pdf";

    return file;

}

/* ==========================================================
   KEYBOARD SHORTCUTS
========================================================== */

function initializeKeyboardShortcuts(){

    document.addEventListener(

        "keydown",

        e=>{

            if(

                e.ctrlKey &&

                e.key.toLowerCase()

                === "p"

            ){

                e.preventDefault();

                printReport();

            }

            if(

                e.key === "Home"

            ){

                scrollToTop();

            }

        }

    );

}

/* ==========================================================
   TOOLBAR BUTTONS
========================================================== */

function initializeToolbarButtons(){

    $("previewBtn")

    ?.addEventListener(

        "click",

        previewReport

    );

    $("printBtn")

    ?.addEventListener(

        "click",

        printReport

    );

}

/* ==========================================================
   REPORT READY
========================================================== */

function reportReady(){

    addPageNumber();

    initializeToolbarButtons();

    initializeKeyboardShortcuts();

    console.log(

        "Survey Report Ready"

    );

}
/* ==========================================================
   PART 3B-2
   PDF DOWNLOAD
========================================================== */

const { jsPDF } = window.jspdf;

/* ==========================================================
LOADING OVERLAY
========================================================== */

function createLoadingOverlay(){

    if(document.getElementById("pdfLoading"))
        return;

    const overlay =
    document.createElement("div");

    overlay.id="pdfLoading";

    overlay.innerHTML=`

        <div class="pdf-loader">

            <div class="spinner"></div>

            <h3>

                Generating PDF...

            </h3>

            <p>

                Please wait

            </p>

        </div>

    `;

    overlay.style.cssText=`

        position:fixed;
        inset:0;
        background:rgba(255,255,255,.95);

        display:flex;
        justify-content:center;
        align-items:center;

        z-index:99999;

    `;

    document.body.appendChild(
        overlay
    );

}

function removeLoadingOverlay(){

    document
    .getElementById(
        "pdfLoading"
    )
    ?.remove();

}

/* ==========================================================
DOWNLOAD PDF
========================================================== */

async function downloadPDF(){

    try{

        createLoadingOverlay();

        const report =

        document.querySelector(
        ".report-paper"
        );

        const canvas =

        await html2canvas(

            report,

            {

                scale:2,

                useCORS:true,

                backgroundColor:"#ffffff"

            }

        );

        const pdf =

        new jsPDF(

            "p",

            "mm",

            "a4"

        );

        const pageWidth =

        210;

        const pageHeight =

        297;

        const imgWidth =

        pageWidth;

        const imgHeight =

        canvas.height *

        imgWidth /

        canvas.width;

        const imgData =

        canvas.toDataURL(

            "image/png",

            1.0

        );

        let heightLeft =

        imgHeight;

        let position =

        0;

        pdf.addImage(

            imgData,

            "PNG",

            0,

            position,

            imgWidth,

            imgHeight,

            "",

            "FAST"

        );

        heightLeft -=

        pageHeight;

        while(heightLeft > 0){

            position =

            heightLeft -

            imgHeight;

            pdf.addPage();

            pdf.addImage(

                imgData,

                "PNG",

                0,

                position,

                imgWidth,

                imgHeight,

                "",

                "FAST"

            );

            heightLeft -=

            pageHeight;

        }

        pdf.save(

            generateFileName()

        );

    }

    catch(err){

        console.error(err);

        alert(

            "Unable to generate PDF."

        );

    }

    finally{

        removeLoadingOverlay();

    }

}

/* ==========================================================
DOWNLOAD BUTTON
========================================================== */

function initializeDownloadButton(){

    $("downloadBtn")
    ?.addEventListener(

        "click",

        downloadPDF

    );

}

/* ==========================================================
LOADER STYLE
========================================================== */

(function(){

const style =
document.createElement("style");

style.innerHTML=`

.pdf-loader{

text-align:center;

}

.spinner{

width:70px;

height:70px;

border:8px solid #dbeafe;

border-top:8px solid #2563eb;

border-radius:50%;

margin:auto;

animation:spin 1s linear infinite;

}

@keyframes spin{

0%{

transform:rotate(0);

}

100%{

transform:rotate(360deg);

}

}

`;

document.head.appendChild(style);

})();

/* ==========================================================
FINAL INITIALIZATION
========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeDownloadButton();

        console.log(

            "PDF Generator Ready"

        );

    }

);