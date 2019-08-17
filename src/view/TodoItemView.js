import { element } from "../html-util.js";

export class TodoItemView {
  static createElement(todoItem, { onUpdateTodo, onDeleteTodo }) {
    const todoItemElement = todoItem.completed
      ? element`<li><input type="checkbox" checked/><s>${
          todoItem.title
        }</s><button>X</button></li>`
      : element`<li><input type="checkbox" />${
          todoItem.title
        }<button>X</button></li>`;
    const inputCheckboxElement = todoItemElement.querySelector(
      'input[type="checkbox"]'
    );
    inputCheckboxElement.addEventListener("change", () => {
      onUpdateTodo({
        id: todoItem.id,
        completed: !todoItem.completed
      });
    });
    const deleteButtonElement = todoItemElement.querySelector("button");
    deleteButtonElement.addEventListener("click", () => {
      onDeleteTodo({ id: todoItem.id });
    });
    return todoItemElement;
  }
}
