import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';

export type ApiUser = {
	id: string;
	name: string;
	age: number;
	isStudent: boolean;
};

export const usersApi = createApi({
	reducerPath: 'usersApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
	endpoints: build => ({
		getUsers: build.query<ApiUser[], void>({
			query: () => '/users',
		}),
		getOneUser: build.query<ApiUser, string>({
			query: (id: string) => `/users/${id}`,
		}),
		addUser: build.mutation<ApiUser, ApiUser>({
			query: (userObj: ApiUser) => ({
				url: '/users',
				method: 'POST',
				body: userObj,
			}),
		}),
		updateUser: build.mutation<ApiUser, ApiUser>({
			query: (userObj: ApiUser) => ({
				url: `/users/${userObj.id}`,
				method: 'PUT',
				body: userObj,
			}),
		}),
		deleteUser: build.mutation<void, string>({
			query: (id: string) => ({
				url: `/users/${id}`,
				method: 'DELETE',
			}),
		}),
	}),
});

export const {
	useGetUsersQuery,
	useGetOneUserQuery,
	useAddUserMutation,
	useUpdateUserMutation,
	useDeleteUserMutation,
} = usersApi;
