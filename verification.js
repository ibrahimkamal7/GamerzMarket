console.log("test")
verify=document.getElementById("verify")
generate=document.getElementById("send")
code=document.getElementById("code")
generate.addEventListener("click",function(){
    str="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_-<>?+=/[]{}"
    var res=""
    for(i=0;i<30;i++){
        res=res+str.charAt(Math.floor(Math.random()*str.length))
    }
    window.res=res
    var xhr=new XMLHttpRequest()
    xhr.addEventListener("load",function(){
        console.log("email has been sent")
    })
    xhr.open("POST","http://localhost:8080/verify/")
    xhr.setRequestHeader("Content-Type", "application/json");

    if(sessionStorage.getItem("email")){
        var data=JSON.stringify({"email":sessionStorage.getItem("email"),"code":res})
        xhr.send(data)
        
    }
    else{
        window.alert("not logged in")
    }
})
console.log(verify)

verify.addEventListener("click",function(){
    if(code.value==window.res){
        console.log("verified")
    }
    else{
        console.log("wrong code")
    }
    
})