import UserServices, { CreateUserPayload } from "../../services/user";

const queries = {}

const mutations = {
    creatUser: async (_:any, payload: CreateUserPayload) => {
        const res = await UserServices.createUser(payload);
        return res.id;
    },

    getUserToken: async (_:any, payload: { email: string, password: string }) => {
        const res = await UserServices.getUserToken(payload.email, payload.password);
        return res;
    }
};

export const resolvers = { queries, mutations }