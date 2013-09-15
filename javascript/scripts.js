var todo;

function escapeHtml(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
 }

function itemToHTML(item) {
	return '<li>' + item.title  + '<span class="list-item-options"><a href="#" onclick="changeItem('+ item.id +'); return;">Change</a><a href="#" onclick="deleteItem('+ item.id +'); return;">Archive</a></span></li>'
}

function refreshList() {
	$("#itemList").html("");
	for(item in todo.items) {
		$("#itemList").append(itemToHTML(todo.items[item]));
	}
}

function addItem() {
	var selectedItem = $('#itemName').attr("data-selected-item");
	if(selectedItem == "") {
		var todoItem = new TodoItem(todo.getLastId()+1, escapeHtml($('#itemName').val().trim()));
		todo.addItem(todoItem);
		$('#itemName').val("");
	} else {
		todo.changeItem(selectedItem, $('#itemName').val())
		$('#itemName').val("");
		$('#itemName').attr("data-selected-item", "");
	}
	saveToLocalStorage();
	refreshList();
}

function changeItem(id) {
	$('#itemName').val(todo.getItem(id).title);
	$('#itemName').attr("data-selected-item", id);
}

function deleteItem(id) {
	todo.removeItem(id);
	saveToLocalStorage();
	refreshList();
}

function loadFromLocalStorage() {
	var todo = new Todo();
	var items = JSON.parse(localStorage.getItem("items"));
	if(items != null) {
		todo.items = items; 
	}

	var lastId = JSON.parse(localStorage.getItem("lastId"));
	if(lastId != null) {
		todo.lastId = lastId;
	}

	return todo;
}

function saveToLocalStorage() {
	localStorage.setItem("items", JSON.stringify(todo.items));
	localStorage.setItem("lastId", JSON.stringify(todo.lastId));
}

$(document).ready(function() {
	todo = loadFromLocalStorage();
	refreshList();

	$("#addItemForm").on('submit', function(event) {
		event.preventDefault();
	});

    $('#itemName').keypress(function(event) {
		if (event.which == 13 && $('#itemName').val().trim() != "") {
			event.preventDefault();
			addItem();
		}
	});
});