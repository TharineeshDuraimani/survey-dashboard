/* ==========================================================
   SURVEY REPORT
   PART 1
   CORE INITIALIZATION
========================================================== */

"use strict";

/* ==========================================================
   GLOBAL VARIABLES
========================================================== */

const Report = {

    data : {},

    verification : {},

    preview : false,

    pageWidth : 794,

    pageHeight : 1123

};

/* ==========================================================
   SHORTCUTS
========================================================== */

const $ = id => document.getElementById(id);

const $$ = selector =>
document.querySelectorAll(selector);

/* ==========================================================
   SAFE VALUE
========================================================== */

function safe(value){

    if(
        value === undefined ||
        value === null ||
        value === ""
    ){
        return "-";
    }

    return value;

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

    }

    catch{

        return date;

    }

}

/* ==========================================================
   FORMAT CURRENCY
========================================================== */

function formatCurrency(value){

    if(
        value===undefined ||
        value===null ||
        value===""

    ){

        return "-";

    }

    const number =
    Number(
        value.toString()
        .replace(/,/g,"")
    );

    if(isNaN(number))
        return value;

    return number.toLocaleString(
        "en-IN",
        {

            minimumFractionDigits:2,
            maximumFractionDigits:2

        }

    );

}

/* ==========================================================
   TOOLBAR
========================================================== */

function initializeToolbar(){


    /* ------------------------------
       PREVIEW
    ------------------------------ */

    $("previewBtn")
    ?.addEventListener(
        "click",
        togglePreview
    );

    /* ------------------------------
       PRINT
    ------------------------------ */

    $("printBtn")
    ?.addEventListener(
        "click",
        printReport
    );

}
/* ==========================================================
   BACK BUTTON
========================================================== */

function initializeBackButton() {

    const backBtn = document.getElementById("backBtn");

    if (!backBtn) return;

    backBtn.addEventListener("click", () => {

        // Return to previous page if available
        if (window.history.length > 1) {

            window.history.back();

        } else {

            // Fallback page
            window.location.href = "vehicle-library.html";

        }

    });

}

/* ==========================================================
   PREVIEW MODE
========================================================== */

function togglePreview(){

    Report.preview =
    !Report.preview;

    document.body.classList.toggle(
        "preview-mode",
        Report.preview
    );

    const button =
    $("previewBtn");

    if(button){

        button.innerHTML =

        Report.preview ?

        '<i class="fas fa-times"></i> Close Preview'

        :

        '<i class="fas fa-eye"></i> Preview';

    }

}

/* ==========================================================
   PRINT
========================================================== */

function printReport(){

    window.print();

}

/* ==========================================================
   REPORT VIEW
========================================================== */

function setupReportView(){

    const report =
    document.querySelector(
        ".report-container"
    );

    if(!report) return;

    report.style.maxWidth="210mm";

    report.style.margin="0 auto";

}


/* ==========================================================
   AUTO SCALE
========================================================== */

function scaleReport(){

    const page =
    document.querySelector(
        ".report-paper"
    );

    if(!page) return;

    if(window.innerWidth > 1200){

        page.style.transform="scale(1)";

        page.style.transformOrigin="top center";

        return;

    }

    const available =
    window.innerWidth - 40;

    const scale =
    Math.min(
        1,
        available / Report.pageWidth
    );

    page.style.transform=
    `scale(${scale})`;

    page.style.transformOrigin=
    "top center";

}

/* ==========================================================
   PAGE VIEW
========================================================== */

function setupPageView(){


    setupReportView();

    scaleReport();

}

/* ==========================================================
   WINDOW EVENTS
========================================================== */

window.addEventListener(

    "resize",

    ()=>{

        scaleReport();

    }

);

/* ==========================================================
   KEYBOARD SHORTCUTS
========================================================== */

function initializeShortcuts(){

    document.addEventListener(

        "keydown",

        e=>{

            if(

                e.ctrlKey &&
                e.key==="p"

            ){

                e.preventDefault();

                printReport();

            }

            if(

                e.key==="Escape" &&
                Report.preview

            ){

                togglePreview();

            }

        }

    );

}

/* ==========================================================
   INITIALIZATION
========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeToolbar();

        initializeShortcuts();

        setupPageView();

            initializeBackButton();

    initializeDownloadButton();

        console.log(

            "%cSurvey Report Initialized",

            "color:#2563eb;font-size:14px;font-weight:bold"

        );

    }

);
/* ==========================================================
   PART 2
   REPORT DATA ENGINE
========================================================== */

/* ==========================================================
   LOAD DATA
========================================================== */

