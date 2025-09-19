import { useContext, useEffect, useState } from "react";
import Button from "../../Button";
import { FaCheck, FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { SearchContext } from "../../../context/SearchContext";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../hooks/redux/reduxHooks";
import EditTodo from "./EditTodo";
import {
  fetchTodosByUserId,
  updateTodo,
} from "../../../features/todos/todoSlice";

import { Loader } from "../../Loader";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import type { Todo, UpdateTodoPayload } from "../../../features/todos/types";

export const TodoItem = () => {
  const { searchParam, filters } = useContext(SearchContext);
  const userTodos = useAppSelector((state) => state.todos.userTodos);
  const userId = useAppSelector((state) => state.auth.userId);
  const loading = useAppSelector((state) => state.todos.loading);
  const dispatch = useAppDispatch();
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const axiosPrivate = useAxiosPrivate();

  // Filtering logic for todos
  const filteredTodos = userTodos.filter((todo) => {
    const matchSearch = todo.todo
      ?.toLowerCase()
      .includes(searchParam.toLowerCase());
    let matchState: boolean = true;
    const matchSecondState: boolean = !todo.isRemoved;

    if (filters === "active") {
      matchState = !todo.isCompleted;
    } else if (filters === "completed") {
      matchState = todo.isCompleted;
    }

    return matchSearch && matchState && matchSecondState;
  });

  // const filteredTodos = userTodos;

  // Function to handle editing a todo item
  const handleEditClick = (id: number) => {
    setEditingTodoId(id);
  };

  // Function to close the edit modal
  const closeEditModal = () => {
    setEditingTodoId(null);
  };

  // Function to handle marking a todo item as completed or active
  // This function will be called when the user clicks the checkbox
  // It updates the todo item's status and completed date
  const handleMarkTodo = async (todoToMark: Todo) => {
    try {
      const updatePayload: UpdateTodoPayload = {
        id: todoToMark.id,
        updatedFields: {
          todo: todoToMark.todo,
          isCompleted: !todoToMark.isCompleted,
          completedAt: !todoToMark.completedAt
            ? new Date().toISOString()
            : null,
        },
      };
      const response = await dispatch(
        updateTodo({ payload: updatePayload, axiosPrivate })
      );
      if (response.meta.requestStatus === "fulfilled") {
        console.log("Updated successfully!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Function to handle deleting a todo item
  // This function will be called when the user clicks the delete button
  const handleDeleteTodo = async (todoToDelete: Todo) => {
    try {
      const updatePayload: UpdateTodoPayload = {
        id: todoToDelete.id,
        updatedFields: { isRemoved: true, todo: todoToDelete.todo },
      };
      const response = await dispatch(
        updateTodo({ payload: updatePayload, axiosPrivate })
      );
      if (response.meta.requestStatus === "fulfilled") {
        console.log("Todo item deleted");
      }
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  useEffect(() => {
    console.log("user todos", userTodos);
    console.log("filtered todos", filteredTodos);
  }, [userTodos, filteredTodos]);
  //// Fetch todos by user ID when the component mounts
  // Assuming you have a userId available in your Redux store or context
  useEffect(() => {
    if (userId) {
      dispatch(fetchTodosByUserId({ payload: { userId }, axiosPrivate }));
    } else if (!userId) {
      console.warn("User ID not available for fetching todos.");
    }
    // If you want to fetch all todos, you can use fetchTodos() instead
  }, [dispatch, userId, axiosPrivate]);

  return (
    <>
      {loading && <Loader />}
      {userTodos.length === 0 && (
        <div className="w-full h-full flex justify-center items-center text-lg font-bold">
          You haven't added any tasks yet. Get started by adding your first
          to-do!
        </div>
      )}
      {filteredTodos.map((todo) => (
        <div key={todo.id} className={`py-2`}>
          {editingTodoId === todo.id && (
            <EditTodo
              id={todo.id}
              requestedData={todo}
              onClose={closeEditModal}
            />
          )}
          <div className="item-wrapper">
            <div className="todo-item-wrapper w-full h-10 flex justify-center items-center">
              <div
                className={`todo w-96 h-10 p-2 flex justify-between rounded-md bg-gray-200 text-black`}
              >
                <div className="w-8 h-full flex justify-center items-center">
                  <Button
                    type="button"
                    title=""
                    onClick={() => handleMarkTodo(todo)}
                    disabled={false}
                    styleClass="w-full h-full border-2 border-black flex justify-center items-center"
                  >
                    {todo.isCompleted ? (
                      <FaCheck className="text-lg text-green-500" />
                    ) : (
                      ""
                    )}
                  </Button>
                </div>
                <div className="todo-left flex items-center w-full h-full ml-4">
                  <p
                    className={`w-max text-wrap ${
                      todo.isCompleted ? "line-through" : ""
                    }`}
                  >
                    {todo.todo}
                  </p>
                </div>
                <div className="todo-right w-20 flex justify-evenly items-center h-full">
                  <Button
                    title=""
                    onClick={() => handleEditClick(todo.id)}
                    disabled={false}
                    styleClass="w-6 h-6 flex justify-center items-center"
                  >
                    <FaRegEdit className="text-lg text-indigo-500" />
                  </Button>
                  <Button
                    title=""
                    onClick={() => handleDeleteTodo(todo)}
                    disabled={false}
                    styleClass="w-6 h-6 flex justify-center items-center"
                  >
                    <RiDeleteBin6Line className="text-lg text-red-500" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
