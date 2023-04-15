// load todo list with AJAX request
loadList();

function loadList() {
    fetch("http://localhost:3000/todo")
        .then( (response) =>{
            console.log(response);
            return response.json();
        })
        .then( (data) => {
            let answer = "";
            console.log(data);
            for(let i = 0; i < data.length; i++){
                answer += `<div class="item">
                            <h2>Task ${i+1}</h2>
                            <p class="task">${data[i].task}</p>
                            <p class="time">${data[i].day}, ${data[i].date}</p>
                            </div>`;
            }
            document.getElementById('erg').innerHTML = answer;
        })
        .catch( (error) =>{
            console.log('U messed up! Error: ' + error)
        });


}
