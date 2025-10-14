const server = import.meta.env.VITE_SERVER_URL;

export const DATA_FETCH = async (data) => {
  try {
    // Create FormData
    const formDataToSend = new FormData();

    // Append non-file fields (convert objects/arrays to JSON)
    formDataToSend.append('name', data.name);
    formDataToSend.append('email', data.email);
    formDataToSend.append('phone', data.phone);
    formDataToSend.append('summary', data.summary);
    formDataToSend.append('skills', JSON.stringify(data.skills));
    formDataToSend.append('education', JSON.stringify(data.education));
    formDataToSend.append('experience', JSON.stringify(data.experience));
    formDataToSend.append('projects', JSON.stringify(data.projects));

    // Append file (if exists)
    if (data.profileImageFile) {
      formDataToSend.append('profileImage', data.profileImageFile);
    }

    // Send to backend
    const res = await fetch(`${server}/datacollector`, {
      method: 'POST',
      body: formDataToSend, // no need to set headers for FormData
    });

    if (!res.ok) {
      throw new Error(`Server responded with ${res.status}`);
    }

    const result = await res.json();
    console.log('Server Response:', result);

    alert('Data submitted successfully!');
    return result;
  } catch (error) {
    console.error('Error submitting form:', error);
    alert('Error submitting form. Check console for details.');
  }
};
