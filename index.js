import { auth, db } from "./firebase.mjs";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


var btn = document.getElementById("btn");
btn.addEventListener("click", () => {
  var name = document.getElementById("name").value;
  // var lastName = document.getElementById("lastName").value;
  var password = document.getElementById("pass").value;
  var father = document.getElementById("father").value;
  var mobile = document.getElementById("mobile").value;
  var cnic = document.getElementById("cnic").value;
  var email = document.getElementById("email").value;
  var spiner = document.getElementById("spiner");
  var loder = `
    <div class="input-data text-center p-2">
      <div class="inner"></div>
      <div class="spinner-border text-light" role="status">
        <span class="visually-hidden"></span>
      </div>
      <input id="btn" type="submit" value="submit">
    </div>`;
  
  spiner.innerHTML = loder;
  
  var user = {
    name: name,
    password: password,
    father: father,
    mobile: mobile,
    cnic: cnic,
    email: email,
  };

  createUserWithEmailAndPassword(auth, user.email, user.password)
    .then(async (userCredential) => {
      const createdUser = userCredential.user;
      console.log(createdUser);
      
      try {
        const docRef = await addDoc(collection(db, "application"), {
          name: user.name,
          father: user.father,
          password: password,
          mobile: user.mobile,
          cnic: user.cnic,
          email: user.email,
          uid: createdUser.uid,
        });
        console.log("Document written with ID: ", docRef.id);
        
        spiner.innerHTML = `
          <div class="input-data">
            <div class="inner"></div>
            <input id="btn" type="submit" value="submit">
          </div>`;
        
        window.location.href = "data.html";
      } catch (e) {
        console.error("Error adding document: ", e);
      }

      console.log("User name is", user.name);
    })
    .catch((error) => {
      var body = document.body.firstElementChild;
      const errorCode = error.code;
      const errorMessage = error.message;
console.log(`ErrorCode  ${errorCode}
 Error Message${errorMessage}`);
 Swal.fire({
  icon: "error",
  title: "Oops...",
  text: "Please! Form fill first",
  footer: '<a href="index.html">Why do I have this issue?</a>'
});
 ;
      spiner.innerHTML = `
        <div class="input-data">
          <div class="inner"></div>
          <input id="btn" type="submit" value="submit">
        </div>`;
      
      // body.innerHTML = `
      //   <div class="alert alert-warning alert-dismissible fade show" role="alert">
      //     <strong>Alert!</strong> ${errorCode} <br> ${errorMessage}
      //     <button id="clsBtn" type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      //   </div>`;
      
      // var clsBtn = document.getElementById("clsBtn");
      // clsBtn.addEventListener("click", () => {
      //   body.innerHTML = body;
      // });
    });
});
