function registerUser() {
    let name = document.getElementById("name").value;
    let college = document.getElementById("college").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let retypePassword = document.getElementById("retypePassword").value;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/register", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onload = function () {
        let response = JSON.parse(xhr.responseText);
        document.getElementById("result").innerText = response.message;
    };

    xhr.send(`name=${encodeURIComponent(name)}&college=${encodeURIComponent(college)}&username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&retype_password=${encodeURIComponent(retypePassword)}`);
}

function suggestCollege() {
    const input = document.getElementById("college").value;
    const suggestionsList = document.getElementById("suggestions");

    if (input.length < 2) {
        suggestionsList.innerHTML = "";
        return;
    }

    let xhr = new XMLHttpRequest();
    xhr.open("GET", "/suggest_college?query=" + encodeURIComponent(input), true);
    xhr.onload = function () {
        const response = JSON.parse(xhr.responseText);
        suggestionsList.innerHTML = ""; // Clear previous

        if (response.suggestions.length > 0) {
            response.suggestions.forEach(function (college) {
                const li = document.createElement("li");
                li.textContent = college;
                li.onclick = function () {
                    document.getElementById("college").value = college;
                    suggestionsList.innerHTML = "";
                };
                suggestionsList.appendChild(li);
            });
        }
    };
    xhr.send();
}

function checkUsernameAvailability() {
    const usernameInput = document.getElementById("username");
    const username = usernameInput.value.trim();
    const usernameStatus = document.getElementById("usernameStatus");

    if (username.length < 3) {
        usernameStatus.innerText = "";
        return;
    }

    let xhr = new XMLHttpRequest();
    xhr.open("GET", "/check_username?username=" + encodeURIComponent(username), true);
    xhr.onload = function () {
        const response = JSON.parse(xhr.responseText);
        if (response.exists) {
            usernameStatus.innerText = "Username already exists.";
            usernameStatus.style.color = "red";
        } else {
            usernameStatus.innerText = "Username is available.";
            usernameStatus.style.color = "green";
        }
    };
    xhr.send();
}
function validateName() {
    const name = document.getElementById("name").value.trim();
    const nameStatus = document.getElementById("nameStatus");

    if (name === "") {
        nameStatus.innerText = "Name cannot be empty.";
        nameStatus.style.color = "red";
    } else {
        nameStatus.innerText = "";
    }
}

function validatePasswordMatch() {
    const password = document.getElementById("password").value;
    const retypePassword = document.getElementById("retypePassword").value;
    const passStatus = document.getElementById("passwordStatus");

    if (retypePassword !== "" && password !== retypePassword) {
        passStatus.innerText = "Passwords do not match.";
        passStatus.style.color = "red";
    } else {
        passStatus.innerText = "";
    }
}


