window.addEventListener("DOMContentLoaded", () => {
  //bot token
  let telegram_bot_id = "7420005943:AAGTvFWoTE52T70a5slcbZjo5oW13FHRDFw";
  //chat id
  let chat_id = -1002224736189;
  let u_name, email, message, tel, subject;
  let ready = function () {
    u_name = document.getElementById("name").value;
    email = document.getElementById("email").value;
    tel = document.getElementById("tel").value;
    subject = document.getElementById("subject").value;
    message = document.getElementById("message").value;
    message =
      "Ismi: " +
      u_name +
      "\nEmail: " +
      email +
      "\nTelefon: " +
      tel +
      "\nFan: " +
      subject +
      "\nIzoh: " +
      message;
  };
  let sendtelegram = function () {
    ready();
    let settings = {
      async: true,
      crossDomain: true,
      url: "https://api.telegram.org/bot" + telegram_bot_id + "/sendMessage",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "cache-control": "no-cache",
      },
      data: JSON.stringify({
        chat_id: chat_id,
        text: message,
      }),
    };
    $.ajax(settings).done(function (response) {
      console.log(response);
    });
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("tel").value = "";
    document.getElementById("subject").value = "";
    document.getElementById("message").value = "";
    return false;
  };
});
