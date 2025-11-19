// prime number-should not be divided by any number
// %=remainer /=quoetient  sqrt- square root-root  -console.log(Math.sqrt(4)) //2

function isPrimeNumber(num)
{
//  if(num<2)
//  {
//     return false;
//  }
for (var i=2; i<=Math.sqrt(num); i++)   //for (i<num; i<=num/2;)
{
    if (num<2 || num%i==0) return false;
}
return true;

}
console.log(isPrimeNumber(4)); //false
console.log(isPrimeNumber(5)); //true





