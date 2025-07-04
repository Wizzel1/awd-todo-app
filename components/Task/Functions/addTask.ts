export default async function AddTask({ title }: { title: string }) {
  console.log(title);
  try {
    const response = await fetch(`/api/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
  } catch (error) {
    console.log("ERROR !!");
  }
}
