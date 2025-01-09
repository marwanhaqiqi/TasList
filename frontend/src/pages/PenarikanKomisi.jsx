import { useState } from "react";
import logoutIcon from "../assets/log-out.png";
import { useAuth } from "../contexts/AuthContext";
import Modal from "./Modal";
import TaskService from "../services/Task";
import ActionDropdown from "./ActionDropdown";

const Dashboard = () => {
  const token = localStorage.getItem("token");
  const taskIndexQuery = TaskService.taskIndex(token);

  const { name, logout } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);

  const handleCloseModal = () => setIsModalOpen(false);

  // const handleUpdateTaskStatus = async (taskId, status) => {
  //   try {
  //     await TaskService.taskUpdate(token, taskId, { status });
  //     taskIndexQuery.refetch(); // Refresh data setelah update
  //   } catch (error) {
  //     console.error("Gagal mengupdate status:", error);
  //   }
  // };

  const handleUpdateTaskStatus = async (taskId, status) => {
    try {
      await TaskService.taskUpdate(token).mutateAsync({
        id: taskId,
        data: { status },
      });
      taskIndexQuery.refetch(); // Refresh data setelah update
    } catch (error) {
      console.error("Gagal mengupdate status:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await TaskService.taskDelete(token, taskId);
      taskIndexQuery.refetch(); // Refresh data setelah delete
    } catch (error) {
      console.error("Gagal menghapus task:", error);
    }
  };

  return (
    <div className="p-8">
      <nav className="mb-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold mb-4">Task Management System</h1>
          <p>Hallo, {name}</p>
        </div>
        <button
          type="button"
          onClick={() => logout()}
          className="flex gap-2 transition-all duration-200 active:scale-95 hover:opacity-80"
        >
          <img src={logoutIcon} />

          <p type="button" className="text-[#DC2626]">
            Keluar
          </p>
        </button>
      </nav>

      {taskIndexQuery.error && (
        <p className="text-red-500">{taskIndexQuery.error}</p>
      )}
      <div className="p-6 relative">
        <h1 className="text-2xl font-bold mb-4">Cari Data</h1>
        <div className="flex items-center space-x-4 mb-6">
          <input
            type="text"
            placeholder="Masukan data yang kamu cari"
            className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={handleOpenModal}
          >
            Tambah Data
          </button>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} />

      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">No</th>
            <th className="border px-4 py-2">Tasklist</th>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2">Deadline</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {taskIndexQuery.data?.data?.map((task, index) => (
            <tr key={task.id}>
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{task.title}</td>
              <td className="border px-4 py-2">{task.description}</td>
              <td className="border px-4 py-2">{task.deadline}</td>
              <td className="border px-4 py-2">{task.status}</td>
              <td className="border px-4 py-2">
                <ActionDropdown
                  onChangeStatus={(status) =>
                    handleUpdateTaskStatus(task.id, status)
                  }
                  onDelete={() => handleDeleteTask(task.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
