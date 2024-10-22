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
                        FlavorQ.appendChild(document.createTextNode("Chocolate Ice Cream"));

                        // Add Chocolate Ice Cream Image
                        var FlavorImage = document.createElement("img");
                        FlavorImage.setAttribute("Class", "img-fluid rounded mx-2 queue-image");
                        FlavorImage.setAttribute("height", "30"); // Reduced height for queue images
                        FlavorImage.setAttribute("src", "pic/Choco ice-sream.png");

                        col1 = document.createElement("div");
                        col1.setAttribute("Class", "col-4");
                        col2 = document.createElement("div");
                        col2.setAttribute("Class", "col-8 text-end");
                        row = document.createElement("div");
                        row.setAttribute("Class", "row");
                        col1.appendChild(NameQ);
                        col2.appendChild(FlavorQ);
                        col2.appendChild(FlavorImage); // Attach image to queue
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

function AddOrderChoc() {
    xhr3.open("POST", "https://yumi-icecream-default-rtdb.asia-southeast1.firebasedatabase.app/Queue.json", false);
    obj = '{ "Name": "' + document.getElementById("Name").value + '" ,"Flavor": "Chocolate"}'; // Fixed to only use Chocolate
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
                document.getElementById("cStatus").innerHTML = "^o^";
                document.getElementById("cName").innerHTML = "Free Icecream from Real Robot";
            }
        }
    };
}

function GetStatus() {
    xhr3.open("GET", "https://yumi-icecream-default-rtdb.asia-southeast1.firebasedatabase.app/Status.json?print=pretty", true);
    xhr3.send();

    xhr3.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const Status = JSON.parse(this.responseText);
            document.getElementById("cStatusTitle").innerHTML = Status["Command"];
            console.log(Status["Command"]);

            if (Status["Command"] == "Processing") {
                document.getElementById("ProcessField").classList.add("border-danger");
                document.getElementById("processing").classList.add("progress-bar-striped", "progress-bar-animated");
            } else if (Status["Command"] == "Finish") {
                document.getElementById("processing").style.width = "100%";
                
            }

            // Slot 1
            updateSlot("Pos1", Status["Pos1"]);

            // Slot 2
            updateSlot("Pos2", Status["Pos2"]);

            // Slot 3
            updateSlot("Pos3", Status["Pos3"]);
        }
    };
}


function updateSlot(slotId, slotData) {
    if (slotData != "Empty") {
        document.getElementById(slotId + "Name").innerHTML = slotData["Name"];
        document.getElementById(slotId + "Flavor").innerHTML = "Chocolate Icecream";

        // Always show Chocolate image for slots
        var slotImage = document.getElementById(slotId + "Top");
        slotImage.setAttribute("src", "pic/Choco ice-sream.png");
        slotImage.setAttribute("Class", "img-fluid rounded mx-auto slot-image");
    } else {
        document.getElementById(slotId + "Name").innerHTML = "";
        document.getElementById(slotId + "Flavor").innerHTML = "Empty";
        document.getElementById(slotId + "Top").setAttribute("src", ""); // Clear image if empty
    }
}
