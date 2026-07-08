document.addEventListener("DOMContentLoaded", () => {

    // ==========================
    // PERSONUPPGIFTER
    // ==========================

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

    updatePreview();

    // ==========================
    // PROFILBILD
    // ==========================

    const photoInput = document.getElementById("photo");
    const previewPhoto = document.getElementById("previewPhoto");

    photoInput.addEventListener("change", function () {

        if (!this.files[0]) return;

        const reader = new FileReader();

        reader.onload = function (e) {
            previewPhoto.src = e.target.result;
            previewPhoto.style.display = "block";
        };

        reader.readAsDataURL(this.files[0]);

    });

    // ==========================
    // JOBB
    // ==========================

    function updateJobs() {

        const preview = document.getElementById("previewJobs");

        if (!preview) return;

        preview.innerHTML = "";

        document.querySelectorAll(".jobCard").forEach(job => {

            const company = job.querySelector(".company").value;
            const title = job.querySelector(".jobTitle").value;
            const desc = job.querySelector(".jobDesc").value;

            if (company || title || desc) {

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

    document.getElementById("addJob").addEventListener("click", () => {

        const div = document.createElement("div");

        div.className = "jobCard";

        div.innerHTML = `
            <input class="company" placeholder="Företag">
            <input class="jobTitle" placeholder="Titel">
            <textarea class="jobDesc" placeholder="Beskrivning"></textarea>
            <hr>
        `;

        document.getElementById("jobs").appendChild(div);

        div.querySelectorAll("input, textarea").forEach(el => {
            el.addEventListener("input", updateJobs);
        });

    });

    // ==========================
    // UTBILDNING
    // ==========================

    function updateEducation() {

        const preview = document.getElementById("previewEducation");

        if (!preview) return;

        preview.innerHTML = "";

        document.querySelectorAll(".educationCard").forEach(edu => {

            const school = edu.querySelector(".school").value;
            const program = edu.querySelector(".program").value;
            const year = edu.querySelector(".year").value;

            if (school || program || year) {

                preview.innerHTML += `
                    <div style="margin-bottom:20px;">
                        <strong>${school}</strong><br>
                        ${program}<br>
                        <small>${year}</small>
                    </div>
                `;

            }

        });

    }

    document.getElementById("addEducation").addEventListener("click", () => {

        const div = document.createElement("div");

        div.className = "educationCard";

        div.innerHTML = `
            <input class="school" placeholder="Skola">
            <input class="program" placeholder="Utbildning">
            <input class="year" placeholder="År">
            <hr>
        `;

        document.getElementById("education").appendChild(div);

        div.querySelectorAll("input").forEach(el => {
            el.addEventListener("input", updateEducation);
        });

    });

    // ==========================
    // KOMPETENSER
    // ==========================

    function updateSkills() {

        const preview = document.getElementById("previewSkills");

        if (!preview) return;

        preview.innerHTML = "";

        document.querySelectorAll(".skillInput").forEach(skill => {

            if (skill.value.trim() !== "") {

                preview.innerHTML += `<li>${skill.value}</li>`;

            }

        });

    }

    document.getElementById("addSkill").addEventListener("click", () => {

        const input = document.createElement("input");

        input.type = "text";
        input.placeholder = "Kompetens";
        input.className = "skillInput";

        input.addEventListener("input", updateSkills);

        document.getElementById("skills").appendChild(input);

    });

    // ==========================
    // PDF
    // ==========================

    document.getElementById("downloadPdf").addEventListener("click", () => {

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
        }).from(document.querySelector(".preview")).save();

    });

});
