// post new task with AJAX request
function postTask() {
    let taskNew = document.getElementById('form-task').value;
    let dayNew = document.getElementById('form-day').value;
    let dateNew = document.getElementById('form-date').value;

    let postData = `task=${taskNew}&date=${dateNew}&day=${dayNew}`;
    const date1 = new Date();

    fetch('http://localhost:3000/todo', {
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