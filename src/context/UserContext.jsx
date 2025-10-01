// src/context/UserContext.js

"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

// 1. Buat Context
const UserContext = createContext();

// 2. Buat Provider Component
export const UserProvider = ({ children }) => {
    // Ambil ID dari Local Storage saat inisialisasi
    const [userId, setUserId] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Efek untuk memuat state dari Local Storage saat pertama kali dimuat
    useEffect(() => {
        const storedId = localStorage.getItem('app_user_id');
        if (storedId) {
            setUserId(storedId);
            setIsLoggedIn(true);
        }
    }, []);

    // Fungsi untuk mensimulasikan login
    const login = (id) => {
        if (id) {
            localStorage.setItem('app_user_id', id);
            setUserId(id);
            setIsLoggedIn(true);
        }
    };

    // Fungsi untuk logout
    const logout = () => {
        localStorage.removeItem('app_user_id');
        setUserId(null);
        setIsLoggedIn(false);
    };

    return (
        <UserContext.Provider value={{ userId, isLoggedIn, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

// 3. Buat Custom Hook untuk menggunakan Context
export const useUser = () => useContext(UserContext);