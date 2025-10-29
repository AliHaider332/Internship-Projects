const server = 'http://localhost:5000/';
export const createVector = async (data) => {
  try {
    const res = await fetch(`${server}api/create-vectors`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data }),
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Embedding failed');

    return result;
  } catch (error) {
    console.error('❌ PDF load error:', error);
    throw new Error(error.message);
  }
};

export const chatting = async (message) => {
  try {
    const res = await fetch(`${server}api/chatting`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Embedding failed');

    return result.answer;
  } catch (error) {
    console.error('❌ PDF load error:', error);
    throw new Error(error.message);
  }
};
