import api from "../src/axiosConfig";


export const getRooms = async () => {
    const response = await api.get('/chat/rooms/');
    return response.data;
};

export const getRoom = async (roomId) => {
    const response = await api.get(`/chat/rooms/${roomId}/`);
    return response.data;
};


export const createRoom = async (roomData) => {
    const response = await api.post('/chat/rooms/', roomData);
    return response.data;
}


export const updateRoom = async (roomId, roomData) => {
    const response = await api.put(`/chat/rooms/${roomId}/`, roomData);
    return response.data;
};


export const deleteRoom = async (roomId) => {
    await api.delete(`/chat/rooms/${roomId}`);
};



export const joinRoom = async (roomId) => {
    const response = await api.post(`/chat/rooms/${roomId}/join/`);
    return response.data;
};



export const leaveRoom = async (roomId) => {
    const reponse = await api.post(`/chat/rooms/${roomId}/leave/`);
    return reponse.data
}