// console.log('my ts works perfectly');

// function to add more text area
let textAreaCount: number = 1;

function addTextArea(containerId: string): void {
    const container = document.getElementById(containerId) as HTMLElement | null;
    if (container) {
        const textArea = document.createElement('textarea');

        // modify the name based on containerId to ensure the right name is set
        if (containerId === "textAreasContainer") {
            textArea.name = "Academic Qualification" + textAreaCount;
        } else if (containerId === 'skillsContainer') {
            textArea.name = 'skills' + textAreaCount;
        }

        container.appendChild(textArea);
        container.appendChild(document.createElement('br'));
        textAreaCount++;
    }
}
// -------------------------------------------------------------------------------------------
// function to display the templates
function templateResume(): void {
    const templates = document.querySelector('.templates') as HTMLElement | null;
    if (templates) {
        templates.style.display = 'block';
    }
}
// -------------------------------------------------------------------------------------------------------

// function to generate resume preview
function generateResume(): void {
    const selectedTemplate = document.querySelector('input[name="template"]:checked') as HTMLInputElement | null;
    if (!selectedTemplate) {
        alert('please select a template before generating your resume');
        return;
    }

    const nameInput = document.querySelector('input[name="name"]') as HTMLInputElement | null;
    const phoneInput = document.querySelector('input[name="phonenumber"]') as HTMLInputElement | null;
    const emailInput = document.querySelector('input[name="email"]') as HTMLInputElement | null;
    const facebookInput = document.querySelector('input[name="facebook"]') as HTMLInputElement | null;
    const instagramInput = document.querySelector('input[name="instagram"]') as HTMLInputElement | null;
    const linkedinInput = document.querySelector('input[name="linkedin"]') as HTMLInputElement | null;
    const objectiveInput = document.querySelector('textarea[name="objective"]') as HTMLTextAreaElement | null;

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
        const textArea = area as HTMLTextAreaElement;
        workExperience += textArea.value + `<br>`;
    });

    let academicQualification = '';
    document.querySelectorAll('textarea[name^="Academic Qualification"]').forEach((area) => {
        const textArea = area as HTMLTextAreaElement;
        academicQualification += textArea.value + `<br>`;
    });

    let skills = '';
    document.querySelectorAll('textarea[name^="skills"]').forEach((area) => {
        const textArea = area as HTMLTextAreaElement;
        skills += textArea.value + `<br>`;
    });

    const imageInput = document.querySelector('input[name="image"]') as HTMLInputElement | null;
    if (imageInput && imageInput.files) {
        const file = imageInput.files[0];
        const reader = new FileReader();

        reader.onload = function (event) {
            const imageURL = event.target?.result as string | null;
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

                const previewContainer = document.querySelector('.preview-container') as HTMLElement | null;
                if (previewContainer) {
                    if (selectedTemplate.value === 'template-1') {
                        previewContainer.innerHTML = previewHTML;
                        previewContainer.style.display = 'block';
                    } else {
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
                    const formContainer = document.querySelector('.form-container') as HTMLElement | null;
                    if (formContainer) {
                        formContainer.style.display = 'none';
                    }
                    document.body.style.background = 'white';
                }
            }
        };

        if (file) {
            reader.readAsDataURL(file);
        } else {
            alert('please upload your image');
        }
    }
}

// --------------------------------------------------------------------------------------------------------------------------------------------
// attach an event listener to the final button
document.querySelector('.finalbutton')?.addEventListener('click', (e) => {
    e.preventDefault();
    generateResume();
});

