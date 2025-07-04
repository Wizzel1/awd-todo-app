export async function deleteTask(taskId: string) {
  const response = await fetch(`/api/tasks/${taskId}`, { method: "DELETE" });

  if (!response.ok) {
    console.error(response.status);
    return;
  }
}
