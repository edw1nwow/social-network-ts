import {GetItemsType, instance, APIResponseType} from "./api";





export const usersAPI = {
    getUsers(pageNumber = 1, pageSize = 10) {
        return instance.get<GetItemsType>(`users?page=${pageNumber}&count=${pageSize}`).then(res => res.data)
    },
    follow(usersId: number) {
        return instance.post<APIResponseType>(`follow/${usersId}`).then(res=> res.data) as Promise<APIResponseType>
    },
    unfollow(usersId: number) {
        return instance.delete<APIResponseType>(`follow/${usersId}`).then(res=> res.data) as Promise<APIResponseType>
    }
}