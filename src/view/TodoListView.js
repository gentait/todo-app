import { element } from "../html-util.js";
import { TodoItemView } from "./TodoItemView.js";

export class TodoListView {
  createElement(todoItems, { onUpdateTodo, onDeleteTodo }) {
    const todoListElement = element`<ul/>`;
    todoItems.forEach(item => {
      const todoItemElement = TodoItemView.createElement(item, {
        onUpdateTodo,
        onDeleteTodo
      });
      todoListElement.appendChild(todoItemElement);
    });
    return todoListElement;
  }
}
