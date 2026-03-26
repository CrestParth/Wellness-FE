import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "./ApiClient";

// get list of user
export const useGetUser = (page = 1, limit = 2, searchKey = '', sortBy = '', sortOrder = '') => {
    return useQuery({
        queryKey: ['users', page, limit, searchKey, sortBy, sortOrder],
        queryFn: async () => {
            const response = await apiClient.get('/admin/users', {
                params: { page, limit, searchKey, sortBy, sortOrder },
            });
            return response.data;
        },
        staleTime: 15 * 60 * 1000,
        placeholderData: keepPreviousData,
    });
};
// update user 
export const useUpdateUser = (onSuccess, onError) => {
    return useMutation({
        mutationFn: async ({ id, body }) => {
            const response = await apiClient.put(`/admin/users/${id}`, body);
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
// get user by id 
export const useGetUserById = (id) => {
    return useQuery({
        queryKey: ['user', id],
        queryFn: async () => {
            const { data } = await apiClient.get(`/admin/users/${id}`);
            return data;
        },
        staleTime: Infinity,
        enabled: !!id,
    });
}



// get profile details
export const useGetProfile = () => {
    return useQuery({
        queryKey: ['profile'],
        queryFn: async () => {
            const { data } = await apiClient.get(`/admin/profile`);
            return data;
        },
        staleTime: 15 * 60 * 1000,
        placeholderData: keepPreviousData,
    });
};
// update profile details
export const useUpdateProfile = (onSuccess, onError) => {
    return useMutation({
        mutationFn: async (data) => {
            const response = await apiClient.patch(`/admin/profile`, data);
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
//  Update category by ID
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
export const useGetInstructors = (page, limit, isVerified = '', searchKey = '', sortBy = '', sortOrder = '') => {
    return useQuery({
        queryKey: ['instructors', page, limit, isVerified, searchKey, sortBy, sortOrder],
        queryFn: async () => {
            const { data } = await apiClient.get(`/admin/instructors`, { params: { page, limit, isVerified, searchKey, sortBy, sortOrder } });
            return data;
        },
        staleTime: 15 * 60 * 1000,
        placeholderData: keepPreviousData,
    });
};
// get all Pending Instructor
export const useGetPendingInstructors = () => {
    return useQuery({
        queryKey: ['Pendinginstructors'],
        queryFn: async () => {
            const { data } = await apiClient.get(`/admin/instructors/pending`);
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
            console.log(data)
            const response = await apiClient.patch(`/admin/instructors/${id}`, data);
            return response.data;
        },
        onSuccess,
        onError,
    });
};
// approve instructor
export const useApproveInstructor = (onSuccess, onError) => {
    return useMutation({
        mutationFn: async (PROFILE_ID) => {
            const response = await apiClient.post(`/admin/instructors/approve/${PROFILE_ID}`);
            return response.data;
        },
        onSuccess,
        onError,
    });
};
// reject instructor
export const useRejectInstructor = (onSuccess, onError) => {
    return useMutation({
        mutationFn: async (PROFILE_ID) => {
            const response = await apiClient.post(`/admin/instructors/reject/${PROFILE_ID}`);
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
export const useGetStudio = (page, limit, searchKey, sortBy, sortOrder) => {
    return useQuery({
        queryKey: ['studios', page, limit, searchKey, sortBy, sortOrder],
        queryFn: async () => {
            const { data } = await apiClient.get(`/admin/studios`, { params: { page, limit, searchKey, sortBy, sortOrder } });
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


// get all Vibe Checks
export const useGetVibes = (page, limit, startDate, endDate, searchKey, sortBy, sortOrder) => {
    return useQuery({
        queryKey: ['vibes', page, limit, startDate, endDate, searchKey, sortBy, sortOrder],
        queryFn: async () => {
            const { data } = await apiClient.get(`/admin/vibes`, { params: { page, limit, startDate, endDate, searchKey, sortBy, sortOrder } });
            return data;
        },
        staleTime: 15 * 60 * 1000,
        placeholderData: keepPreviousData,
    });
};
// get vibes by id 
export const useGetVibeById = (id) => {
    return useQuery({
        queryKey: ['vibe', id],
        queryFn: async () => {
            const { data } = await apiClient.get(`/admin/vibes/${id}`);
            return data;
        },
        staleTime: Infinity,
        enabled: !!id,
    });
};
//  Delete vibes by ID
export const useDeleteVibe = (onSuccess, onError) => {
    return useMutation({
        mutationFn: async (id) => {
            const { data } = await apiClient.delete(`/admin/vibes/${id}`);
            return data;
        },
        onSuccess,
        onError,
    });
};

// get all boosted instrucors
export const useGetBoostedInstructors = (page, limit, searchKey, sortBy, sortOrder) => {
    return useQuery({
        queryKey: ['BoostedInstructors', page, limit, searchKey, sortBy, sortOrder],
        queryFn: async () => {
            const { data } = await apiClient.get(`/admin/boosted-instructor`, { params: { page, limit, searchKey, sortBy, sortOrder } });
            return data;
        },
        staleTime: 15 * 60 * 1000,
        placeholderData: keepPreviousData,
    });
};


// get dashboard analytics
export const useGetDashboard = () => {
    return useQuery({
        queryKey: ['analytics'],
        queryFn: async () => {
            const { data } = await apiClient.get(`/admin/dashboard/analytics`);
            return data;
        },
        staleTime: 15 * 60 * 1000,
        placeholderData: keepPreviousData,
    });
};

// get all Subscription
export const useGetSubscription = (Search = '', Status = '', sortBy = '', sortOrder = '') => {
    return useQuery({
        queryKey: ['subscription', Search, Status, sortBy, sortOrder],
        queryFn: async () => {
            const { data } = await apiClient.get(`/admin/subscriptions`);
            // { params: { Search, Status, sortBy, sortOrder } }
            return data;
        },
        staleTime: 15 * 60 * 1000,
        placeholderData: keepPreviousData,
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
// verify otp
export const useVerifyOtp = (onSuccess, onError) => {
    return useMutation({
        mutationFn: async (otp) => {
            const response = await apiClient.post('/auth/verify-admin-otp', otp);
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
// Resend verify otp
export const useResendVerifyOtp = (onSuccess, onError) => {
    return useMutation({
        mutationFn: async (email) => {
            const response = await apiClient.post('/auth/resend-otp', { email });
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


