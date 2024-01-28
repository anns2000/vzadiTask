import { Session } from "@prisma/client";
import prisma from "../../common/prisma/client";
import { Service } from 'typedi';

@Service()
export default class SessionService {

    public async createSession(userId: number, token: string, identifier: string, source: string) {

        const session = await prisma.session.create({
            data: {
                userId: userId,
                identifier: identifier,
                source: source,
                token: token
            }
        });

        return session;
    }


    public async findUserOldSession(userId: number, identifier: string, source: string) {
        const oldSession = await prisma.session.findFirst({
            where: {
                AND: {
                    userId: userId,
                    OR: [
                        { identifier: identifier },
                        { source: source }
                    ]
                }
            },
            take: 1
        });
        return oldSession;
    }

    public async updateSession(sessionId: number, data: Partial<Session>) {
        const res = await prisma.session.update({ data, where: {id: sessionId}});
        return (res ? true : false);
    }


    public async getUserBySession(sessionId: number) {
        const res =
            await prisma.session.findFirst({
                where: {
                    id: sessionId
                },

                include: {
                    user: true
                },
                take: 1
            }
            );

        return res;
    }
}