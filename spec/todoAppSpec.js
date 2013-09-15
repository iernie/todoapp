describe("TodoItem", function() {
	var todoItem = new TodoItem(1, "Remember the milk");

	it("contains an id and a title", function() {
		expect(todoItem.id).toBe(1);
		expect(todoItem.title).toBe("Remember the milk");
	});

	it("can change title", function() {
		expect(todoItem.title).toBe("Remember the milk");
		todoItem.title = "Remember the milk and cookies";
		expect(todoItem.title).toBe("Remember the milk and cookies");
	});
});

describe("Todo", function() {
	var todo = new Todo();

	it("contains an empty array on init", function() {
		expect(todo.items.length).toEqual(0);
	});

	it("returns -1 as last id if no input in list", function() {
		expect(todo.getLastId()).toEqual(-1);
	});

	it("can get an item", function() {
		var todoItem = new TodoItem(0, "Old title");
		todo.addItem(todoItem);
		expect(todo.getItem(0)).toBe(todoItem);
	});

	it("can add an item to the list", function() {
		var todoItem = new TodoItem(1, "Remember the milk");
		todo.addItem(todoItem);
		expect(todo.getItem(1)).toEqual(todoItem);
	});

	it("returns 1 as last id after two inputs", function() {
		expect(todo.getLastId()).toEqual(1);
	});

	it("can remove an item from the list", function() {
		var todoItem = new TodoItem(2, "Remember the cookies");
		todo.addItem(todoItem);

		expect(todo.items.length).toBe(3);
		todo.removeItem(1);
		expect(todo.items.length).toBe(2);
	});

	it("can change an item from the list", function() {
		expect(todo.getItem(0).title).toBe("Old title");
		todo.changeItem(0, "New title");
		expect(todo.getItem(0).title).toBe("New title");
	});
});