//ユニークなIDを管理する変数
let todoIndex = 0;

export class TodoItemModel {
  /**
   * @param {string} title Todoアイテムのタイトル
   * @param {*} completed Todoアイテムが完了済みならtrue、そうでない場合はfalse
   */
  constructor({ title, completed }) {
    //idは自動的に連番となりそれぞれのインスタンスごとに異なるものとする
    this.id = todoIndex++;
    this.title = title;
    this.completed = completed;
  }
}
