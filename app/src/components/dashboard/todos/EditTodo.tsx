import { MdOutlineCancel } from "react-icons/md";
import Button from "../../Button";
import Input from "../../Input";
import { useState } from "react";
import { useAppDispatch } from "../../../hooks/redux/reduxHooks";
import type { FetchTodosByUserIdPayload, Todo, UpdateTodoPayload } from "../../../features/todos/types";
import { updateTodo, fetchTodosByUserId } from "../../../features/todos/todoSlice";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

interface EditTodoProps {
  id: number;
  requestedData: Todo;
  onClose: () => void;
}

const EditTodo = ({ id, requestedData, onClose }: EditTodoProps) => {
  const [editedTodo, setEditedTodo] = useState(requestedData.todo);
  const dispatch = useAppDispatch();
  const axiosPrivate = useAxiosPrivate();

  // Handle update todo item
  const handleUpdate = async (userId: string) => {
    try {
      const updatePayload: UpdateTodoPayload = {
        id: id,
        updatedFields: { todo: editedTodo },
      };

      const response = await dispatch(updateTodo({payload:updatePayload,axiosPrivate}));
      if (response.meta.requestStatus === "fulfilled") {
        if (!userId) {
          throw new Error("userId must to provide");
        }

        const fetchTodosPayload:FetchTodosByUserIdPayload = {
          userId: userId,
        }
        if (userId) {
          await dispatch(fetchTodosByUserId({payload:fetchTodosPayload,axiosPrivate}));
        }
        // close modal
        onClose();
      }
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  return (
    <div className="w-full h-full bg-gray-400/60 fixed top-0 left-0 z-50 flex justify-center items-center">
      <div className="bg-white rounded-md shadow-md p-6 relative w-96">
        <MdOutlineCancel
          className="absolute top-2 right-2 text-2xl cursor-pointer text-indigo-500"
          onClick={onClose}
        />
        <Input
          label="Update Todo"
          placeholder="Enter task name..."
          type="text"
          name="todo"
          value={editedTodo}
          onChange={(e) => setEditedTodo(e.target.value)}
          styleClass="w-full"
        />
        <div className="flex justify-end mt-4">
          <Button
            title="Update"
            onClick={() => handleUpdate(requestedData.userId)}
            disabled={!editedTodo.trim()}
            styleClass="w-24 h-10 rounded-md text-white bg-indigo-600 hover:bg-indigo-500"
          />
        </div>
      </div>
    </div>
  );
};

export default EditTodo;
