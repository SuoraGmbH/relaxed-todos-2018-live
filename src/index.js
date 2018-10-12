import {
  clearBothLists,
  appendOpenListItem,
  appendCompletedListItem
} from "./library";
import $ from "jquery";
import PouchDB from "pouchdb";
import "bootstrap/dist/css/bootstrap.css";

// Als Client für CouchDB bitte folgende Zeile einkommentieren
// und den block darunter auskommentieren.
// const db = new PouchDB("http://localhost:5984/todos7");

const db = new PouchDB("todos7");
db.sync("http://localhost:5984/todos7", {
  live: true,
  retry: true
});

db.changes({
  since: "now",
  live: true
}).on("change", function() {
  refreshTodos();
});

const refreshTodos = async () => {
  db.allDocs({
    include_docs: true
  }).then(function(response) {
    clearBothLists();
    const todoDocuments = response.rows
      .map(row => row.doc)
      .filter(doc => doc.type === "todo");

    const openTodoDocuments = todoDocuments.filter(doc => !doc.completed);
    const completeTodoDocuments = todoDocuments.filter(doc => doc.completed);

    openTodoDocuments.forEach(doc =>
      appendOpenListItem(doc.todoText, function() {
        db.put({
          ...doc,
          completed: true
        });
      })
    );
    completeTodoDocuments.forEach(doc => appendCompletedListItem(doc.todoText));

    console.log(openTodoDocuments, completeTodoDocuments);
  });
};

const todoInput = $("#new-todo");

$("#new-todo").keypress(function(e) {
  const todoText = todoInput.val().trim();
  if (e.which == 13 && todoText !== "") {
    todoInput.val("");
    db.post({
      todoText: todoText,
      type: "todo",
      completed: false
    });
  }
});

refreshTodos();
