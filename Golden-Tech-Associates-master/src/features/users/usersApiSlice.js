import {
    createSelector,
    createEntityAdapter
} from '@reduxjs/toolkit';

import { apiSlice } from '../../app/api/apiSlice';

const userAdapter = createEntityAdapter({})

const initialState = userAdapter.getInitialState()

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => '/users',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedUsers = responseData.map(user => {
                    user.id = user._id
                    return user
                });
                return userAdapter.setAll(initialState,loadedUsers)
            },
            providesTags: (result, error, arg) => {
                if(result?.ids){
                    return [
                        {type:'User', id: 'LIST'},
                        ...result.ids.map(id => ({type:'User',id}))
                    ]
                }else return [ {type:'User', id: 'LIST'}]
            }
        }),
        addNewUser: builder.mutation({
            query: initialUserData => ({
                url: '/users',
                method: 'POST',
                body: {
                    ...initialUserData,
                },
            
            }),
            invalidatesTags: [
                { type: 'User', id: "LIST" }
            ]
        }),
        updateUser: builder.mutation({
            query: initialUserData => ({
                url: '/users',
                method: 'PATCH',
                body: {
                    ...initialUserData,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'User', id: arg.id }
            ]
        }),
        deleteUser: builder.mutation({
            query: ({ id }) => ({
                url: `/users`,
                method: 'DELETE',
                body: { id }
            }),

    }),
    registerFace: builder.mutation({
        query: (data) => ({
          url: '/users/face/register',
          method: 'POST',
          body: data
        })
      }),
      compareFaces: builder.mutation({
        query: (data) => ({
          url: '/users/face-login',
          method: 'POST',
          body: data
        })
      }),
    invalidatesTags: (result, error, arg) => [
        { type: 'User', id: arg.id }
    ]
}),
})

export const {
    useGetUsersQuery,
    useAddNewUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
    useRegisterFaceMutation,
    useCompareFacesMutation

} = usersApiSlice

// returns the query result object

export const selectUsersResult = usersApiSlice.endpoints.getUsers.select()

// creates memoized selector

const selectUsersData = createSelector(
    selectUsersResult,
    usersResult => usersResult.data //normalized state object with ids & entities

)

//getSelectors creates these selectors and we rename them with aliases using destructuring

export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUserIds
        // Pass in a selector that returns the users slice of state

} = userAdapter.getSelectors(state => selectUsersData(state) ?? initialState)