// TODO ITEM

function TodoItem(id, title) {
    this.id = id;
    this.title = title;
}

// TODO

function Todo() {
    this.lastId = -1;
    this.items = [];
}

Todo.prototype.getLastId = function() {
    return this.lastId;
}

Todo.prototype.getItem = function(id) {
    var item = this.items.filter(function(item){return item.id == id});
    if(item.length > 0) {
        return item[0];
    } else {
        return undefined;
    }
};

Todo.prototype.addItem = function(item) {
    this.lastId = item.id;
    this.items.push(item);
};

Todo.prototype.removeItem = function(id) {
    this.items = this.items.filter(function(item){return item.id != id});
};

Todo.prototype.changeItem = function(id, title) {
    this.getItem(id).title = title;
};