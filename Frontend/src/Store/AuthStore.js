import React from 'react';
import { create } from 'zustand';
import axios from 'axios';

axios.defaults.withCredentials = true;

const API_URL = "http://localhost:9000/api/auth";

export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,

    signup: async (name, email, password) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/signup`, { email, password, name });
            set({ isLoading: false, user: response.data.user, isAuthenticated: true });
        } catch (error) {
            set({ error: error.response?.data?.message || "Error Signing Up", isLoading: false });
            throw error;
        }
    },

    login: async (email,password) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/login`,{email,password});
            set({ isAuthenticated: true, user: response.data.user,error:null, isLoading: false});
        } catch (error) {
            set({ error: error.response?.data?.message || "Error Logging In", isLoading: false});
            throw error;
        }
    },

    verifyEmail: async (code) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/verifyemail`, { code });
            set({ isLoading: false, user: response.data.user, isAuthenticated: true });
            return response.data;
        } catch (error) {
            set({ error: error.response?.data?.message || "Error Verifying Email", isLoading: false });
            throw error;
        }
    },

    checkAuth: async () => {
        set( {isCheckingAuth:true, error:null });
        try {
            const response = await axios.get(`${API_URL}/check-auth`);
            set({ isCheckingAuth: false, user: response.data.user, isAuthenticated: true });

        } catch (error) {
            set({error:null , isCheckingAuth:false , isAuthenticated:false});
            
        }
    }
}));
