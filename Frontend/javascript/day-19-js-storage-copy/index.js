let localcount = localStorage.getItem('count')
let span=document.querySelector('span')
let button=document.querySelector('button')

button.addEventListener('click', ()=>{
localCount ++;
span.textContent=local

localStorage.setItem('count',localCount)
})