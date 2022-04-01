import axios from "axios";


const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '997cf28c-7511-4fb0-92c4-c47f5b41d1a1'
    }
});

export const usersAPI = {
    getUsers(pageNumber = 1, pageSize = 10) {
        return instance.get(`users?page=${pageNumber}&count=${pageSize}`).then(response => {
            return response.data
        })
    },
    follow(usersId: number) {
        return instance.post(`follow/${usersId}`)
    },
    unfollow(usersId: number) {
        return instance.delete(`follow/${usersId}`)
    },
    getProfile(userId: string) {
        return instance.get(`profile/` + userId)
    }
}
export const authAPI = {
    me() {
        return instance.get(`auth/me`)
    }
}