import { AddTodo } from "../../components/dashboard/todos/AddTodo";
import TodoList from "../../components/dashboard/todos/TodoList";

const DashboardHome = () => {
  return (
    <div className="flex flex-col gap-2 w-full h-full">
      <div className="addtodo">
        <AddTodo />
      </div>
      <div className="todoList-container">
        <TodoList />
      </div>
    </div>
  );
};

export default DashboardHome;
