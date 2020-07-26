console.log("blah...")
function newPage(id){
    console.log("id "+id)
    window.location.href = "info.html?id="+id;
}

function sendAJAX(platform){
    console.log("inside")
    xhr=new XMLHttpRequest()
    xhr.addEventListener("load",function(){
        console.log("inside load")
        var items=JSON.parse(this.response)
        loadData(items)
    })
    xhr.open("GET","http://localhost:8080/filter?platform="+platform,true)
    xhr.send()
    console.log(xhr.status)
}

function loadData(items){
    var container=document.getElementById("container")
    //container.innerHTML=""
    var child = container.lastElementChild;  
        while (child) { 
            container.removeChild(child); 
            child = container.lastElementChild;
        } 
    container.style.width="100%"
    for(var i=0;i<items.length;i++){
       // console.log(items[i])
        var child=document.createElement("div")
        var child1=document.createElement("div")
        var caption=document.createElement("div")
        var img=document.createElement("img")
        var name=document.createElement("span")
        var price=document.createElement("span")
        var platform=document.createElement("span")
        var name=document.createElement("span")
        child.className="col-xs-6 col-sm-6 col-lg-3 col-md-3"
        child1.className="thumbnail"
        child1.style.height="260px"
        img.src="images\\"+items[i].image
        img.style.width="100%"
        img.style.height="70%"
        
        img.setAttribute("id",items[i].itemId)
        img.addEventListener("click",function(){
            newPage(this.id)
        })
        name.textContent=items[i].itemName
        name.style.fontWeight="bold";
        caption.style.textAlign="center"
        price.textContent="$"+items[i].price
        price.style.float="right"
        platform.textContent=items[i].platform
        platform.style.float="left"
        caption.appendChild(name)
        caption.appendChild(document.createElement("br"))
        //caption.appendChild(document.createElement("br"))
        caption.appendChild(price)
        caption.appendChild(platform)
        child1.appendChild(img)
        child1.appendChild(document.createElement("br"))
        child1.appendChild(caption)
        child.appendChild(child1)

        container.appendChild(child)
        

    }
}

document.getElementById("logout").addEventListener("click",function(){
    xhr=new XMLHttpRequest()
    xhr.addEventListener("load",function(){

    })
    xhr.open("GET","http://localhost:8080/logout")
    xhr.send()
})

xhr=new XMLHttpRequest()
xhr.addEventListener("load",function(){
    var items=JSON.parse(this.response)
    console.log(items)
    loadData(items)
})

xhr.open("GET","http://localhost:8080/home/",true)
xhr.send()

document.getElementById("ps").addEventListener("click",function(){
    sendAJAX("PS")
})

document.getElementById("xbox").addEventListener("click",function(){
    sendAJAX("XBOX")
})

document.getElementById("other").addEventListener("click",function(){
    sendAJAX("other")
})
document.getElementById("all").addEventListener("click",function(){
    xhr=new XMLHttpRequest()
    xhr.addEventListener("load",function(){
        var items=JSON.parse(this.response)
        loadData(items)
    })
    xhr.open("GET","http://localhost:8080/home")
    xhr.send()
})

document.getElementById("search").addEventListener("click",function(){
    xhr=new XMLHttpRequest()
    xhr.addEventListener("load",function(){
        var items=JSON.parse(this.response)
        loadData(items)
    })
    var query=document.getElementById("query").value
    console.log(query)
    xhr.open("GET","http://localhost:8080/search?name="+query,true)
    xhr.send()
})
