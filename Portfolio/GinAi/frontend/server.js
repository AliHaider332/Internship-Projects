// const server = 'http://localhost:3000';
const server = import.meta.env.VITE_SERVER;
export const chatting = async (chatMessage) => {
  try {
    const res = await fetch(`${server}/api/chatting`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify({
        message: chatMessage,
      }),
    });

    // Parse response
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Chatting API Error:', error);
    return error;
  }
};
