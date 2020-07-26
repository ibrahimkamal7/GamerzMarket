var login=document.getElementById("login")
login.addEventListener("click",function(){
    var email=document.getElementById("email")
    var password=document.getElementById("password")
    var xhr=new XMLHttpRequest()
    xhr.addEventListener("load",function(){
        var parsed=JSON.parse(this.response)
        console.log(parsed.success)
        if(parsed.success=="true"){
            result=parsed.result[0]
            console.log(result)
            window.location.href = "http://localhost:8080/";
        }
        else{
            window.alert(parsed.error)
        }
    })
    xhr.open("POST","http://localhost:8080/login/")
    xhr.setRequestHeader("Content-Type", "application/json");
    var data=JSON.stringify({"email":email.value,"password":password.value})
    xhr.send(data)
})