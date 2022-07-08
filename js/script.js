/**  recursion function   
 
 *  */

function amountInWords(number) {
  //  word for 1-19 are store in  ones array
  let ones = [
    "Zero",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];
  //  20,30,..ans so on that is tens in word are stored
  let tens = [
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];
  // initial value
  let initial = 0;
  // the func  takes in a number   it check if number is less than 20 if yes  it put the number as index value to ones array to get the value in words
  if (number < 20) return ones[number];
  // if the number enter is in 2 digit <100 it goes to second if where the  remainder of  num %10 is taken and passed to the one arr as index and num/10-2 index to ten
  if (number < 100) {
    initial = number % 10;

    return (
      tens[Math.floor(number / 10) - 2] +
      " " +
      (initial > 0 ? ones[initial] : "")
    );
  }
  /*if num is is 3 digit <1000(max num==999) here  the the  the num is first divide by 100 and passed as index for one array to get first word then it checks if  number %100 is greater than 0 is y  and  hundred string is added then we need to cll the func again with this value(num%100)
   * to convert the remaining digit in words */
  if (number < 1000) {
    return (
      ones[Math.floor(number / 100)] +
      " Hundred " +
      (number % 100 > 0 ? amountInWords(number % 100) : "")
    );
  }
  /*if num is is 5 digit <100000 () here  the the  the num is first divide by 1000 and passed as prop and recursion  and the func is call back again with this value then  && it checks if  number %1000 is greater than 0 is y then we need to cll the func again with this value(num%100)
   * to convert the remaining digit in words */
  if (number < 100000) {
    return (
      amountInWords(Math.floor(number / 1000)) +
      " Thousand " +
      (number % 1000 > 0 ? amountInWords(number % 1000) : "")
    );
  }
  /*if num is is 7 digit <10000000 here  the the  the num is first divide by 100000 and passed as prop and the func is call back again with this value then  && it checks if  number %1000 is greater than 0 is y then we need to cll the func again with this value(num%100)
   * to convert the remaining digit in words */
  if (number < 10000000) {
    return (
      amountInWords(Math.floor(number / 100000)) +
      " Lakh " +
      (number % 100000 > 0 ? amountInWords(number % 100000) : "")
    );
  }
  // if the digit is greater than  10000000 this is called is  keep the num divided by 10000000 and pass the value as prop to func and call the fun unit ...
  return (
    amountInWords(Math.floor(number / 10000000)) +
    " Crore " +
    (number % 10000000 > 0 ? amountInWords(number % 10000000) : "")
  );
}
// input tag  for  loan amount
const loanAmount = document.querySelector("#loanAmount");
// p tag that display the amount in word
const loanAmountWords = document.querySelector("#loanAmountWords");
// onchange func for input tag
loanAmount.onchange = function () {
  let number = parseInt(this.value);
  // amount to word fun is called
  let words = amountInWords(number);
  //  value is given as  inerhtml value to p tag
  loanAmountWords.innerHTML = `${words} RS`;
};

//captcha code
//  2 nums are needed for  mathematical captcha
let number1;
let number2;
// setting  limit to m random num
let maxNum = 100;
// sum
let total;
// canvas tag
const canvas = document.getElementById("canvas");
// generate func
function generateCaptcha() {
  // creating context of canva
  const context = canvas.getContext("2d");
  // clearing  previous canvas
  context.clearRect(0, 0, canvas.width, canvas.height);
  // getting the first & second random number with max num as limit
  number1 = Math.floor(Math.random() * maxNum);
  number2 = Math.floor(Math.random() * maxNum);
  // suming the total
  total = number1 + number2;
  // storing the value in local storage
  localStorage.setItem("captcha", total);

  // setting the color ,font size and family  of text in canvas
  context.fillStyle = "black";
  context.font = "20px san-serif";
  // adding content to canvas
  let textSum = number1 + " +" + number2;
  context.fillText(textSum, 10, 20);
}
//  on page load || reload   set the localStorage captcha to  empty and generate new
window.addEventListener("load", () => {
  localStorage.setItem("captcha", "");
  localStorage.setItem("count", "0");

  generateCaptcha();
});
//  on click  set the localStorage captcha to  empty and generate new
document.querySelector("#newGen").addEventListener("click", () => {
  localStorage.setItem("captcha", "");
  generateCaptcha();
});

// handling submit i.e checking if enter captcha is correct and  redirecting to thanku page
// form
const form = document.querySelector("#loanForm");
// on submit
form.addEventListener("submit", (event) => {
  // prevent page refresh
  event.preventDefault();
  // getting captcha
  const storedCaptcha = parseInt(localStorage.getItem("captcha"));
  // user enter captcha
  const userInput = parseInt(document.querySelector("#captcha").value);
  //  other user data from form
  const UserNAme = document.querySelector("#name").value;
  const UserEmail = document.querySelector("#email").value;
  const UserPAN = document.querySelector("#PAN").value;
  const UserLoanAmount = document.querySelector("#loanAmount").value;
  // checking  if captcha is correct
  if (storedCaptcha === userInput) {
    //  if yes submit
    form.submit();
    localStorage.removeItem("captcha");
    // redirecting to
    window.location.href = `/thanku.html?name=${UserNAme}&email=${UserEmail}&PAN=${UserPAN}&loanAmount=${UserLoanAmount}`;
  } else {
    // prevent refresh
    event.preventDefault();
    // show user alert
    alert("enter wronged captcha");
  }
});
