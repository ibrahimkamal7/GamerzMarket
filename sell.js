document.getElementById("sell").addEventListener("click",function(){
    console.log("hello")
    xhr=new XMLHttpRequest()
    var platforms = document.getElementsByName("platform")
    for(var i=0;i<platforms.length;i++){
        console.log(platforms[i])
        if(platforms[i].checked){
            var platform = platforms[i].value
        }
    }

    console.log(platform)
    
    var form=document.getElementById("form")
    var formData = new FormData(form);
    console.log(Array.from(formData))
    xhr.addEventListener("load",function(){
        console.log("inside event listener")
        if(this.response=="success"){
            window.location.href = "http://localhost:8080/";
        }
    })
    xhr.open("POST","http://localhost:8080/sell/")
    xhr.send(formData)
},true)