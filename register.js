var btn=document.getElementById("register")
console.log(btn)
btn.addEventListener("click",function(e){
    var email=document.getElementById("email").value
    var password=document.getElementById("password").value
    var address=document.getElementById("address").value
    var phone=document.getElementById("phone").value
    var first=document.getElementById("first").value
    var last=document.getElementById("last").value
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load",function(){
        console.log(xhr.response)
        window.location.href="login.html"
    })
    xhr.open("POST","http://localhost:8080/register/")
    xhr.setRequestHeader("Content-Type", "application/json");
    var data=JSON.stringify({"email":email,"password":password,"address":address,"phone":phone,"first":first,"last":last})
    xhr.send(data)
})