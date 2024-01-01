export const mutations = `#graphql
    creatUser(firstName: String!, lastName: String, email: String!, password: String!): String!

    getUserToken(email: String!, password: String!): String!
`;