
let btnAddNew = document.querySelector("#btnAddNew");
let addKh = document.querySelector("#addKh");
let addEn = document.querySelector("#addEn");
let addPecsent = document.querySelector("#addPecsent");
let close_alert = document.querySelector("#close_alert");
let btncloseAdd = document.querySelector("#btncloseAdd");
let form_add = document.querySelector("#formAdd");
var alert_add = document.querySelector("#alert_add");
let login_icon = document.querySelector("#login_icon");
let backLogin = document.querySelector("#backLogin");
let add_New = document.querySelector("#add_New");
let selectRow = true;
let updateId;
getData();
function getData() {
    fetch('https://api.chandalen.dev/api/languages')
        .then(res => res.json())
        .then(json => {
            if (sessionStorage.getItem('tokenkey')) {
                backLogin.innerHTML = "Logout";
            }
            let tr = '';
            json.data.forEach(element => {
                tr += `
                        <tr>
                            <td class="d-none ID">${element.id}</td>
                            <td class="km_name">${element.km_name}</td>
                            <td class="en_name">${element.en_name}</td>
                            <td class="percent">${element.percent}</td>
                            <td>
                                <button class="btn fs-5 text-primary btn-sm edit-btn" data-bs-toggle="modal" data-bs-target="#add_New" onclick="updateRow(this)"><i class="fa-solid fa-pen-nib"></i></button>
                                <button class="btn text-danger delete-btn fs-5" onclick="DaleteRow(this)" ><i class="fa-solid fa-trash-can"></i></button>
                            </td>
                        </tr>
                    `;
            });
            document.querySelector('tbody').innerHTML = tr;
        });
}

btnAddNew.onclick = () => {

    if (validate()) {
        if (selectRow) {
            addData();
        } else {
            update();
            selectRow = true;
        }
    }

    form_add.reset();
}

function validate() {
    let check = true;
    if (addKh.value == '') {
        document.querySelector("#label_Kh").innerHTML = "Please input Khmer language";
        check = false;
    } else {
        document.querySelector("#label_Kh").innerHTML = "";
        check = true;
    }

    if (addEn.value == '') {
        document.querySelector("#label_En").innerHTML = "Please input English language";
        check = false;
    } else {
        document.querySelector("#label_En").innerHTML = "";
        check = true;
    }

    if (addPecsent.value == '') {
        document.querySelector("#label_Pecsent").innerHTML = "Please input Percent";
        check = false;
    } else {
        document.querySelector("#label_Pecsent").innerHTML = "";
        check = true;
    }
    return check;
}
addKh.oninput = () => {
    if (addKh.value == '') {
        document.querySelector("#label_Kh").innerHTML = "Please input Khmer language";
    } else {
        document.querySelector("#label_Kh").innerHTML = "";
    }
}
addEn.oninput = () => {
    if (addEn.value == '') {
        document.querySelector("#label_En").innerHTML = "Please input English language";
    } else {
        document.querySelector("#label_En").innerHTML = "";
    }
}
addPecsent.oninput = () => {
    if (addPecsent.value == '') {
        document.querySelector("#label_Pecsent").innerHTML = "Please input Percent";
    } else {
        document.querySelector("#label_Pecsent").innerHTML = "";
    }
}

close_alert.onclick = () => {
    document.querySelector("#alert_add").classList.add("d-none");
}
btncloseAdd.onclick = () => {
    form_add.reset();
    document.querySelector("#label_Kh").innerHTML = "";
    document.querySelector("#label_En").innerHTML = "";
    document.querySelector("#label_Pecsent").innerHTML = "";
}
backLogin.onclick = () => {
    location = "../login.html";
    sessionStorage.removeItem('tokenkey');
}
login_icon.onclick = () => {
    login_icon.classList.add("res_log")
    setTimeout(() => {
        login_icon.classList.remove("res_log");
    }, 4000);
}

function addData() {
    fetch('https://api.chandalen.dev/api/languages', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('tokenkey')
        },
        body: JSON.stringify({
            km_name: addKh.value,
            en_name: addEn.value,
            percent: addPecsent.value
        })
    })
        .then(res => res.json())
        .then(json => {
            add_New.classList.remove('show');
            document.querySelector(".modal-backdrop ").classList.remove('show');
            alert_add.classList.remove("d-none");
            document.querySelector("#boxmessage").innerHTML = json.message;
            setTimeout(() => {
                alert_add.classList.add("d-none");
                document.querySelector("#percentmessage").innerHTML = " ";
            }, 3000);

            if (json.result == false) {
                document.querySelector("#boxmessage").classList.add("text-danger");
                document.querySelector("#percentmessage").innerHTML = ", Percent must be between 1 and 100.";

            } else {
                document.querySelector("#percentmessage").innerHTML = "";
                document.querySelector("#boxmessage").classList.remove("text-danger");
            }
            getData();
        })
}
function updateRow(th) {
    selectRow = false;
    let row = th.parentElement.parentElement;
    addKh.value = row.querySelector(".km_name").innerHTML;
    addEn.value = row.querySelector(".en_name").innerHTML;
    addPecsent.value = row.querySelector(".percent").innerHTML;
    updateId = row.querySelector(".ID").innerHTML;
}
function update() {
    fetch('https://api.chandalen.dev/api/languages/'+updateId, {
        method: "PUT",
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': 'Bearer ' + sessionStorage.getItem('tokenkey')
        },
        body: JSON.stringify({
            km_name: addKh.value,
            en_name: addEn.value,
            percent: addPecsent.value
        })
    })
        .then(res => res.json())
        .then(json => {
            add_New.classList.remove('show');
            document.querySelector(".modal-backdrop ").classList.remove('show');
            alert_add.classList.remove("d-none");
            document.querySelector("#boxmessage").innerHTML = json.message;
            setTimeout(() => {
                alert_add.classList.add("d-none");
            }, 3000);

            if (json.result == true) {
                document.querySelector("#boxmessage").classList.remove("text-danger");
               
            } else {
                document.querySelector("#boxmessage").classList.add("text-danger");
            }
            getData();
        })
}
function DaleteRow(tr) {
    let id = tr.parentElement.parentElement.querySelector(".ID").innerHTML;
    fetch('https://api.chandalen.dev/api/languages/' + id, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('tokenkey'),
        }
    })
        .then(res => res.json()) // or res.text();
        .then(json => {
            getData();
            alert_add.classList.remove("d-none");
            document.querySelector("#boxmessage").innerHTML = json.message;
            setTimeout(() => {
                alert_add.classList.add("d-none");
            }, 3000);

            if (json.result == false) {
                document.querySelector("#boxmessage").classList.add("text-danger");
            } else {
                document.querySelector("#boxmessage").classList.remove("text-danger");
            }
        })
}
