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

    // Lägg till jobb
    const addJob = document.getElementById("addJob");

    addJob?.addEventListener("click", () => {

        const jobs = document.getElementById("jobs");

        const div = document.createElement("div");

        div.innerHTML = `
            <input type="text" placeholder="Företag">
            <input type="text" placeholder="Titel">
            <textarea placeholder="Beskrivning"></textarea>
            <hr>
        `;

        jobs.appendChild(div);

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
