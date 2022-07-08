let params = new URLSearchParams(location.search);
// getting user 's first name
let userFirstName = params.get("name").split(" ")[0];
// user email and showing the same
let userEmail = params.get("email");
let nameText = document.querySelector("#name");
let emailText = document.querySelector("#email");
nameText.innerHTML = userFirstName;
emailText.innerHTML = userEmail;

// otp generation
function generateOtp() {
  return Math.floor(1000 + Math.random() * 9000);
}
//generate otp and store in local storage
window.addEventListener("load", async () => {
  const ifStored = localStorage.getItem("otp");
  if (!ifStored) {
    let otpStored = generateOtp();
    await localStorage.setItem("otp", otpStored);
  }
  console.log(`Verification code is  ${localStorage.getItem("otp")}`);
});
// count for  keeping the record a otp attempts done by user
var count = localStorage.getItem("count")
  ? parseInt(localStorage.getItem("count"))
  : 0;
localStorage.setItem("count", count);
// geting otp   and other html elements using query selector
const form = document.querySelector("#otpForm");
const successful = document.querySelector("#successful");
const otpVerificationDiv = document.querySelector(".otpVerification");
//  adding on submit event listener
form.addEventListener("submit", (event) => {
  // avoid refresh
  event.preventDefault();
  // getting count ,otp , from local storage and user input
  const otpSend = parseInt(localStorage.getItem("otp"));
  const userInputText = document.querySelector("#otp").value;
  let localCount = parseInt(localStorage.getItem("count"));
  const userInput = parseInt(userInputText);
  // if otp matches the send otp
  if (otpSend === userInput) {
    //   making the form hidden destroying the keys in local storage  show the verification success text and redirect to pixel6 page
    otpVerificationDiv.style.display = "none";
    successful.style.color = "green";
    successful.innerHTML = "Validation Successful!";
    localStorage.removeItem("otp");
    localStorage.removeItem("count");
    window.location.href = "https://pixel6.co/portfolio/";
  }
  //  if input enter  is less there 3 or  does match the send otp  popup  alert is shown
  if (userInput !== otpSend) {
    //   as user has  used his  attempt increasing count and storing in local storage as backup incase of refresh
    localCount += 1;
    localStorage.setItem("count", localCount);
    console.log(localCount);
    const attempts = 3 - localCount;
    if (attempts > 0) {
      alert(" wrong otp enter You have " + attempts + " attempts left");
    }
  }
  //  checking if user has used his/her 3 attempts(0,1,2)
  if (count === 2 || localCount === 2) {
    //   if yess than revoming items from local storage
    localStorage.removeItem("otp");
    localStorage.removeItem("count");
    // pop up alert msg
    alert(" You  enter wrong  otp 3 times");
    // redirect

    window.location.href = "http://pixel6.co/404";
  }
});
