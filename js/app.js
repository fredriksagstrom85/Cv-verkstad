document.addEventListener("DOMContentLoaded", () => {

    // Personuppgifter
    const nameInput = document.getElementById("name");
    const titleInput = document.getElementById("title");
    const aboutInput = document.getElementById("about");

    const previewName = document.getElementById("previewName");
    const previewTitle = document.getElementById("previewTitle");
    const previewAbout = document.getElementById("previewAbout");

    function updatePreview() {
        if (previewName)
            previewName.textContent = nameInput.value || "Ditt Namn";

        if (previewTitle)
            previewTitle.textContent = titleInput.value || "Yrkestitel";

        if (previewAbout)
            previewAbout.textContent = aboutInput.value || "Här visas din profil.";
    }

    nameInput?.addEventListener("input", updatePreview);
    titleInput?.addEventListener("input", updatePreview);
    aboutInput?.addEventListener("input", updatePreview);

    updatePreview();

    // Profilbild
    const photoInput = document.getElementById("photo");
    const previewPhoto = document.getElementById("previewPhoto");

    photoInput?.addEventListener("change", function () {

        const file = this.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = function (e) {

            previewPhoto.src = e.target.result;
            previewPhoto.style.display = "block";

        };

        reader.readAsDataURL(file);

    });

    const addJob = document.getElementById("addJob");

function updateJobs() {

    const preview = document.getElementById("previewJobs");
    preview.innerHTML = "";

    document.querySelectorAll(".jobCard").forEach(job => {

        const company = job.querySelector(".company").value;
        const title = job.querySelector(".jobTitle").value;
        const desc = job.querySelector(".jobDesc").value;

        if(company || title || desc){

            preview.innerHTML += `
                <div style="margin-bottom:20px;">
                    <h3>${title}</h3>
                    <strong>${company}</strong>
                    <p>${desc}</p>
                </div>
            `;

        }

    });

}

addJob?.addEventListener("click", () => {

    const jobs = document.getElementById("jobs");

    const div = document.createElement("div");

    div.className = "jobCard";

    div.innerHTML = `
        <input class="company" placeholder="Företag">
        <input class="jobTitle" placeholder="Titel">
        <textarea class="jobDesc" placeholder="Beskrivning"></textarea>
        <hr>
    `;

    jobs.appendChild(div);

    div.querySelectorAll("input, textarea").forEach(el=>{
        el.addEventListener("input", updateJobs);
    });

});

    // Lägg till utbildning
    const addEducation = document.getElementById("addEducation");

    addEducation?.addEventListener("click", () => {

        const education = document.getElementById("education");

        const div = document.createElement("div");

        div.innerHTML = `
            <input type="text" placeholder="Skola">
            <input type="text" placeholder="Utbildning">
            <input type="text" placeholder="År">
            <hr>
        `;

        education.appendChild(div);

    });

    // PDF
    const pdfBtn = document.getElementById("downloadPdf");

    pdfBtn?.addEventListener("click", () => {

        const cv = document.querySelector(".preview");

        html2pdf().set({
            margin: 10,
            filename: "Mitt-CV.pdf",
            image: { type: "jpeg", quality: 1 },
            html2canvas: { scale: 2 },
            jsPDF: {
                unit: "mm",
                format: "a4",
                orientation: "portrait"
            }
        }).from(cv).save();

    });

});
// Kompetenser
const addSkill = document.getElementById("addSkill");

function updateSkills() {
    const preview = document.getElementById("previewSkills");
    preview.innerHTML = "";

    document.querySelectorAll(".skillInput").forEach(skill => {
        if (skill.value.trim() !== "") {
            const li = document.createElement("li");
            li.textContent = skill.value;
            preview.appendChild(li);
        }
    });
}

addSkill?.addEventListener("click", () => {

    const skills = document.getElementById("skills");

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Kompetens";
    input.className = "skillInput";

    input.addEventListener("input", updateSkills);

    skills.appendChild(input);

});
