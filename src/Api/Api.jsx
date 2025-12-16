import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import apiClient from "./ApiClient";

// get list of advance user
export const useGetUser = (page = 1, limit = 2, searchKey = '', userType = '', primaryPlatform = '', startDate = '', endDate = '', country, province) => {
    return useQuery({
        queryKey: ['users', page, limit, searchKey, userType, primaryPlatform, startDate, endDate, country, province],
        queryFn: async () => {
            const response = await apiClient.get('/super-admin/users/', {
                params: { page, limit, searchKey, user_type: userType, primary_platform: primaryPlatform, from_date: startDate, to_date: endDate, country_id: country, province_id: province },
            });
            return response.data;
        },
        staleTime: 15 * 60 * 1000,
        placeholderData: keepPreviousData,
    });
};
//  Get user by ID
export const useUserById = (userId) => {
    return useQuery({
        queryKey: ['user', userId],
        queryFn: async () => {
            const { data } = await apiClient.get(`/super-admin/users/${userId}`);
            return data;
        },
        staleTime: Infinity,
        enabled: !!userId,
    });
};
// update user status
export const useUpdateStatus = (onSuccess, onError) => {
    return useMutation({
        mutationFn: async ({ userId, body }) => {
            const response = await apiClient.patch(`/super-admin/users/status/${userId}`, body);
            return response.data;
        },
        onSuccess,
        onError,
    });
};
//  Delete user by ID
export const useDeleteUser = (onSuccess, onError) => {
    return useMutation({
        mutationFn: async (userId) => {
            const { data } = await apiClient.delete(`/auth/deleteUser/${userId}`);
            return data;
        },
        onSuccess,
        onError,
    });
};
//  Update user by ID
export const useUpdateUser = (onSuccess, onError) => {
    return useMutation({
        mutationFn: async ({ data }) => {
            const response = await apiClient.patch(`/super-admin/users`, data);
            return response.data;
        },
        onSuccess,
        onError,
    });
};


// get profile details
export const useGetProfile = () => {
    return useQuery({
        queryKey: ['profile'],
        queryFn: async () => {
            const { data } = await apiClient.get(`/super-admin`);
            return data;
        },
        staleTime: 15 * 60 * 1000,
        placeholderData: keepPreviousData,
    });
};
// update profile details
export const useUpdateProfile = (onSuccess, onError) => {
    return useMutation({
        mutationFn: async ({ profileId, data }) => {
            const response = await apiClient.patch(`/super-admin/update-admin-profile/${profileId}`, data);
            return response.data;
        },
        onSuccess,
        onError,
    });
};




// reset password 
export const useResetLink = (onSuccess, onError) => {
    return useMutation({
        mutationFn: async (email) => {
            const response = await apiClient.post('/v1/auth/forgot-password', email);
            return response.data;
        },
        onSuccess,
        onError,
    });
};
// login
export const useLogin = (onSuccess, onError) => {
    return useMutation({
        mutationFn: async (credentials) => {
            const response = await apiClient.post('/v1/auth/login', credentials);
            return response.data;
        },
        onSuccess: (data) => {
            if (data?.success === true) {
                onSuccess(data);
            } else {
                onError(data);
            }
        },
        onError,
    });
};
// Register admin
export const useCreateAdmin = (onSuccess, onError) => {
    return useMutation({
        mutationFn: async (data) => {
            const response = await apiClient.post('/super-admin/create-admin', data);
            return response.data;
        },
        onSuccess,
        onError,
    });
};


