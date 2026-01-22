export const STYLES_EXAMPLES = {
    rtkQuery: `export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
    endpoints: (builder) => ({
        getUser: builder.query<IUser, string>({
            query: (id) => \`user/\${id}\`,
        }),
    }),
});`
};
