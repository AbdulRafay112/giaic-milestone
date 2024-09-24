"use strict";
// console.log('my ts works perfectly');
var _a;
// function to add more text area
let textAreaCount = 1;
function addTextArea(containerId) {
    const container = document.getElementById(containerId);
    if (container) {
        const textArea = document.createElement('textarea');
        // modify the name based on containerId to ensure the right name is set
        if (containerId === "textAreasContainer") {
            textArea.name = "Academic Qualification" + textAreaCount;
        }
        else if (containerId === 'skillsContainer') {
            textArea.name = 'skills' + textAreaCount;
        }
        container.appendChild(textArea);
        container.appendChild(document.createElement('br'));
        textAreaCount++;
    }
}
// -------------------------------------------------------------------------------------------
// function to display the templates
function templateResume() {
    const templates = document.querySelector('.templates');
    if (templates) {
        templates.style.display = 'block';
    }
}
// -------------------------------------------------------------------------------------------------------
// function to generate resume preview
function generateResume() {
    const selectedTemplate = document.querySelector('input[name="template"]:checked');
    if (!selectedTemplate) {
        alert('please select a template before generating your resume');
        return;
    }
    const nameInput = document.querySelector('input[name="name"]');
    const phoneInput = document.querySelector('input[name="phonenumber"]');
    const emailInput = document.querySelector('input[name="email"]');
    const facebookInput = document.querySelector('input[name="facebook"]');
    const instagramInput = document.querySelector('input[name="instagram"]');
    const linkedinInput = document.querySelector('input[name="linkedin"]');
    const objectiveInput = document.querySelector('textarea[name="objective"]');
    if (!nameInput || !phoneInput || !emailInput || !facebookInput || !instagramInput || !linkedinInput || !objectiveInput) {
        alert('Some fields are missing.');
        return;
    }
    const name = nameInput.value;
    const phoneNumber = phoneInput.value;
    const email = emailInput.value;
    const facebookLink = facebookInput.value;
    const instagramLink = instagramInput.value;
    const linkedinLink = linkedinInput.value;
    const objective = objectiveInput.value;
    let workExperience = '';
    document.querySelectorAll('textarea[name^="Work Experience"]').forEach((area) => {
        const textArea = area;
        workExperience += textArea.value + `<br>`;
    });
    let academicQualification = '';
    document.querySelectorAll('textarea[name^="Academic Qualification"]').forEach((area) => {
        const textArea = area;
        academicQualification += textArea.value + `<br>`;
    });
    let skills = '';
    document.querySelectorAll('textarea[name^="skills"]').forEach((area) => {
        const textArea = area;
        skills += textArea.value + `<br>`;
    });
    const imageInput = document.querySelector('input[name="image"]');
    if (imageInput && imageInput.files) {
        const file = imageInput.files[0];
        const reader = new FileReader();
        reader.onload = function (event) {
            var _a;
            const imageURL = (_a = event.target) === null || _a === void 0 ? void 0 : _a.result;
            if (imageURL) {
                const previewHTML = `
                    <div class="image-name">
                        <p><strong>${name}</strong></p>
                        <img src="${imageURL}" alt="Profile Picture" />
                    </div>
                    <div class="horizontal-line nav"></div>
                    <section>
                        <div class="contact">
                            <h2><strong>Contact Info</strong></h2>
                            <p><strong>${phoneNumber}</strong></p>
                            <p><strong>${email}</strong></p>
                            <div class="horizontal-line"></div>
                            <h2><strong>Also Connect Me Through</strong></h2>
                            <p>${facebookLink}</p>
                            <p>${instagramLink}</p>
                            <p>${linkedinLink}</p>
                        </div>
                        <div class="verticalLine"></div>
                        <div class="other">
                            <h2><strong>Objective: </strong></h2>
                            <span>${objective}</span>
                            <div class="horizontal-line margin"></div>
                            <h2><strong>Academic Qualification</strong></h2>
                            <span>${academicQualification}</span>
                            <h2><strong>Work Experience </strong></h2>
                            <span>${workExperience}</span>
                            <h2><strong>Skills</strong></h2>
                            <span>${skills}</span>
                        </div>
                    </section>
                `;
                const previewContainer = document.querySelector('.preview-container');
                if (previewContainer) {
                    if (selectedTemplate.value === 'template-1') {
                        previewContainer.innerHTML = previewHTML;
                        previewContainer.style.display = 'block';
                    }
                    else {
                        previewContainer.innerHTML = `
                        <div class="section">
                            <div class="left">
                                <img src="${imageURL}" alt="Profile Picture" />
                                <h2><strong>Contact Info</strong></h2>
                                <p><strong>${phoneNumber}</strong></p>
                                <p><strong>${email}</strong></p>
                                <div class="horizontal-line"></div>
                                <h2><strong>Also Connect Me Through</strong></h2>
                                <p>${facebookLink}</p>
                                <p>${instagramLink}</p>
                                <p>${linkedinLink}</p>
                            </div>
                            <div class="right">
                                <p class="name"><strong>${name}</strong></p>
                                <h2><strong>Objective: </strong></h2>
                                <span>${objective}</span>
                                <div class="horizontal-line margin"></div>
                                <h2><strong>Academic Qualification</strong></h2>
                                <span>${academicQualification}</span>
                                <h2><strong>Work Experience</strong></h2>
                                <span>${workExperience}</span>
                                <h2><strong>Skills</strong></h2>
                                <span>${skills}</span>
                            </div>
                        </div>`;
                        previewContainer.style.display = 'block';
                    }
                    previewContainer.style.color = 'black';
                    const formContainer = document.querySelector('.form-container');
                    if (formContainer) {
                        formContainer.style.display = 'none';
                    }
                    document.body.style.background = 'white';
                }
            }
        };
        if (file) {
            reader.readAsDataURL(file);
        }
        else {
            alert('please upload your image');
        }
    }
}
// --------------------------------------------------------------------------------------------------------------------------------------------
// attach an event listener to the final button
(_a = document.querySelector('.finalbutton')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', (e) => {
    e.preventDefault();
    generateResume();
});
