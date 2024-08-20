(()=>{
    var Email = document.querySelector("#email_log");
    var Password = document.querySelector("#password");
    var look_password = document.querySelector("#look_password");
    document.querySelector("#frm").onsubmit = () =>{
        event.preventDefault();
        if(validate()){
            insertLoging();
        }
        resetForm();        
    }

    function insertLoging(){
        let Email = document.querySelector("#email_log").value;
        let password = document.querySelector("#password").value;
        fetch('https://api.chandalen.dev/api/login', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: Email,
                password: password,
            })
        })
        .then(res => res.json())
        .then(json => {
            if(json.result==true){
                document.querySelector("#alert_log").classList.remove("d-none");
                document.querySelector("#alert_message").innerHTML= json.message;
                document.querySelector("#alert_message").classList.remove("text-danger");
                setTimeout(()=>{
                    document.querySelector("#alert_log").classList.add("d-none");
                },4000)
                location="page/index.html";
            }else{
                document.querySelector("#alert_log").classList.remove("d-none");
                document.querySelector("#alert_message").innerHTML= json.message;
                document.querySelector("#label_password").innerHTML= json.message;
                document.querySelector("#alert_message").classList.add("text-danger");
                setTimeout(()=>{
                    document.querySelector("#alert_log").classList.add("d-none");
                },4000)
            }
            sessionStorage.setItem('tokenkey', json.data.token);
            
        })
    }

    document.querySelector("#close_alert").onclick = ()=>{
        document.querySelector("#alert_log").classList.add("d-none")
    }
    function resetForm(){
        document.querySelector("#frm").reset();
    }
    function validate(){
        let check = true;
        if(Email.value == ''){
            document.querySelector("#label_email").innerHTML="Please input Email";
            check = false;
        }else{
            document.querySelector("#label_email").innerHTML="";
            check=true;
        }

        if(Password.value == ''){
            document.querySelector("#label_password").innerHTML="Please input Password";
            check = false;
        }else{
            document.querySelector("#label_password").innerHTML="";
            check=true;
        }
        return check;
    }
    Email.oninput = () =>{
        if(Email.value == ''){
            document.querySelector("#label_email").innerHTML="Please input Email";
        }else{
            document.querySelector("#label_email").innerHTML="";
        }
    }
    Password.oninput = () =>{
        if(Password.value == ''){
            document.querySelector("#label_password").innerHTML="Please input Password";
        }else{
            document.querySelector("#label_password").innerHTML="";
        }
    }
    look_password.onmousedown = () =>{
        if(Password.type == "password"){
            Password.setAttribute("type","text");
            document.querySelector("#look_icon").classList.remove("fa-lock");
            document.querySelector("#look_icon").classList.add("fa-unlock");
        }
        setTimeout(()=>{
            Password.setAttribute("type","password");
            document.querySelector("#look_icon").classList.remove("fa-unlock");
            document.querySelector("#look_icon").classList.add("fa-lock");
        },500)
        // else{
        //     Password.setAttribute("type","password");
        //     document.querySelector("#look_icon").classList.remove("fa-unlock");
        //     document.querySelector("#look_icon").classList.add("fa-lock");
        // }
    }
})();