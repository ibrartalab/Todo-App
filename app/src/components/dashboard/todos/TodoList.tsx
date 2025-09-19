import { TodoItem } from "./TodoItem";
// import { TodoContext } from "../../context/TodosContext";

const TodoList = () => {
  // const { setFilters } = useContext(SearchContext);
  // const {totalTodos,totalTodosCompleted} = useContext(TodoContext);
  // const handleFiltersChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   switch (event.target.value) {
  //     case "all":
  //       setFilters("all");
  //       break;
  //     case "active":
  //       setFilters("active");
  //       break;
  //     case "completed":
  //       setFilters("completed");
  //       break;
  //     default:
  //       setFilters("all");
  //   }
  // };

  return (
    <div className="todos-list-container-rendered w-full h-[470px] overflow-y-scroll">
      <TodoItem />
    </div>
  );
};

export default TodoList;
