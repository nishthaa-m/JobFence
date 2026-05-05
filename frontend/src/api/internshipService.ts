export async function verifyInternship(file: File, targetJob: string | null) {
  const formData = new FormData();
  formData.append("file", file);
  if (targetJob) formData.append("target_job", targetJob);

  const API_URL = import.meta.env.VITE_API_URL;

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
