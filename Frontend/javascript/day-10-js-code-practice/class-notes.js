// non primitive data typee
// ->function , array , object

// name
 let obj={
     fname:"pankaj",
     age:26,
     hobbies:["sleeping","playing","eating","study"],
     address:[{
        city:"chennai",
        state:"tn",
        pincode:600018
    },]                                                                                                                   
};
obj.phone=546878987;

console.log(typeof obj) //object
console.log(obj.fname);
console.log(obj["fname"])
console.log(obj.hobbies) // all the hobbies
console.log(obj.hobbies[3]) // study- check in browser




// another way

let obj2=new object();
mobile.name="oppo";
mobile.price=10000;
mobile.ram="4gb";

console.log(mobile)  // name:vivo price:10000 ram:4gb


let arr =["priya", 26 , "chennai", true , [30,40],{job:"ceo", company:"firelink"}]


