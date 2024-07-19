//select elements
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let sub = document.getElementById("sub");
//get total
function getTotal(){
    if(price.value !== ""){
        let result = (+price.value + +ads.value + +taxes.value )
        - +discount.value;
        total.innerHTML = result;
        total.style.backgroundColor ="#040";
    }else{
        total.innerHTML ="";
        total.style.backgroundColor ="#f00";
        
    }
}
