import { EventEmitter } from "../EventEmitter.js";

export class TodoListModel extends EventEmitter {
  /**
   * @param {TodoItemModel[]} items 初期アイテム一覧（デフォルトは空の配列）
   */
  constructor(items = []) {
    super();
    this.items = items;
  }
  /**
   * TodoItemの合計個数を返す
   * @param {number}
   */
  getTotalCount() {
    return this.items.length;
  }
  /**
   * 表示できるTodoItemの配列を返す
   */
  getTodoItems() {
    return this.items;
  }
  /**
   * TodoListの状態が更新されたときに呼び出されるリスナー関数を登録する
   */
  onChange(listener) {
    this.addEventListener("change", listener);
  }
  /**
   * 状態が変更された時に呼ぶ。登録済みのリスナー関数を呼び出す。
   */
  emitChange() {
    this.emit("change");
  }
  /**
   * TodoItemを追加する
   * @param {TodoItemModel} todoItem
   */
  addTodo(todoItem) {
    this.items.push(todoItem);
    this.emitChange();
  }
  /**
   * 指定したidのTodoItemのcompletedを更新する
   * @param {{id:number,completed:boolean}}
   */
  updateTodo({ id, completed }) {
    //idが一致するTodoItemを見つけ、あればcompletedを更新する
    const todoItem = this.items.find(item => {
      return item.id === id;
    });
    if (!todoItem) return;
    todoItem.completed = completed;
    this.emitChange();
  }
  /**
   * 指定したIdのTodoItemを削除する
   * @param {{id:number}}
   */
  deleteTodo({ id }) {
    //idが一致するTodoItemをthis.itemsから取り除く
    this.items = this.items.filter(item => {
      return item.id !== id;
    });
    this.emitChange();
  }
}
