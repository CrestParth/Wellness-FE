import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "./ApiClient";

// get list of user
export const useGetUser = (page = 1, limit = 2) => {
    return useQuery({
        queryKey: ['users', page, limit],
        queryFn: async () => {
            const response = await apiClient.get('/admin/users', {
                params: { page, limit },
            });
            return response.data;
        },
        staleTime: 15 * 60 * 1000,
        placeholderData: keepPreviousData,
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
            const { data } = await apiClient.delete(`/admin/users/${userId}`);
            return data;
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


// Create Category
export const useCreateCategory = (onSuccess, onError) => {
    return useMutation({
        mutationFn: async (data) => {
            const response = await apiClient.post('/admin/categories', data);
            return response.data;
        },
        onSuccess,
        onError,
    });
};
// get all categories
export const useGetCategories = (page, limit) => {
    return useQuery({
        queryKey: ['categories', page, limit],
        queryFn: async () => {
            const { data } = await apiClient.get(`/admin/categories`, { params: { page, limit } });
            return data;
        },
        staleTime: 15 * 60 * 1000,
        placeholderData: keepPreviousData,
    });
};
// get category by id 
export const useGetCategoryById = (id) => {
    return useQuery({
        queryKey: ['category', id],
        queryFn: async () => {
            const { data } = await apiClient.get(`/admin/categories/${id}`);
            return data;
        },
        staleTime: Infinity,
        enabled: !!id,
    });
};
//  Delete categories by ID
export const useDeleteCategory = (onSuccess, onError) => {
    return useMutation({
        mutationFn: async (userId) => {
            const { data } = await apiClient.delete(`/admin/categories/${userId}`);
            return data;
        },
        onSuccess,
        onError,
    });
};
//  Update user by ID
export const useUpdateCategory = (onSuccess, onError) => {
    return useMutation({
        mutationFn: async ({ id, data }) => {
            const response = await apiClient.patch(`/admin/categories/${id}`, data);
            return response.data;
        },
        onSuccess,
        onError,
    });
};


// Create Instructor
export const useCreateInstructor = (onSuccess, onError) => {
    return useMutation({
        mutationFn: async (data) => {
            const response = await apiClient.post('/admin/instructors', data);
            return response.data;
        },
        onSuccess,
        onError,
    });
};
// get all Instructor
export const useGetInstructors = (page, limit) => {
    return useQuery({
        queryKey: ['instructors', page, limit],
        queryFn: async () => {
            const { data } = await apiClient.get(`/admin/instructors`, { params: { page, limit } });
            return data;
        },
        staleTime: 15 * 60 * 1000,
        placeholderData: keepPreviousData,
    });
};
// get Instructor by id 
export const useGetInstructorById = (id) => {
    return useQuery({
        queryKey: ['instructor', id],
        queryFn: async () => {
            const { data } = await apiClient.get(`/admin/instructors/${id}`);
            return data;
        },
        staleTime: Infinity,
        enabled: !!id,
    });
};
//  Delete Instructor by ID
export const useDeleteInstructor = (onSuccess, onError) => {
    return useMutation({
        mutationFn: async (userId) => {
            const { data } = await apiClient.delete(`/admin/instructors/${userId}`);
            return data;
        },
        onSuccess,
        onError,
    });
};
//  Update Instructor by ID
export const useUpdateInstructor = (onSuccess, onError) => {
    return useMutation({
        mutationFn: async ({ id, data }) => {
            const response = await apiClient.patch(`/admin/instructors/${id}`, data);
            return response.data;
        },
        onSuccess,
        onError,
    });
};


// Create Studio
export const useCreateStudio = (onSuccess, onError) => {
    return useMutation({
        mutationFn: async (data) => {
            const response = await apiClient.post('/admin/studios', data);
            return response.data;
        },
        onSuccess,
        onError,
    });
};
// get all Studios
export const useGetStudio = (page, limit) => {
    return useQuery({
        queryKey: ['studios', page, limit],
        queryFn: async () => {
            const { data } = await apiClient.get(`/admin/studios`, { params: { page, limit } });
            return data;
        },
        staleTime: 15 * 60 * 1000,
        placeholderData: keepPreviousData,
    });
};
// get Studio by id 
export const useGetStudioById = (id) => {
    return useQuery({
        queryKey: ['studio', id],
        queryFn: async () => {
            const { data } = await apiClient.get(`/admin/studios/${id}`);
            return data;
        },
        staleTime: Infinity,
        enabled: !!id,
    });
};
//  Delete Studio by ID
export const useDeleteStudio = (onSuccess, onError) => {
    return useMutation({
        mutationFn: async (id) => {
            const { data } = await apiClient.delete(`/admin/studios/${id}`);
            return data;
        },
        onSuccess,
        onError,
    });
};
//  Update Studio by ID
export const useUpdateStudio = (onSuccess, onError) => {
    return useMutation({
        mutationFn: async ({ id, data }) => {
            const response = await apiClient.patch(`/admin/studios/${id}`, data);
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
            const response = await apiClient.post('/auth/login', credentials);
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


