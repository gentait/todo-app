import { TodoListModel } from "./model/TodoListModel.js";
import { TodoItemModel } from "./model/TodoItemModel.js";
import { element, render } from "./html-util.js";

export class App {
  constructor() {
    //TodoListの初期化
    this.todoListModel = new TodoListModel();
  }
  mount() {
    const formElement = document.querySelector("#js-form");
    const inputElement = document.querySelector("#js-form-input");
    const containerElement = document.querySelector("#js-todo-list");
    const todoItemCounterElement = document.querySelector("#js-todo-count");
    this.todoListModel.onChange(() => {
      //Todoリストをまとめる要素
      const todoListElement = element`<ul/>`;
      //それぞれのTodoアイテム要素をtodoListElement以下へ追加する
      const todoItems = this.todoListModel.getTodoItems();
      todoItems.forEach(item => {
        const todoItemElement = item.completed
          ? element`<li><input type="checkbox" checked/><s>${
              item.title
            }</s><button>X</button></li>`
          : element`<li><input type="checkbox" />${
              item.title
            }<button>X</button></li>`;
        const inputCheckboxElement = todoItemElement.querySelector(
          'input[type="checkbox"]'
        );
        inputCheckboxElement.addEventListener("change", () => {
          this.todoListModel.updateTodo({
            id: item.id,
            completed: !item.completed
          });
        });
        const deleteButtonElement = todoItemElement.querySelector("button");
        deleteButtonElement.addEventListener("click", () => {
          this.todoListModel.deleteTodo({ id: item.id });
        });
        todoListElement.appendChild(todoItemElement);
      });
      //containerElementの中身をtodoListElementで置き換える
      render(todoListElement, containerElement);
      //アイテム数の表示を更新
      todoItemCounterElement.textContent = `Todoアイテム数：　${this.todoListModel.getTotalCount()}`;
    });
    //formを送信したら新しいTodoitemModelを追加する
    formElement.addEventListener("submit", event => {
      event.preventDefault();
      this.todoListModel.addTodo(
        new TodoItemModel({
          title: inputElement.value,
          completed: false
        })
      );
      inputElement.value = "";
    });
  }
}
