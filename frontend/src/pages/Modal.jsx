import { useForm } from "react-hook-form";
import TaskService from "../services/Task";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";
import PropTypes from "prop-types";

const Modal = ({ type, isOpen, onClose, title, task }) => {
  const { handleSubmit, register, reset } = useForm();

  const { token } = useAuth();

  const taskStoreMutation = TaskService.taskStore(token);
  const taskUpdateMutation = TaskService.taskUpdate(token);
  const taskIndexQuery = TaskService.taskIndex(token);

  const onSubmit = async (data) => {
    data.user_id = 1;

    if (type == "store") {
      try {
        await taskStoreMutation.mutateAsync(data);
        taskIndexQuery.refetch();
        onClose();
      } catch (error) {
        console.error("Error submitting data:", error);
      }
    } else if (type == "update") {
      data.id = task.id;
      const { id, ...rest } = data;
      const temp = {
        id,
        data: rest,
      };

      try {
        await taskUpdateMutation.mutateAsync(temp);
        taskIndexQuery.refetch();
        onClose();
      } catch (error) {
        console.error("Error submitting data:", error);
      }
    }
  };

  useEffect(() => {
    if (type == "update") {
      const { title, description, deadline, status } = task;

      reset({
        title,
        description,
        deadline,
        status,
      });
    }
  }, [type, reset, task]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <div className="flex items-center justify-between border-b pb-2">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            ✕
          </button>
        </div>

        <div className="mt-4">
          <div className="absolute inset-0 w-full max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {type == "store" ? "Tambah" : "Edit"} Tasklist
              </h2>
              <button
                className="text-gray-400 hover:text-gray-600 text-lg"
                onClick={onClose}
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Tasklist
                </label>
                <input
                  type="text"
                  {...register("title")}
                  placeholder="Masukan judul tasklist"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  {...register("description")}
                  placeholder="Masukan deskripsi tasklist"
                  rows="4"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                ></textarea>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="deadline"
                  className="block text-sm font-medium text-gray-700"
                >
                  Deadline
                </label>
                <input
                  type="date"
                  {...register("deadline")}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700"
                >
                  Status
                </label>
                <select
                  {...register("status")}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option value="" disabled>
                    Pilih status
                  </option>
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Kembali
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
                >
                  {type == "store" ? "Tambah" : "Edit"} Data
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  type: PropTypes.string,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  task: PropTypes.object,
};

export default Modal;
