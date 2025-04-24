# GitHub Projects CRM

Система управління публічними проєктами GitHub з можливістю реєстрації/авторизації користувачів.

## Технічний стек

### Frontend
- React + TypeScript
- Vite
- Tailwind CSS + DaisyUI

### Backend
- NestJS + TypeScript
- PostgreSQL
- JWT Authentication

## Швидкий старт

### Вимоги
- Docker і Docker Compose

### Розробка

Запуск у режимі розробки:
```bash
npm run dev
```

Це запустить:
- Frontend на http://localhost:5173
- Backend API на http://localhost:5001
- PostgreSQL на порту 5432

### Продакшн середовище

Збірка та запуск проєкту:
```bash
npm run build
npm start
```

## API

### Авторизація
- POST /api/auth/register - Реєстрація
- POST /api/auth/login - Вхід

### GitHub проєкти
- GET /api/projects - Отримати проєкти
- POST /api/projects - Додати проєкт
- PUT /api/projects/:id - Оновити проєкт
- DELETE /api/projects/:id - Видалити проєкт
