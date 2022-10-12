import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { IRepo, IUser, ServerResponse } from '../../models/models'

export const githubApi = createApi({
    reducerPath: 'github/api', //по какому адресу будут храниться все кэшированные данные связанные с апишкой
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.github.com/'
    }),
    refetchOnFocus: true,
    endpoints: build => ({
        //это ф-я которая принимает билд и вернет обьект в которым перечислим все эндпоинты
        searchUsers: build.query<IUser[], string>({ //типизация для понимания какие данные прилетают. Указал 2 дженерика. 1: что получаем в ответ от сервера. 2: Какой параметр хотим принимать чтобы осуществить данный запрос.
            query: (search: string) => ({ //строку хотим получить в квери
                url: `search/users`,
                params: {
                    q: search,//укажем серч как параметр запроса
                    per_page: 10
                }
            }), //будет конкатинироваться с baseUrl
            transformResponse: (response: ServerResponse<IUser>) => response.items //как транфсормировать ответ сервера
        }),
        getUserRepos: build.query<IRepo[], string>({
            query: (username: string) => ({
                url: `users/${username}/repos`
            })
        })
    })
})

export const {useSearchUsersQuery, useLazyGetUserReposQuery} = githubApi //кастомный специальный хук для испоьзования в компонентах