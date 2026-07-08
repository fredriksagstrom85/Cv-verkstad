const nameInput = document.getElementById("name");
const titleInput = document.getElementById("title");
const aboutInput = document.getElementById("about");

const previewName = document.getElementById("previewName");
const previewTitle = document.getElementById("previewTitle");
const previewAbout = document.getElementById("previewAbout");

function updatePreview() {
    previewName.textContent = nameInput.value || "Ditt Namn";
    previewTitle.textContent = titleInput.value || "Yrkestitel";
    previewAbout.textContent = aboutInput.value || "Här visas din profil.";
}

nameInput.addEventListener("input", updatePreview);
titleInput.addEventListener("input", updatePreview);
aboutInput.addEventListener("input", updatePreview);

document.getElementById("addJob").addEventListener("click", function () {

    const jobs = document.getElementById("jobs");

    jobs.innerHTML += `
        <input type="text" placeholder="Företag">
        <input type="text" placeholder="Titel">
        <textarea placeholder="Beskrivning"></textarea>
        <hr>
    `;

});

document.getElementById("addEducation").addEventListener("click", function () {

    const education = document.getElementById("education");

    education.innerHTML += `
        <input type="text" placeholder="Skola">
        <input type="text" placeholder="Utbildning">
        <input type="text" placeholder="År">
        <hr>
    `;

});

updatePreview();
document.getElementById("downloadPdf").addEventListener("click", function () {

    const cv = document.querySelector(".preview");

    html2pdf().from(cv).save("Mitt-CV.pdf");

});
