const User = require('../models/User');
const Role = require('../models/Role');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const {secret} = require('../config');

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    };
    return jwt.sign(payload, secret, { expiresIn: '24h' });
};

class AuthController {
    async registration(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: 'Ошибка при регистрации', errors: errors.array() });
            }

            const {username, password} = req.body;

            // Проверка наличия пользователя с таким именем
            const candidate = await User.getUserByUsername(username);
            if (candidate) {
                return res.status(400).json({ message: 'Пользователь с таким именем уже существует' });
            }

            // Хэширование пароля
            const hashPassword = bcrypt.hashSync(password, 7);

            // Получение роли пользователя
            const userRole = await Role.getRoleByValue('ADMIN');

            // Создание нового пользователя
            await User.createUser(username, hashPassword, [userRole.value]);

            return res.json({ message: 'Пользователь успешно зарегистрирован' });
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Registration error' });
        }
    }
    async login(req, res) {
        try {
            const { username, password } = req.body;

            // Поиск пользователя по имени
            const user = await User.getUserByUsername(username);
            if (!user) {
                return res.status(400).json({ message: `Пользователь ${username} не найден` });
            }

            // Проверка пароля
            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) {
                return res.status(400).json({ message: `Введен неверный пароль` });
            }

            // Генерация JWT токена
            const token = generateAccessToken(user.id, user.roles);
            return res.json({ token });
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Login error' });
        }
    }

    async getUsers(req, res) {
        try {
            // Получение всех пользователей с использованием модели
            const users = await User.getAllUsers();
            res.json(users);
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Error fetching users' });
        }
    }

}

module.exports = new AuthController();






