import Swal from "sweetalert2";
import Pusher from "pusher-js";

let pusher;

const channels = {};

Pusher.logToConsole = true;

function getPusher() {
  return pusher;
}

function createPusher() {
  pusher = new Pusher("31228d6611e35745a3c9", {
    cluster: "ap1",
    authEndpoint: "http://123.19.51.38:3000/api/v1/pusher/auth", // commit sua thanh 3000
    auth: {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    },
  });


  if (["company"].includes(localStorage.getItem("role"))) {
    channels["private-own-company"] = pusher.subscribe(`private-user-${localStorage.getItem("user")}`);
    channels["private-own-company"].bind("property-approved", (data) => {
      console.log('bai viet duoc approve')
      Swal.fire({
        title: "New Property?",
        text: "Approval Status for new property!",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Look at!",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/home/item/"+data.target_id; // Dan toi route bai dang
        }
      });
    });
  }

  if (["customer"].includes(localStorage.getItem("role"))) {
    channels["private-customers"] = pusher.subscribe("private-customers");
    channels["private-customers"].bind("property-approved", (data) => {
console.log(data)
      // check neu khong phai bai dang cua minh thi ko hien thong bao
      console.log('co bai viet moi')
      Swal.fire({
        title: "co bai viet moi",
        text: "Active for new user!",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Look at!",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/home/item/"+data.target_id;
        }
      });
    });
  }

}
export {
  createPusher, getPusher
}