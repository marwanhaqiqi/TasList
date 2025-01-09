<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    // Fungsi untuk menampilkan daftar tugas (Read)
    public function index()
    {
        $tasks = Task::with('user')->get(); // Mengambil semua tugas beserta pengguna yang terkait
        return response()->json($tasks); // Mengembalikan data dalam format JSON
    }

    // Fungsi untuk membuat tugas baru (Create)
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'deadline' => 'nullable|date',
            'status' => 'nullable|string|in:pending,in-progress,completed',
        ]);

        // Membuat tugas baru
        $task = Task::create($validated);

        return response()->json($task, 201); // Mengembalikan tugas yang baru dibuat
    }

    // Fungsi untuk menampilkan satu tugas berdasarkan ID (Read)
    public function show($id)
    {
        $task = Task::with('user')->find($id);

        if (!$task) {
            return response()->json(['message' => 'Task not found'], 404); // Jika tidak ditemukan
        }

        return response()->json($task); // Mengembalikan tugas
    }

    // Fungsi untuk memperbarui tugas (Update)
    public function update(Request $request, $id)
    {
        $task = Task::find($id);

        if (!$task) {
            return response()->json(['message' => 'Task not found'], 404); // Jika tidak ditemukan
        }

        // Validasi input
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id', // Pastikan user_id valid
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'deadline' => 'nullable|date',
            'status' => 'nullable|string|in:pending,in_progress,completed',
        ]);

        // Update tugas dengan data baru
        $task->update($validated);

        return response()->json($task); // Mengembalikan tugas yang sudah diperbarui
    }

    // Fungsi untuk menghapus tugas (Delete)
    public function destroy($id)
    {
        $task = Task::find($id);

        if (!$task) {
            return response()->json(['message' => 'Task not found'], 404); // Jika tidak ditemukan
        }

        // Menghapus tugas
        $task->delete();

        return response()->json(['message' => 'Task deleted successfully']); // Mengembalikan pesan sukses
    }
}
