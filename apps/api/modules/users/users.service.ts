import prisma from "../../utils/prisma";
import { hashPassword } from "../../utils/hash";
import { CreateUserInput, ReadUserInput } from "./users.schema";

class UsersServices {
    async createUser(input: CreateUserInput) {
        const { password, ...remaining } = input;
        const { hash, salt } = hashPassword(password);

        const user = await prisma.users.create({
            data: {
                ...remaining, salt, password: hash
            }
        });

        return user;
    }

    async readUser(input: ReadUserInput) {
        const { user_id: userId } = input;
        const user = await prisma.users.findUnique({
            where: {
                user_id: userId
            }
        });

        return user;
    }

    async findUserByEmail(email: string) {
        const user = await prisma.users.findUnique({
            where: {
                email,
            }
        });

        return user;
    }

    async findUsers() {
        return prisma.users.findMany({
            select: {
                email: true,
                first_name: true,
                last_name: true,
                user_id: true,
                create_time: true,
                last_update_time: true
            }
        });
    }
}

export default new UsersServices();