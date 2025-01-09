import { useState } from "react";
import PropTypes from "prop-types";
import TaskService from "../services/Task";
import { useAuth } from "../contexts/AuthContext";

const ActionDropdown = ({ onChangeStatus }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { token } = useAuth();

  const toggleDropdown = () => setIsOpen(!isOpen);

  const onDelete = async (id) => {
    try {
      await TaskService.taskDelete(token, id); // Hapus data berdasarkan ID
      // onClose(); // Tutup modal setelah penghapusan berhasil
      console.log("Data berhasil dihapus");
    } catch (error) {
      console.error("Error deleting data:", error);
      // Tambahkan logika error handling di sini jika diperlukan
    }
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="text-gray-500 hover:text-gray-700 focus:outline-none"
      >
        &#x2026; {/* Ikon tiga titik */}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
          <button
            onClick={() => {
              onChangeStatus("pending");
              setIsOpen(false);
            }}
            className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
          >
            Ubah ke Pending
          </button>
          <button
            onClick={() => {
              onChangeStatus("in-progress");
              setIsOpen(false);
            }}
            className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
          >
            Ubah ke in-progress
          </button>
          <button
            onClick={() => {
              onChangeStatus("completed");
              setIsOpen(false);
            }}
            className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
          >
            Ubah ke Completed
          </button>

          <div className="border-t"></div>
          <button
            onClick={() => {
              onChangeStatus("completed");
              setIsOpen(false);
            }}
            className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
          >
            Edit data
          </button>

          <div className="border-t"></div>
          <button
            onClick={() => {
              onDelete();
              setIsOpen(false);
            }}
            className="block w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-gray-100"
          >
            Hapus data
          </button>
        </div>
      )}
    </div>
  );
};

ActionDropdown.propTypes = {
  onChangeStatus: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ActionDropdown;
