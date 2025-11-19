call=()=>{
    console.log("i am a function")
}


sum = (a,b,c)=>
{
    console.log(a)
    console.log(b)
    c()
}
sum(5,6,call)

