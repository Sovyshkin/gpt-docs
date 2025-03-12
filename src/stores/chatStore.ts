import { ref, computed, watch } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import { useRouter } from 'vue-router';

export const useChatStore = defineStore('chatStore', () => {

    const router = useRouter();
    const token = ref(localStorage.getItem('token'));
    const chats = ref([]);
    const selectedChat = ref(1)
    const messages = ref([])
    const message = ref('')
    const isLoadingSend = ref(false)
    const empty = ref(true)
    const selectedFile = ref({name: "file", size: 0})

    // Обработчик выбора файла
    const handleFileChange = (event) => {
    const file = event.target.files[0]; // Получаем первый выбранный файл

    if (file) {
        // Проверяем, что файл не является изображением
        if (file.type.startsWith("image/")) {
        alert("Пожалуйста, выберите файл, который не является изображением.");
        return;
        }

        // Сохраняем файл
        selectedFile.value = file;
    }
    };

    // Очистка выбранного файла
    const clearFile = () => {
    selectedFile.value = {name: "file", size: 0};
    };
    // Отправка сообщения
    const sendMessage = async (file) => {
        try {
            let response = await axios.post(`/messages/create`, {
                    chat_id: selectedChat.value,
                    content: message.value,
                    role: 'user',
                    file: file
               }, {
                   headers: {
                       Authorization: `Bearer ${token.value}`,
                   },
               });
                console.log(response);
                if (response.status == 200) {
                    getMessages()
                    message.value = ''
                }
        } catch (err) {
            console.log(err);
            
        }
    }
    
    // Добавление сообщения
    const addMessage = async () => {
        try {
            isLoadingSend.value = true
            if (selectedFile.value.size == 0) {
                await sendMessage(0)
            } else {
                const formData = new FormData();
                formData.append("file", selectedFile.value);
                console.log(formData);
                let response = await axios.post(
                    "/files/create",
                    formData,
                    {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token.value}`,
                    },
                    }
                );
                console.log(response)
                let file_id = response.data.file_id
                if (file_id) {
                    sendMessage(file_id)
                }
            }
        } catch (err) {
            console.error('Ошибка при создании чата:', err);
        } finally {
            isLoadingSend.value = false
        }
    }

    // Создание нового чата
    const addChat = async () => {
        try {
            let response = await axios.post(`/chats/create`, {}, {
                headers: {
                    Authorization: `Bearer ${token.value}`,
                },
            });
            console.log(response);
            getChats()
        } catch (err) {
            console.error('Ошибка при создании чата:', err);
        }
    };

    // Получение конкретного чата по ID
    const getMessages = async () => {
        try {
            if (token.value) {
                let response = await axios.get(`/messages/get_chat_messages?chat_id=${selectedChat.value}`, {
                    headers: {
                        Authorization: `Bearer ${token.value}`,
                    },
                });
                console.log(response);
                messages.value = response.data.messages
                if (messages.value.length > 0) {
                    empty.value = false
                    messages.value = messages.value.reverse()
                } else {
                    empty.value = true
                }
            }
        } catch (err) {
            console.error('Ошибка при загрузке чата:', err);
        }
    };

    // Форматирование даты
    const formatDate = (dateString) => {
    let date = new Date(dateString);
    let options = { 
        day: 'numeric',
        month: 'long',
        locale: 'en-US' // Изменяем локаль с ru-RU на en-US
    };
    return date.toLocaleDateString('en-US', options);
};

    // Группировка чатов по датам
    const groupedChats = () => {
        const groups = {}
        chats.value.forEach(chat => {
            chat.more = false
            const date = formatDate(chat.created)
            if (!groups[date]) {
                groups[date] = []
            }
            groups[date].push(chat)
        })
        chats.value = groups
    };

    // Получение всех чатов
    const getChats = async () => {
        try {
            if (token.value) {
                let response = await axios.get(`/chats/get_chats`, {
                    headers: {
                        Authorization: `Bearer ${token.value}`,
                    },
                });
                chats.value = response.data.chats;
                groupedChats()
            }
        } catch (err) {
            console.error('Ошибка при загрузке чатов:', err);
        }
    };

    watch(selectedChat, () => {
        Object.values(chats.value).forEach(chatList => {
    chatList.forEach(item => {
      item.more = false;
    });
  });
        getMessages()
    })

    const deleteChat = async () => {
        try {
            if (selectedChat.value) {
                let response = await axios.post(`/chats/remove`, {
                    id: selectedChat.value
                }, {
                    headers: {
                        Authorization: `Bearer ${token.value}`,
                    },
                })
                console.log(response)
                if (response.status == 200) {
                    getChats()
                }
            }
        } catch (err) {
            console.log(err);
            
        }
    }

    return {selectedFile, empty, isLoadingSend, chats, selectedChat, message, messages, addMessage, addChat, getMessages, getChats, handleFileChange, clearFile, deleteChat };
});