import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const url = "http://localhost:8000/api";

const taskIndex = (token) =>
  useQuery({
    queryKey: ["taskIndex"],
    queryFn: async () => {
      const response = await axios.get(`${url}/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response;
    },
  });

const taskStore = (token) =>
  useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(`${url}/tasks`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return response;
    },
  });

const taskDelete = (token) =>
  useMutation({
    mutationFn: async (id) => {
      const response = await axios.delete(`${url}/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    },
  });

const TaskService = {
  taskIndex,
  taskStore,
  taskDelete,
};

export default TaskService;
