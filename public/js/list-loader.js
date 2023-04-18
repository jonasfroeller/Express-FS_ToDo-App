// load todo list with AJAX request
loadList();

function loadList() {
    let host = "";
    if (window.location.hostname === "localhost") {
        host = "http://localhost:3000";
    } else {
        host = "https://express-fs-todo-app.glitch.me"; 
    }

    fetch(`${host}/todo`)
        .then( (response) =>{
            console.log(response);
            return response.json();
        })
        .then( (data) => {
            let answer = "";
            console.log(data);
            for (let i = 0; i < data.length; i++){
                if (i % 3 === 0) {
                    answer += '<div class="flex">';
                }
                answer += `<div class="item">
                            <h2>Task ${i+1}</h2>
                            <p class="task">${data[i].task}</p>
                            <p class="time">${data[i].day}, ${data[i].date}</p>
                            </div>`;
                if ((i + 1) % 3 === 0 || i === data.length - 1) {
                    answer += '</div>';
                }
            }
            document.getElementById('erg').innerHTML = answer;
        })
        .catch( (error) =>{
            console.log('U messed up! Error: ' + error)
        });


}
