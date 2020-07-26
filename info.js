var query=window.location.search
xhr=new XMLHttpRequest()
xhr.addEventListener("load",function(){
    var result=JSON.parse(this.response)
    document.getElementById("img").src="images\\"+result[0].image
    document.getElementById("img").alt=result[0].itemName
    document.getElementById("name").textContent="Name: "+result[0].itemName
    document.getElementById("platform").textContent="Platform: "+result[0].platform
    document.getElementById("description").textContent="Description: "+result[0].itemDescription
    document.getElementById("price").textContent="Price: $"+result[0].price
    document.getElementById("userName").textContent="Name: "+result[0].firstName+" "+result[0].lastName
    document.getElementById("phone").textContent="Conatct Number: "+result[0].phone
    document.getElementById("email").textContent="Email: "+result[0].email

})
xhr.open("GET","http://localhost:8080/info"+query)
xhr.send()