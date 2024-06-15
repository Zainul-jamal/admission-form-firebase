// main.js

import { auth, db, signOut } from "./firebase.mjs";
import { collection, getDocs, updateDoc, deleteField, doc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

var table = document.getElementById("table");
var get = document.getElementById("get");

get.addEventListener("click", async () => {
    console.log("ok");

    // sweet  button (commented out for now)
    /*
    let timerInterval;            
    Swal.fire({
      title: "Auto close alert!",
      html: "I will close in <b></b> milliseconds.",
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const timer = Swal.getPopup().querySelector("b");
        timerInterval = setInterval(() => {
          timer.textContent = `${Swal.getTimerLeft()}`;
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      }
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log("I was closed by the timer");
      }
    });
    */

    const querySnapshot = await getDocs(collection(db, "application"));
    querySnapshot.forEach((doc) => {
        var data_get = doc.data();
        console.log(data_get);

        let raw_data = `
        <tr>
            <td>${data_get.name}</td>
            <td>${data_get.father}</td>
            <td>${data_get.email}</td>
            <td>${data_get.mobile}</td>
            <td>${data_get.cnic}</td>
            <td>${data_get.password}</td>
            <td>
                <button type="button" class="btn btn-secondary edit-btn" data-id="${doc.id}">Edit</button>
                <button type="button" class="btn btn-secondary delete-btn" data-id="${doc.id}">Delete</button>
            </td>
        </tr>
        `;
        table.innerHTML += raw_data;
    });

    var editButtons = document.getElementsByClassName("edit-btn");
    var deleteButtons = document.getElementsByClassName("delete-btn");

    for (let i = 0; i < editButtons.length; i++) {
        editButtons[i].addEventListener("click", () => {
            let docId = editButtons[i].getAttribute("data-id");
            alert(`Edit button clicked for document ID: ${docId}`);
            // Add your edit functionality here
        });
    }

    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener("click", async () => {
            let docId = deleteButtons[i].getAttribute("data-id");
            // Add your delete functionality here
            const docRef = doc(db, 'application', docId);

            // Remove fields from the document
            await updateDoc(docRef, {
                name: deleteField(),
                father: deleteField(),
                email: deleteField(),
                mobile: deleteField(),
                cnic: deleteField(),
                password: deleteField()
            });
        });
    }
});

var logOut = document.getElementById("logOut");
logOut.addEventListener("click", () => {
  signOut(auth).then(() => {
    alert("Are you Sure ?");
    window.location="index.html"
  }).catch((error) => {
    console.error("Sign-out error:", error);
  });
});
