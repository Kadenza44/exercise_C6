const btnSendMessage = document.querySelector('.btn_send_message')
const btnGetPosition = document.querySelector('.btn_get_position')
const btnOpenSocket = document.querySelector('.btn_open_socket')
const btnCloseSoccet = document.querySelector('.btn_close_socket')
const btnClearChat = document.querySelector('.btn_clear_chat')
const inputMessage = document.querySelector('.input_message')
const fieldChatMessage = document.querySelector('.field_chat_message')
const infoLog = document.querySelector('.info_log')

let socket
let statusSocket = false

// Функция для успешного получения геолокации
function successPosition(position){
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;
    const link = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`
    fieldChatMessage.insertAdjacentHTML('beforeend', `<div class="message_user"><p><span class="sendler">Геолокация:</span><a href=${link}>Карта</a></p></div>`)
    
}

// Функция для ошибки при получении геолокации
function errorPosition(){
    fieldChatMessage.insertAdjacentHTML('beforeend', `<div class="message_user"><p><span class="sendler">Геолокация:</span><span style="color: red;">недоступно</span></p></div>`)
}

// Открываем соединение
btnOpenSocket.addEventListener('click', ()=>{
    // Использовал другой сервер, так как wss://echo.websocket.org/ недоступен на данный момент
    socket = new WebSocket("wss://javascript.info/article/websocket/chat/ws")

    infoLog.innerHTML = `<p style="color: green;">Устанавливается соединение с сервером...</p>`
    socket.onopen = (open)=>{
        infoLog.innerHTML = `<p style="color: green;">Соединение установлено</p>`
        btnOpenSocket.style.display = 'none'
        btnCloseSoccet.style.display = 'block'   
        statusSocket = true
    }

    socket.onclose = ()=>{
        infoLog.innerHTML = `<p style="color: green;">Соединение закрыто</p>`
        btnOpenSocket.style.display = 'block'
        btnCloseSoccet.style.display = 'none'
        statusSocket = false
    }

    socket.onmessage = (message)=>{
        fieldChatMessage.insertAdjacentHTML('beforeend', `<div class="message_server"><p><span class="sendler">Сервер:</span>${message.data}</p></div>`)
    }

    socket.onerror = ()=>{
        infoLog.innerHTML = `<p style="color: red;">Ошибка</p>`
    }
})

// Отправка собщения
btnSendMessage.addEventListener('click', ()=>{
    const textMessage = inputMessage.value

    if(textMessage && statusSocket){
        fieldChatMessage.insertAdjacentHTML('beforeend', `<div class="message_user"><p><span class="sendler">Вы:</span>${textMessage}</p></div>`)
        inputMessage.value = ''
        socket.send(textMessage)
    }
})


// Закрываем соединение
btnCloseSoccet.addEventListener('click', ()=>{
    infoLog.innerHTML = `<p style="color: green;">Закрывается соединение с сервером...</p>`
    socket.close()
    socket = null
})


// Получаем данные геолокации
btnGetPosition.addEventListener('click', ()=>{
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(successPosition, errorPosition)
      } else {
        fieldChatMessage.insertAdjacentHTML('beforeend', `<div class="message_user"><p><span class="sendler">Геолокация:</span><span style="color: red;">Ошибка</span></p></div>`)
      }
})

// Очищаем чат
btnClearChat.addEventListener('click', ()=>{
    fieldChatMessage.innerHTML = ''
})