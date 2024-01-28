import { cryptPassword } from "../../common/helpers/hashing.helper";
import { Service } from 'typedi';
import prisma from "../../common/prisma/client";
import { BadRequestError } from "routing-controllers";
import { createUserDto, editUserDto } from "./dtos";

@Service()
export default class UserService {


    public async createUser(data: createUserDto) {

        const userOld = await prisma.user.findFirst({
            select: {
                email: true,
                phone: true,
            },
            where: {

                OR: [
                    {
                        phone: data.phone
                    },
                    {
                        email: data.email
                    }
                ]

            }
        });

        if (userOld) {
            if (userOld.email == data.email?.toLowerCase()) {
                throw new BadRequestError("this email already exits");
            }

            if (userOld.phone == data.phone) {
                throw new BadRequestError("this phone number already exits");
            }
        }
        
        data.password = await cryptPassword(data.password);

        const user = await prisma.user.create({
            data: {
                fullname: data.fullname,
                email: data.email?.toLowerCase(),
                phone: data.phone,
                password: data.password,
            },
        });

      
        return "created";
    }
    public async editUser(id: number, data: editUserDto) {
        const userOld = await prisma.user.findFirst({
            select: {
                email: true,
                phone: true,
            },
            where: {

                OR: [
                    {
                        phone: data.phone
                    },
                    {
                        email: data.email
                    }
                ],
                id: {
                    not: id
                }

            }
        });

        if (userOld) {
            if (userOld.email == data.email?.toLowerCase()) {
                throw new BadRequestError("this email already exits");
            }

            if (userOld.phone == data.phone) {
                throw new BadRequestError("this phone number already exits");
            }
        }

        if (data.password) {
            data.password = await cryptPassword(data.password);
        }

        let user = await prisma.user.update({
            data: {
                fullname: data.fullname,
                email: data.email?.toLowerCase() || undefined,
                phone: data.phone || undefined,
                password: data.password || undefined,
            },
            where: {
                id: id
            }
        });

        return user;
    }
    public async getList(limit: number=10, start: number=0) 
    {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                fullname: true,
                banned: true,
                email: true,
                phone: true,
                createdAt: true,
             
            },
            orderBy: {
                createdAt: "desc"
            },
            skip: start,
            take: limit
        });

        return users;
    }
    public async getUserByEmailorPhone(emailorPhone: string) {
        const user = await prisma.user.findFirst(
            {
                where: {
                    OR:
                        [
                            { email: emailorPhone },
                            { phone: emailorPhone }
                        ]
                }
            }
        );
        return user;
    }
    public async flipUserBan(id: number) {

        const res = await prisma.$transaction(async (tx) => {
            const user = await tx.user.findFirst(
                {
                    select: {
                        banned: true,
                    },
                    where: {
                        id: id
                    }
                }
            )
            if (!user) {
                return null;
            }

            return await tx.user.update(
                {
                    data: {
                        banned: !user.banned
                    },
                    where: {
                        id: id,
                    }
                }
            )
        });

        return res;

    }
    public async getUser( id: number) {
        const user = await prisma.user.findFirst({
            select: {
                id: true,
                fullname: true,
                banned: true,
                email: true,
                phone: true,
                createdAt: true,
               
                
            },
            where: {
                id: id
            }
        });
       
        return user;
    }

}