function loadReportData(){

    try{

        Report.data = JSON.parse(
            localStorage.getItem("selectedVehicle")
        ) || {};

    }

    catch{

        Report.data = {};

    }

    try{

        Report.verification = JSON.parse(
            localStorage.getItem("documentVerification")
        ) || {};

    }

    catch{

        Report.verification = {};

    }

}

/* ==========================================================
   ELEMENT
========================================================== */

function element(id){

    return document.getElementById(id);

}

/* ==========================================================
   SET TEXT
========================================================== */

function setText(id,value){

    const el = element(id);

    if(!el) return;

    el.textContent = safe(value);

}

/* ==========================================================
   SET HTML
========================================================== */

function setHTML(id,value){

    const el = element(id);

    if(!el) return;

    el.innerHTML = safe(value);

}

/* ==========================================================
   FORMAT POLICY PERIOD
========================================================== */

function policyPeriod(){

    const start = Report.data.policyStart;

    const end = Report.data.policyEnd;

    if(!start || !end){

        return "-";

    }

    return `${formatDate(start)} to ${formatDate(end)}`;

}

/* ==========================================================
   LOSS DATE & TIME
========================================================== */

function lossDateTime(){

    const date = Report.data.lossDate;

    const time = Report.data.lossTime;

    if(!date && !time){

        return "-";

    }

    if(date && !time){

        return formatDate(date);

    }

    return `${formatDate(date)}  ${time}`;

}

/* ==========================================================
   YES / NO
========================================================== */

function yesNo(value){

    if(

        value===true ||

        value==="Yes" ||

        value==="YES"

    ){

        return "YES";

    }

    return "NO";

}

/* ==========================================================
   DOCUMENT STATUS
========================================================== */

function documentStatus(value){

    if(

        value===true ||

        value==="Original"

    ){

        return "Original Verified";

    }

    if(

        value==="Copy"

    ){

        return "Copy Verified";

    }

    if(

        value==="NA"

    ){

        return "Not Applicable";

    }

    return "-";

}

/* ==========================================================
   PAGE NUMBER
========================================================== */

function initializePageNumbers(){

    const pages =
    document.querySelectorAll(".report-paper");

    pages.forEach((page,index)=>{

        let footer =

        page.querySelector(".page-number");

        if(!footer){

            footer =

            document.createElement("div");

            footer.className =

            "page-number";

            page.appendChild(footer);

        }

        footer.innerHTML =

        `Page ${index+1} of ${pages.length}`;

    });

}

/* ==========================================================
   REPORT TITLE
========================================================== */

function initializeTitle(){

    const reportNo =

        Report.data.surveyNo ||

        "Survey";

    const vehicle =

        Report.data.vehicleNo ||

        "Vehicle";

    document.title =

        `${vehicle} - ${reportNo}`;

}

/* ==========================================================
   INITIALIZATION
========================================================== */

function initializeReport(){

    loadReportData();

    initializeTitle();

    initializePageNumbers();

}
/* ==========================================================
   LOADING
========================================================== */

function showLoading() {

    if (document.getElementById("pdfLoader")) return;

    const loader = document.createElement("div");

    loader.id = "pdfLoader";

    loader.innerHTML = `
        <div class="loader-box">

            <div class="loader-spinner"></div>

            <h3>Generating PDF...</h3>

            <p>Please wait</p>

        </div>
    `;

    document.body.appendChild(loader);

}

function hideLoading() {

    document.getElementById("pdfLoader")?.remove();

}
/* ==========================================================
   DOWNLOAD PDF
========================================================== */

async function downloadPDF() {

    try {

        showLoading();

        const { jsPDF } = window.jspdf;

        const pdf = new jsPDF({

            orientation: "portrait",
            unit: "mm",
            format: "a4"

        });

        const pages = document.querySelectorAll(".report-paper");

        for (let i = 0; i < pages.length; i++) {

            const canvas = await html2canvas(pages[i], {

                scale: 2.5,
                useCORS: true,
                backgroundColor: "#ffffff"

            });

            const imgData = canvas.toDataURL("image/jpeg", 1);

            if (i > 0) {

                pdf.addPage();

            }

            pdf.addImage(

                imgData,

                "JPEG",

                0,

                0,

                210,

                297

            );

        }

        const reportNo =
    Report.data?.surveyNo || "Survey";

const vehicle =
    Report.data?.vehicleNo || "Vehicle";

pdf.save(`${vehicle}_${reportNo}.pdf`);

    }

    catch (error) {

        console.error(error);

        alert("Unable to generate PDF.");

    }

    finally {

        hideLoading();

    }

}
/* ==========================================================
   DOWNLOAD BUTTON
========================================================== */

function initializeDownloadButton() {

    const downloadBtn = document.getElementById("downloadBtn");

    if (!downloadBtn) return;

    downloadBtn.addEventListener("click", downloadPDF);

}
