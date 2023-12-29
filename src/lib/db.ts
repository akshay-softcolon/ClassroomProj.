import { PrismaClient } from '@prisma/client';
export const prismaClient = new PrismaClient();

// async function getUsers() {
//     const users = await prisma.user.findMany();
//     return users;
// }

// async function createUser(firstName: string, lastName: string, email: string) {
//     const user = await prisma.user.create({
//         data: {
//             fistName: firstName,
//             lastName: lastName,
//             email,
//             password
//         }
//     });
//     return user;
// }

// export { getUsers, createUser };
