xhr = new XMLHttpRequest();
xhr2 = new XMLHttpRequest();
xhr3 = new XMLHttpRequest();
xhr4 = new XMLHttpRequest();
xhr5 = new XMLHttpRequest();
xhr6 = new XMLHttpRequest();
let list;
let Pos1, Pos2, Pos3;
let CurrentOrder = "";
let progress = 0;

function checkOrder() {
    xhr.open("GET", "https://yumi-icecream-default-rtdb.asia-southeast1.firebasedatabase.app/Queue.json?print=pretty", false);
    xhr.send();

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            list = JSON.parse(this.responseText);
            idList = [];

            var ul = document.getElementById("QueueField");

            while (ul.lastElementChild) {
                ul.removeChild(ul.lastElementChild);
            }

            if (list != null) {
                Object.keys(list).forEach(key => {
                    idList.push(key);
                    if (key != CurrentOrder) {
                        var NameQ = document.createElement("h4");
                        NameQ.setAttribute("class", "card-title");
                        NameQ.appendChild(document.createTextNode(list[key]['Name']));

                        var FlavorQ = document.createElement("img");
                        FlavorQ.setAttribute("class", "rounded mx-3");
                        FlavorQ.setAttribute("src", "pic/Choco ice-sream.png");
                        FlavorQ.setAttribute("height", "50");

                        let col1 = document.createElement("div");
                        col1.setAttribute("class", "col-4");

                        let col2 = document.createElement("div");
                        col2.setAttribute("class", "col-8 text-end");

                        let row = document.createElement("div");
                        row.setAttribute("class", "row");

                        col1.appendChild(NameQ);
                        col2.appendChild(FlavorQ);

                        row.appendChild(col1);
                        row.appendChild(col2);

                        let card = document.createElement("div");
                        card.setAttribute("class", "card-body");
                        card.appendChild(row);
                        ul.appendChild(card);
                    }
                });
            }

            GetCurrent();
            GetStatus();
        }
    };
}

function GetCurrent() {
    xhr2.open("GET", "https://yumi-icecream-default-rtdb.asia-southeast1.firebasedatabase.app/Status/CurrentOrder.json?print=pretty", true);
    xhr2.send();

    xhr2.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            CurrentOrder = JSON.parse(this.responseText);
            if (list != null && list.hasOwnProperty(CurrentOrder)) {
                document.getElementById("cName").innerHTML = list[CurrentOrder]['Name'];
            }

            if (CurrentOrder == "Empty") {
                document.getElementById("ProcessField").setAttribute("class", "card border-danger");
                document.getElementById("processing").setAttribute("class", "progress-bar bg-danger progress-bar-striped progress-bar-animated");
                document.getElementById("processing").setAttribute("style", "width: 0%");
                document.getElementById("cStatus").innerHTML = "^^";
                document.getElementById("cName").innerHTML = "Welcome";
            }
        }
    };
}

function GetStatus() {
    xhr3.open("GET", "https://yumi-icecream-default-rtdb.asia-southeast1.firebasedatabase.app/Status.json?print=pretty", true);
    xhr3.send();

    xhr3.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let Status = JSON.parse(this.responseText);
            document.getElementById("cStatusTitle").innerHTML = Status["Command"];

            if (Status["Command"] == "Processing") {
                document.getElementById("ProcessField").setAttribute("class", "card border-danger");
                document.getElementById("processing").setAttribute("class", "progress-bar bg-danger progress-bar-striped progress-bar-animated");
                document.getElementById("processing").setAttribute("style", "width: " + progress + "%");
                document.getElementById("cStatus").innerHTML = "Please wait.";
            } else if (Status["Command"] == "Finish") {
                progress = 100;
                document.getElementById("processing").setAttribute("style", "width: " + progress + "%");
                document.getElementById("ProcessField").setAttribute("class", "card border-success");
                document.getElementById("cStatus").innerHTML = "Enjoy. Have a nice day. :)";
                document.getElementById("processing").setAttribute("class", "progress-bar bg-success progress-bar-striped progress-bar-animated");
            } else if (Status["Command"] == "Ready") {
                progress = 0;
                document.getElementById("processing").setAttribute("style", "width: " + progress + "%");
            }

            updateSlot("Pos1", Status["Pos1"], "pic/Choco ice-sream.png");
            updateSlot("Pos2", Status["Pos2"], "pic/Choco ice-sream.png");
            updateSlot("Pos3", Status["Pos3"], "pic/Choco ice-sream.png");

            progress = Number(Status["Progress"]);
        }
    };
}

function updateSlot(slotId, statusData, imgSrc) {
    if (statusData != "Empty") {
        document.getElementById(`${slotId}Name`).innerHTML = statusData["Name"];
        document.getElementById(`${slotId}Flavor`).innerHTML = statusData["Flavor"];
        document.getElementById(`${slotId}Img`).setAttribute("src", imgSrc);
        document.getElementById(`${slotId}Img`).setAttribute("width", "125");
    } else {
        document.getElementById(`${slotId}Name`).innerHTML = "";
        document.getElementById(`${slotId}Flavor`).innerHTML = "";
        document.getElementById(`${slotId}Img`).setAttribute("src", "");
    }
}
