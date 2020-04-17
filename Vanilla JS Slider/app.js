var lists = document.querySelectorAll("ul li");

console.log(lists);

function hide(lists) {
  lists.forEach(function (cur) {
    cur.style.display = "none";
  });
}

function startSlide() {
  hide(lists);
  lists[0].style.display = "block";
}

startSlide();
