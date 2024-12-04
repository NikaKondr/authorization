# Авторизация/Регистрация/Восстановление пароля

### [**DEMO**](https://nikakondr.github.io/authorization/)

Стандартное окно для входа на сервер.

Дизайн взят с [ragemp.pro](https://ragemp.pro/resources/makety-dizajna-hud-avtorizacija-registracija-zabyl-parol-dlja-servera-rage-mp.319/)

Автор дизайна: **[trasher](https://ragemp.pro/members/trasher.8595/)** *(спасибо большое)*

Разработка: discord: **peach#5569**
  

### `npm i` 

Перед запуском проекта вам нужно установить модули. 

### `npm start`  

После установки модулей запустите проект.

### `npm run build`  

Для того чтобы сбилдить проект.

# Ивенты

## Сервер -> Клиент

### Отобразить интерфейс
``('app', {type: 'setComponent', data: 'logIn'})``

### Вызов нотифи
``('logIn', {type: 'setNotify', data: {type: 'access', text: 'Все верно!'} })``

type: **'access'** - Уведомление зеленого цвета.

type: **'error'** - Уведомление красного цвета.

### Отправка сохранненых данных пользователя для входа
``('logIn', {type: 'setRememberAccount', data: {login: 'Funtik_22', password: 'Happy_Hacking'} })``

## Клиент-> Сервер 

### Авторизация
``('logIn', 'authorization', {"login":"Funtik_22","password":"Funtik_22","remember":true})``

### Регистрация
``('logIn', 'registration', {"email":"","login":"","password":"","promocode":""})``

### Восстановление пароля
``('logIn', 'recovery', {"email":"", "login":""})``


![Авторизация](https://cdn.discordapp.com/attachments/870735155176800307/942384560749027358/unknown.png)

![Регистрация](https://cdn.discordapp.com/attachments/870735155176800307/942384605749714954/unknown.png)

![Восстановление аккаунта](https://cdn.discordapp.com/attachments/870735155176800307/942384582282596383/unknown.png)
