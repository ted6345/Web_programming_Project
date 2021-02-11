const eraseBtn = document.querySelector('.erase_btn');
const eraseBtn2 = document.querySelector('.erase_btn2');
eraseBtn.addEventListener("click", (e) => {
    console.log("eraseBtn clicked")
    eraseData();
})
eraseBtn2.addEventListener("click", (e) => {
    console.log("eraseBtn2 clicked")
    eraseData();
})

function eraseData() {
  $(document).ready(function () {
    $.ajax({
      method: 'POST',
      url: '/search/',
      data: {'erase': 'ok'},
      success: function (data) {
        console.log("---ajax erase post success---");
        console.log(data)
        $(document).ready(function () {
          $.ajax({
            method: 'GET',
            url: '/search/',
            success: function (data) {
              console.log("---ajax get success---");
              console.log("data", data)

              const historyBtn = document.querySelectorAll('.history_link')
              console.log(historyBtn)
              $('.history_link').remove()

            },
            error: function (data) {
              console.log("ajax get error");
            }
          });
        });
      },
      error: function (data) {
        console.log("ajax erase post error");
      }
    });
  });
}