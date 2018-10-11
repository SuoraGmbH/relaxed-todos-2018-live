import {
  clearBothLists,
  appendOpenListItem,
  appendCompletedListItem
} from "./library";
import $ from "jquery";
import PouchDB from "pouchdb";
import "bootstrap/dist/css/bootstrap.css";

const refreshTodos = async () => {
  // Hier sollte die Komplette Liste geladen werden :)
};

$("#new-todo").keypress(function(e) {
  const todoText = todoInput.val().trim();
  if (e.which == 13 && todoText !== "") {
    todoInput.val("");
    // Hinzufügen eines Todos zur Datenbank
  }
});

refreshTodos();
