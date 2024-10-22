xhr = new XMLHttpRequest();
xhr2 = new XMLHttpRequest();
xhr3 = new XMLHttpRequest();
xhr4 = new XMLHttpRequest();
xhr5 = new XMLHttpRequest();
xhr6 = new XMLHttpRequest();
let list;
let Pos1;
let Pos2;
let Pos3;
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
                        NameQ.setAttribute("Class", "card-title");
                        NameQ.appendChild(document.createTextNode(list[key]['Name']));
                        var FlavorQ = document.createElement("b");
                        FlavorQ.setAttribute("Class", "card-text text-end");
                        FlavorQ.appendChild(document.createTextNode(list[key]['Flavor'] + " Ice Cream"));

                        col1 = document.createElement("div");
                        col1.setAttribute("Class", "col-4");
                        col2 = document.createElement("div");
                        col2.setAttribute("Class", "col-8 text-end");
                        row = document.createElement("div");
                        row.setAttribute("Class", "row");
                        col1.appendChild(NameQ);
                        col2.appendChild(FlavorQ);
                        row.appendChild(col1);
                        row.appendChild(col2);

                        card = document.createElement("div");
                        card.setAttribute("Class", "card-body");
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

function AddOrderMilk() {
    xhr3.open("POST", "https://yumi-icecream-default-rtdb.asia-southeast1.firebasedatabase.app/Queue.json", false);
    obj = '{ "Name": "' + document.getElementById("Name").value + '" ,"Flavor": "Milk"}';
    xhr3.send(obj);

    xhr3.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        }
    };
}

function AddOrderChoc() {
    xhr3.open("POST", "https://yumi-icecream-default-rtdb.asia-southeast1.firebasedatabase.app/Queue.json", false);
    obj = '{ "Name": "' + document.getElementById("Name").value + '" ,"Flavor": "Chocolate"}'; //send Chocolate to robot
    xhr3.send(obj);

    xhr3.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        }
    };
}

function GetCurrent() {
    xhr2.open("GET", "https://yumi-icecream-default-rtdb.asia-southeast1.firebasedatabase.app/Status/CurrentOrder.json?print=pretty", true);
    xhr2.send();

    xhr2.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            CurrentOrder = JSON.parse(this.responseText);
            console.log(CurrentOrder);
            if (list != null) {
                if (list.hasOwnProperty(CurrentOrder)) {
                    document.getElementById("cName").innerHTML = list[CurrentOrder]['Name'];
                    console.log(list[CurrentOrder]['Name']);
                }
            }

            if (CurrentOrder == "Empty") {
                document.getElementById("ProcessField").setAttribute("Class", "card border-danger");
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
            Status = JSON.parse(this.responseText);
            document.getElementById("cStatusTitle").innerHTML = Status["Command"];
            console.log(Status["Command"]);
            if (Status["Command"] == "Processing") {
                document.getElementById("ProcessField").setAttribute("Class", "card border-danger");
                document.getElementById("processing").setAttribute("class", "progress-bar bg-danger progress-bar-striped progress-bar-animated");
                document.getElementById("processing").setAttribute("style", "width: " + progress + "%");
                document.getElementById("cStatus").innerHTML = "Please wait.";
            } else if (Status["Command"] == "Finish") {
                progress = 100;
                document.getElementById("processing").setAttribute("style", "width: " + progress + "%");
                document.getElementById("ProcessField").setAttribute("Class", "card border-success");
                document.getElementById("cStatus").innerHTML = "Enjoy. Have a nice day. :)";
                document.getElementById("processing").setAttribute("class", "progress-bar bg-success progress-bar-striped progress-bar-animated");
            } else if (Status["Command"] == "Ready") {
                progress = 0;
                document.getElementById("processing").setAttribute("style", "width: " + progress + "%");
            }

            Pos1 = Status["Pos1"];
            if (Pos1 != "Empty") {
                document.getElementById("Pos1Name").innerHTML = Pos1["Name"];
                document.getElementById("Pos1Flavor").innerHTML = Pos1["Flavor"] + " Icecream";
            } else {
                document.getElementById("Pos1Name").innerHTML = "";
                document.getElementById("Pos1Flavor").innerHTML = "Empty";
            }

            Pos2 = Status["Pos2"];
            if (Pos2 != "Empty") {
                document.getElementById("Pos2Name").innerHTML = Pos2["Name"];
                document.getElementById("Pos2Flavor").innerHTML = Pos2["Flavor"] + " Icecream";
            } else {
                document.getElementById("Pos2Name").innerHTML = "";
                document.getElementById("Pos2Flavor").innerHTML = "Empty";
            }

            Pos3 = Status["Pos3"];
            if (Pos3 != "Empty") {
                document.getElementById("Pos3Name").innerHTML = Pos3["Name"];
                document.getElementById("Pos3Flavor").innerHTML = Pos3["Flavor"] + " Icecream";
            } else {
                document.getElementById("Pos3Name").innerHTML = "";
                document.getElementById("Pos3Flavor").innerHTML = "Empty";
            }

            progress = Number(Status["Progress"]);
        }
    };
}

function GetProgress() {
    xhr5.open("GET", "https://yumi-icecream-default-rtdb.asia-southeast1.firebasedatabase.app/Status/Progress.json?print=pretty", true);
    xhr5.send();

    xhr5.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            progress = Number(JSON.parse(this.responseText));
        }
    };
}
