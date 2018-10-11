import $ from "jquery";

/**
 * Append a new task to the list of completed todos
 *
 * @param text the task name
 */
export const appendCompletedListItem = text => {
  $("#completed-todos").append("<li>" + text + "</li>");
};

/**
 * Append a new task to the list of open todos
 *
 * @param text the task name
 * @param clickHandler A Javascript function that gets executed when you mark a task as completed
 */
export const appendOpenListItem = (text, clickHandler) => {
  const li = $("<li></li>");
  const button = $('<button class="btn btn-default btn-xs">✅</button> ');
  button.click(clickHandler);
  li.append(button);
  li.append(text);
  $("#open-todos").append(li);
};

/**
 * Listen leeren
 */
export const clearBothLists = () => {
  $("#open-todos, #completed-todos").empty();
};
