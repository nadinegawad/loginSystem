"use strict"
let nameInput = document.querySelector('#nameInput');
let emailInput = document.querySelector("#emailInput");
let passwordInput = document.querySelector("#passwordInput");
let loginBtn = document.querySelector('#loginBtn');
let signUpBtn = document.querySelector('#signUpBtn');


let usersList = [];
if (localStorage.getItem("userInfo") != null) {
   usersList = JSON.parse(localStorage.getItem("userInfo"));
   console.log(usersList);
}

let flag =true;
function checkEmail() {
   for (let i = 0; i < usersList.length; i++) {
      if (usersList[i].email == emailInput.value) {
         return true;
      }else{
         return false;
      }
   }
}

function addUser() {
   if (valideteNameInput() == true && validateEmailInput() == true && validatePassword() == true) {
      let userInfo = {
         userName: nameInput.value,
         email: emailInput.value,
         password: passwordInput.value
      }
      usersList.push(userInfo);
      localStorage.setItem("userInfo", JSON.stringify(usersList));
      document.querySelector("#wrongSignup").innerHTML = `<p class= 'text-success fs-5'>Success</p>`;
      flag=false;
   } else {
      document.querySelector("#wrongSignup").innerHTML = `<p class= 'text-danger fs-5'>All inputs is required </p>`;
   }
}

function signUp(){
   if (checkEmail()==false) {
      addUser();
      
   }else{
      document.querySelector("#wrongSignup").innerHTML = `<p class= 'text-danger fs-5'>email already exists</p>`;

   }
}

function login() {
   for (let i = 0; i < usersList.length; i++) {
      let emailInput = document.querySelector("#emailInput");
      if (usersList[i].email == emailInput.value && usersList[i].password == passwordInput.value) {
         localStorage.setItem('userName',usersList[i].userName);
         location.href = 'welcome.html';
       }else{
         document.querySelector("#wrongSign").innerHTML = `<p class= 'text-danger fs-5'>All inputs is required </p>`;

       }
   }
}

let welcomeUserName=localStorage.getItem("userName");

function displayWelcome(){
   document.querySelector("#welcomeUser").innerHTML=`<h>welcome ${welcomeUserName}</h>`;
}

//add event listener

signUpBtn.addEventListener('click', function () {
   if (flag==true){
      addUser();
   }else{
      signUp();
   }

})

nameInput.addEventListener('input', function () {
   valideteNameInput();
})

//validation

function valideteNameInput() {
   let regex = /^[a-z(0-9)?]{3,15}$/gmi;
   if (regex.test(nameInput.value) == true) {
      return true;
   } else {
      return false;
   }
}

function validateEmailInput() {
   let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/gi;
   if (regex.test(emailInput.value) == true) {
      return true;

   } else {
      return false;
   }
}
function validatePassword() {
   let regex = /^[a-z0-9(@$#%&)?]{8,25}$/gmi;
   if (regex.test(passwordInput.value) == true) {
      return true;
   } else {
      return false;
   }
}