export async function verifyInternship(
  input: { file: File | null; text: string | null },
  targetJob: string | null
) {
  const formData = new FormData();
  if (input.file) {
    formData.append("file", input.file);
  }
  if (input.text) {
    formData.append("text", input.text);
  }
  if (targetJob) formData.append("target_job", targetJob);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";


  try {
    const response = await fetch(`${API_URL}/analyze`, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw new Error("Failed to connect to the analysis service. Please try again later.");
  }
}
