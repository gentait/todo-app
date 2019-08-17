import { TodoListModel } from "./model/TodoListModel.js";
import { TodoItemModel } from "./model/TodoItemModel.js";
import { render } from "./html-util.js";
import { TodoListView } from "./view/TodoListView.js";

export class App {
  constructor() {
    //TodoListの初期化
    this.todoListView = new TodoListView();
    this.todoListModel = new TodoListModel();
  }
  mount() {
    const formElement = document.querySelector("#js-form");
    const inputElement = document.querySelector("#js-form-input");
    const containerElement = document.querySelector("#js-todo-list");
    const todoItemCounterElement = document.querySelector("#js-todo-count");
    const todoListView = new TodoListView();
    this.todoListModel.onChange(() => {
      const todoListElement = todoListView.createElement(
        this.todoListModel.getTodoItems(),
        {
          onUpdateTodo: this.todoListModel.updateTodo.bind(this.todoListModel),
          onDeleteTodo: this.todoListModel.deleteTodo.bind(this.todoListModel)
        }
      );
      //containerElementの中身をtodoListElementで置き換える
      render(todoListElement, containerElement);
      //アイテム数の表示を更新
      todoItemCounterElement.textContent = `Todoアイテム数：　${this.todoListModel.getTotalCount()}`;
    });
    //formを送信したら新しいTodoitemModelを追加する
    formElement.addEventListener("submit", event => {
      event.preventDefault();
      if (inputElement.value) {
        this.todoListModel.addTodo(
          new TodoItemModel({
            title: inputElement.value,
            completed: false
          })
        );
        inputElement.value = "";
      }
    });
  }
  unmount() {
    this.todoListModel._listeners = new Map();
  }
}
