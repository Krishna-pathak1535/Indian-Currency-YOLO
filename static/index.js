// index.js

let englishtext = "";
let hinditext = "";
let notesData = {};
let confidenceData = {};
let imagebox;
let countInterval;

window.onload = () => {
    imagebox = $('#imagebox');

    $('#sendbutton').click(() => {
        englishtext = "";
        hinditext = "";
        notesData = {};
        confidenceData = {};
        hideInterface();
        resetProgress();

        const input = $('#imageinput')[0];
        if (input.files && input.files[0]) {
            let formData = new FormData();
            formData.append('image', input.files[0]);

            updateInterface();

            $.ajax({
                url: "http://127.0.0.1:8080/detectObject",
                type: "POST",
                data: formData,
                cache: false,
                processData: false,
                contentType: false,
                error: function(jqXHR, textStatus, errorThrown) {
                    console.error("Upload error:", textStatus, errorThrown);
                    console.error("Response Headers:", jqXHR.getAllResponseHeaders());

                    $('#english-text').text("Error: Could not process image. Please check your backend server.");
                    $('#hindi-text').text("");
                    $('#notes-display').empty();
                    $('#total-amount').empty();

                    showResults();
                },
                success: function(data) {
                    console.log("Server response:", data);

                    if (data && data.status) {
                        const bytestring = data.status;
                        const image = bytestring.split('\'')[1];
                        imagebox.attr('src', 'data:image/jpeg;base64,' + image);
                        resizeImage();
                    } else {
                        console.warn("No 'status' field (image data) found in server response.");
                        imagebox.attr('src', '');
                    }

                    englishtext = data.englishmessage || "No English description provided by server.";
                    hinditext = data.hindimessage || "No Hindi description provided by server.";
                    notesData = data.raw_labels || {};
                    confidenceData = data.confidence_scores || {};

                    $('#english-text').text(englishtext);
                    $('#hindi-text').text(hinditext);

                    displayDetectedNotes(notesData, confidenceData);

                    displayTotalAmount(notesData);

                    showResults();
                }
            });
        } else {
            alert("Please select an image to upload.");
            hideInterface();
        }
    });
};

function displayDetectedNotes(notesData, confidenceData) {
    const notesDisplay = $('#notes-display');
    notesDisplay.empty();

    if (!notesData || Object.keys(notesData).length === 0) {
        notesDisplay.html('<p class="no-notes">No currency notes detected</p>');
        return;
    }

    let notesGridHTML = '<div class="notes-grid">';

    for (const [noteType, count] of Object.entries(notesData)) {
        const rupeeValue = noteType.replace("Rupees", "");
        const confidence = confidenceData && typeof confidenceData[noteType] === 'number' ?
            confidenceData[noteType].toFixed(2) : '0.00';

        const noteCardHTML = `
            <div class="note-card">
                <div class="note-value">₹${rupeeValue}</div>
                <div class="note-count">${count} ${count > 1 ? 'notes' : 'note'}</div>
                <div class="note-confidence">Confidence: ${confidence}%</div>
            </div>
        `;
        notesGridHTML += noteCardHTML;
    }
    notesGridHTML += '</div>';
    notesDisplay.html(notesGridHTML);
}

function displayTotalAmount(notesData) {
    const totalDisplay = $('#total-amount');

    if (!notesData || Object.keys(notesData).length === 0) {
        totalDisplay.html('');
        return;
    }

    let totalAmount = 0;
    for (const [noteType, count] of Object.entries(notesData)) {
        const rupeeValue = parseInt(noteType.replace("Rupees", ""));
        if (!isNaN(rupeeValue)) {
            totalAmount += rupeeValue * count;
        }
    }

    const totalHTML = `
        <div class="total-amount-box"> <h3>Total Amount:</h3>
            <div class="amount-value">₹${totalAmount}</div>
        </div>
    `;
    totalDisplay.html(totalHTML);
}

function readUrl(input) {
    console.log("evoked readUrl");
    if (input.files && input.files[0]) {
        let reader = new FileReader();
        reader.onload = function(e) {
            imagebox.attr('src', e.target.result);
            resizeImage();
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function myResizeFunction2(y) {
    if (y.matches) {
        imagebox.width(640);
        imagebox.height(640);
    } else {
        imagebox.width(940);
        imagebox.height(740);
    }
}

function myResizeFunction1(x) {
    if (x.matches) {
        imagebox.width(360);
        imagebox.height(360);
    } else {
        let y = window.matchMedia("(max-width:1050px)");
        myResizeFunction2(y);
        y.addListener(myResizeFunction2);
    }
}

function resizeImage() {
    let x = window.matchMedia("(max-width:700px)");
    myResizeFunction1(x);
    x.addListener(myResizeFunction1);
}

function hideInterface() {
    $(".loading").hide();
    let progresstext = document.querySelector('.text');
    if (progresstext) progresstext.style.display = "none";

    $('#result-section').hide();

    $('#english-text').empty();
    $('#hindi-text').empty();
    $('#notes-display').empty();
    $('#total-amount').empty();
    imagebox.attr('src', '');
}

function updateInterface() {
    $(".loading").show();
    progress();
}

function showResults() {
    $(".loading").hide();
    let progresstext = document.querySelector('.text');
    if (progresstext) {
        progresstext.style.display = "block";
        progresstext.innerText = "Processing Completed!";
    }

    $('#result-section').show();
}

function resetProgress() {
    clearInterval(countInterval);
    let percent = document.querySelector('.percent');
    let progress = document.querySelector('.progress');
    let text = document.querySelector('.text');

    if (percent) {
        percent.classList.remove("text-blink");
        percent.innerText = "0%";
        percent.style.fontSize = "";
    }
    if (progress) {
        progress.style.width = '0px';
    }
    if (text) {
        text.style.display = "none";
        text.innerText = "Completed!";
    }
}

function progress() {
    let percent = document.querySelector('.percent');
    let progress = document.querySelector('.progress');
    let text = document.querySelector('.text');
    let count = 0;
    let per = 0;

    clearInterval(countInterval);

    countInterval = setInterval(animateProgress, 50);

    function animateProgress() {
        if (count >= 100 && per >= 360) {
            percent.classList.add("text-blink");
            percent.innerText = "Processing Completed!";
            percent.style.fontSize = "20px";
            text.style.display = "block";
            clearInterval(countInterval);
        } else {
            per = Math.min(per + 4, 360);
            count = Math.min(count + 1, 100);

            if (progress) progress.style.width = per + 'px';
            if (percent) percent.innerText = count + '%';
        }
    }
}

function changeColor() {
    let sendButton = document.querySelector("#sendbutton");
    sendButton.style.backgroundColor = "orange";
    sendButton.style.color = "black";
}