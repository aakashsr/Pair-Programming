// 1. Create two modules
// 2. Add event listener
// 3. create addListItem function
// 4. Get data from fields
// 5. clear the fields
// 6. add event listener to delete the btn
// 7. create function to delete the item
// 8. create function to clear tasks.
// 9. create function to filter tasks.

var UIController = (function () {
  return {
    inputData: function () {
      return {
        inputValue: document.querySelector("#task").value,
      };
    },

    displayInput: function (value) {
      var html =
        '<li class="collection-item">%description%<a href="#" class="delete-item secondary-content"><i class="fa fa-remove"></i></a></li>';

      var newHTML = html.replace("%description%", value);

      document
        .querySelector(".collection")
        .insertAdjacentHTML("beforeend", newHTML);
    },
  };
})();

var controller = (function (UICtrl) {
  // Add event listeners

  document
    .querySelector(".btn")
    .addEventListener("click", (e) => ctrlAddListItem(e));

  document
    .querySelector(".collection")
    .addEventListener("click", (e) => ctrlDeleteListItem(e));

  document
    .querySelector(".clear-tasks")
    .addEventListener("click", (e) => clearListItems(e));

  document
    .getElementById("filter")
    .addEventListener("input", (e) => ctrlFilterItems(e));

  // unction  add and display item
  var ctrlAddListItem = function (e) {
    var data;
    e.preventDefault();

    // 1. Get input data
    data = UICtrl.inputData();

    // 2. Display input data
    if (data.inputValue !== "") {
      UICtrl.displayInput(data.inputValue);
    }

    // 3. clear input field and refocus
    document.getElementById("task").value = "";
    document.getElementById("task").focus();
  };

  // function to delete item
  var ctrlDeleteListItem = function (e) {
    var listItems = document.querySelectorAll(".collection-item");
    var listItemsArray = Array.prototype.slice.call(listItems);
    var parent = e.target.parentNode.parentNode;
    const mainParent = parent.parentNode;
    if (parent.className === "collection-item") {
      mainParent.removeChild(parent);
    }
  };

  // function to clear all items
  var clearListItems = function (e) {
    e.preventDefault();
    var listParent = document.querySelector(".collection");
    var listItems = document.querySelectorAll(".collection-item");
    var listItemsArray = Array.prototype.slice.call(listItems);
    listItemsArray.forEach(function (cur) {
      listParent.removeChild(cur);
    });
    document.getElementById("task").value = "";
    document.getElementById("task").focus();
  };

  // function to filter items
  var ctrlFilterItems = function (e) {
    var listItems = document.querySelectorAll(".collection-item");
    var listItemsArray = Array.prototype.slice.call(listItems); // converting nodelists into array
    listItemsArray.forEach(function (cur) {
      var content = cur.textContent.toLowerCase();
      if (content.includes(e.target.value)) {
        cur.style.display = "block";
      } else if (!content.includes(e.target.value)) {
        cur.style.display = "none";
      }
    });
  };
})(UIController);
