const handleTime = () => {
    let val = document.getElementById("inputValue").value;
    let url = "https://ekoulemaneng-timestamp.glitch.me/api/timestamp/" + val;
    document.getElementById("inputValue").value = "";
    fetch(url).then(res => res.json()).then(value => fillTable(value));
}

const fillTable = obj => {
    if (obj.hasOwnProperty('error')) document.getElementById("table").innerHTML = '<tr class="red"><td>Error</td><td>:</td><td>' + obj["error"] + '</td></tr>';
    else document.getElementById("table").innerHTML = '<tr><td>UNIX</td><td>:</td><td class="bold">' + obj["unix"] + '</td></tr>' + '<tr><td>UTC</td><td>:</td><td class="bold">' + obj["utc"] + '</td></tr>';
}

document.getElementById("sender").addEventListener("click", handleTime);
