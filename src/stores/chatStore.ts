import { ref, computed, watch, onUnmounted } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useMessageStore } from './messageStore.ts';

export const useChatStore = defineStore('chatStore', () => {
    const messageStore = useMessageStore();
    const router = useRouter();
    const token = localStorage.getItem('token');
    const chats = ref([]);
    const selectedChat = ref();
    const messages = ref([]);
    const message = ref('');
    const isLoadingSend = ref(false);
    const isLoading = ref(true)
    const chatLoader = ref(true)
    const empty = ref(false);
    const selectedFile = ref({ name: "file", size: 0 });
    const pingInterval = ref(null);
    let socket = null;

    const initWebSocket = () => {
        if (!selectedChat.value || !token) {
            console.error('Cannot connect: missing chat ID or token');
            return;
        }
    
        if (socket) {
            socket.close();
        }
    
        const wsUrl = `ws://38.180.137.72:9000/v1/web_sockets/chat/${selectedChat.value}?token=${token}`;
        console.log('Connecting to WebSocket:', wsUrl);
        socket = new WebSocket(wsUrl);
        console.log(socket);
    
        socket.onopen = () => {
            console.log('WebSocket connected');
            requestChatHistory();
        };
    
        socket.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                console.log('получено',data);
                chatLoader.value = true
                
                if (data.messages) {
                    messages.value = data.messages.reverse() || []
                    if (messages.value.length > 0) {
                        empty.value = false
                    } else {
                        empty.value = true
                    }
                    console.log("Messages updated:", messages.value);
                    isLoading.value = false
                    chatLoader.value = false
                }
                switch (data.action) {
                    case 'new_message':
                        chatLoader.value = true
                        messages.value.push(data);
                        break;
                    case 'delete_message':
                        messages.value = messages.value.filter(msg => msg.id !== data.message_id);
                        break;
                    case 'update_message':
                        messages.value = messages.value.map(msg =>
                            msg.id === data.message.id ? data.message : msg
                        );
                        break;
                    case 'history_loaded':
                        messages.value = [...data.messages];
                        break;
                    case 'chat_messages':
                        isLoading.value = true
                        if (data.chat_id === selectedChat.value) {
                            // Создаем новый массив для триггера реактивности
                            const newMessages = Array.isArray(data.messages) 
                                ? [...data.messages] 
                                : [];
                            
                            // Обновляем messages, сохраняя порядок (новые внизу)
                            messages.value = newMessages.reverse();
                            if (messages.value.length > 0) {
                                empty.value = false
                            } else {
                                empty.value = true
                            }
                            console.log("Messages updated:", messages.value);
                        }
                        isLoading.value = false
                        break;
                    case 'error':
                        messageStore.message = data.details;
                        setTimeout(() => {
                            messageStore.message = '';
                        }, 5000);
                        break;
                }
            } catch (e) {
                console.error('Error parsing WebSocket message:', e);
            }
        };
    
        socket.onclose = (event) => {
            console.log(event);
            console.log(`WebSocket closed. Code: ${event.code}, Reason: ${event.reason}`);
        };
    
        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
            messageStore.message = 'Ошибка подключения к чату';
            setTimeout(() => {
                messageStore.message = '';
            }, 5000);
        };
    };

    const requestChatHistory = () => {
        if (socket?.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({
                action: 'get_chat_message',
                chat_id: selectedChat.value
            }));

        }
    };

    // Обработчик выбора файла
    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            if (file.type.startsWith("image/")) {
                alert("Пожалуйста, выберите файл, который не является изображением.");
                return;
            }
            selectedFile.value = file;
        }
    };

    // Очистка выбранного файла
    const clearFile = () => {
        selectedFile.value = { name: "file", size: 0 };
    };

    // Отправка сообщения через WebSocket
    // const sendMessage = async (file_id) => {
    //     try {
    //         const messageData = {
    //             chat_id: selectedChat.value,
    //             content: message.value,
    //             role: 'user',
    //             file_id: file_id
    //         };

    //         if (socket && socket.readyState === WebSocket.OPEN) {
    //             socket.send(JSON.stringify(messageData));
    //         } else {
    //             console.error('WebSocket is not open');
    //         }

    //         message.value = '';
    //     } catch (err) {
    //         console.log(err);
    //         messageStore.message = err.response.data.detail;
    //         setTimeout(() => {
    //             messageStore.message = '';
    //         }, 5000);
    //     }
    // };
    const sendMessage = async (file_id) => {
    try {
        const messageData = {
            action: 'send_message',
            chat_id: selectedChat.value,
            content: message.value,
            role: 'user',
            file_id: file_id || null
        };
        
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify(messageData));
        } else {
            console.error('WebSocket is not open');
        }
        message.value = '';
    } catch (err) {
        console.log(err);
        messageStore.message = err.response.data.detail;
        setTimeout(() => {
        messageStore.message = '';
        }, 5000);
    }
        };
    const deleteMessage = async (messageId) => {
        try {
            const messageData = {
            action: 'delete_message',
            chat_id: selectedChat.value,
            message_id: messageId
            };
            
            if (socket?.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify(messageData));
            }
        } catch (err) {
            console.error('Error deleting message:', err);
            messageStore.message = err.response.data.detail;
            setTimeout(() => {
            messageStore.message = '';
            }, 5000);
        }
    };

    const updateMessage = async (messageId, newContent) => {
        try {
            const messageData = {
            action: 'update_message',
            chat_id: selectedChat.value,
            message_id: messageId,
            content: newContent
            };
            
            if (socket?.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify(messageData));
            }
        } catch (err) {
            console.error('Error updating message:', err);
            messageStore.message = err.response.data.detail;
            setTimeout(() => {
            messageStore.message = '';
            }, 5000);
        }
    };

    // Добавление сообщения
    const addMessage = async () => {
        try {
            isLoadingSend.value = true;
            if (selectedFile.value.size == 0) {
                await sendMessage(0);
            } else {
                const formData = new FormData();
                formData.append("file", selectedFile.value);
                let response = await axios.post(
                    "/files/create",
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                let file_id = response.data.file_id;
                if (file_id) {
                    sendMessage(file_id);
                }
            }
        } catch (err) {
            console.error('Ошибка при создании чата:', err);
            messageStore.message = err.response.data.detail;
            setTimeout(() => {
                messageStore.message = '';
            }, 5000);
        } finally {
            isLoadingSend.value = false;
        }
    };

    // Создание нового чата
    const addChat = async () => {
        try {
            let response = await axios.post(`/chats/create`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response);
            getChats();
        } catch (err) {
            console.error('Ошибка при создании чата:', err);
            messageStore.message = err.response.data.detail;
            setTimeout(() => {
                messageStore.message = '';
            }, 5000);
        }
    };

    // Получение конкретного чата по ID
    const getMessages = async () => {
        try {
            if (token && selectedChat.value) {
                let response = await axios.get(`/messages/get_chat_messages?chat_id=${selectedChat.value}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(response);
                messages.value = response.data.messages;
                if (messages.value.length > 0) {
                    empty.value = false;
                    messages.value = messages.value.reverse();
                } else {
                    empty.value = true;
                }
            }
        } catch (err) {
            console.error('Ошибка при загрузке чата:', err);
            if (err.response) {
                messageStore.message = err.response.data.detail;
                setTimeout(() => {
                    messageStore.message = '';
                }, 5000);
            }
        }
    };

    // Форматирование даты
    const formatDate = (dateString) => {
        let date = new Date(dateString);
        let options = { 
            day: 'numeric',
            month: 'long',
            locale: 'en-US'
        };
        return date.toLocaleDateString('en-US', options);
    };

    // Группировка чатов по датам
    const groupedChats = () => {
        const groups = {};
        chats.value.forEach(chat => {
            chat.more = false;
            const date = formatDate(chat.created);
            if (!groups[date]) {
                groups[date] = [];
            }
            groups[date].push(chat);
        });
        chats.value = groups;
    };

    // Получение всех чатов
    const getChats = async () => {
        try {
            if (token) {
                let response = await axios.get(`/chats/get_chats`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                chats.value = response.data.chats;
                selectedChat.value = chats.value[0].id;
                console.log('id CHAT', selectedChat.value);
                groupedChats();
            }
        } catch (err) {
            console.error('Ошибка при загрузке чатов:', err);
            messageStore.message = err.response.data.detail;
            setTimeout(() => {
                messageStore.message = '';
            }, 5000);
        }
    };

    watch(selectedChat, () => {
        Object.values(chats.value).forEach(chatList => {
            chatList.forEach(item => {
                item.more = false;
            });
        });
        // getMessages();
        initWebSocket();
    });

    const deleteChat = async () => {
        try {
            if (selectedChat.value) {
                let response = await axios.post(`/chats/remove`, {
                    id: selectedChat.value
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(response);
                if (response.status == 200) {
                    getChats();
                }
            }
        } catch (err) {
            console.log(err);
            messageStore.message = err.response.data.detail;
            setTimeout(() => {
                messageStore.message = '';
            }, 5000);
        }
    };

    // Закрытие WebSocket при уничтожении компонента
    onUnmounted(() => {
        if (socket) {
            console.log('close ws')
            socket.close();
        }
    });

    return { chatLoader, updateMessage, deleteMessage, selectedFile, empty, isLoadingSend, isLoading, chats, selectedChat, message, messages, addMessage, addChat, getMessages, getChats, handleFileChange, clearFile, deleteChat };
});