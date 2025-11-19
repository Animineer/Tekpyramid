

var input = document.getElementById("input"); 
var btn = document.getElementById("button");

var result = document.getElementById("new")// to store the value

// btn.addEventListener("click",()=>{

//   var output = input.value;    

//   var inner = document.createElement("li")
//   inner.innerHTML = output;
//   result.append(inner)
// })                    


btn.addEventListener("click",()=>{
  var inner = document.createElement("li")

  inner.innerHTML = input.value + `<button onclick="dele(event)">delete</button>`;

  result.append(inner)
})


function dele(event){
  event.target.parentElement.remove();

}