// post new task with AJAX request
function postTask() {
    let host = "";
    if (window.location.hostname === "localhost") {
        host = "http://localhost:3000";
    } else {
        host = "https://express-fs-todo-app.glitch.me"; 
    }

    const taskNew = document.getElementById('form-task').value;
    const dayNew = document.getElementById('form-day').value;
    const dateNew = document.getElementById('form-date').value;

    const postData = `task=${taskNew}&date=${dateNew}&day=${dayNew}`;

    fetch(`${host}/todo`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: postData
    })
        .then((response) => {
            return response.json();
        })
        .then((erg) => {
            console.log(erg);
            let answer = erg;

            // build html code
            let html = `<p>${answer.text}</p>`;

            // write answer to DOM
            document.getElementById("form-message").innerHTML = html;
            document.getElementById("form-message").style.display = 'inline-block';

            // reset input fields
            document.getElementById('form-task').value = '';
            document.getElementById('form-day').value = '';
            document.getElementById('form-date').value = '';

            loadList();
        })
        .catch((error) => {
            console.log('Error: ', error)
        })
}