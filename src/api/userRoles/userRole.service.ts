import { cryptPassword } from "../../common/helpers/hashing.helper";
import { Service } from 'typedi';
import prisma from "../../common/prisma/client";
import { BadRequestError } from "routing-controllers";

@Service()
export default class userRoleService {

    public async createRole(Data: any) {

        const role = await prisma.role.create({
            data: {
                name: Data.name,
            }
        });
        return role;
    }

    public async getAllRolse() {

        const role = await prisma.role.findMany({
            include:{
                permissions:{
                    include:{
                        permission:{
                            select:{
                                name:true
                            }
                        }
                    }
                }
            }
        });
        return role;
    }

    public async deleteRole(id: number) {

        const role = await prisma.role.delete({
            where: {
                id: id
            }
        });
        return "deleted"
    }

    public async createPermission(Data: any) {

        const permission = await prisma.permission.create({
            data: {
                name: Data.name,
            }
        });
        return permission;
    }
    public async getAllPermissions() {

        const permission = await prisma.permission.findMany();
        return permission;
    }
    public async deletePermission(id: number) {
            
            const permission = await prisma.permission.delete({
                where: {
                    id: id
                }
            });
             await prisma.rolePermission.deleteMany({
                where:{
                    permissionId:id
                }

             })
            return "deleted"
        }
    
    public async revokeRolePermission(Data: any) {
        await prisma.rolePermission.deleteMany({
            where:{
                permissionId:Number(Data.permissionId),
                roleId:Number(Data.roleId)
            }

         })
        }
    public async createRolePermission(Data: any) {
        console.log(Data);
        
            
            const rolePermission = await prisma.rolePermission.create({
                data: {
                    roleId: Number(Data.roleId),
                    permissionId: Number(Data.permissionId),
                }
            });
            return rolePermission;
        }
    public async getRolePermission(id:number) {
            
            const rolePermission = await prisma.rolePermission.findMany({
                where:{roleId:id},
                include:{
                    permission:{
                        select:{
                            name:true
                        }
                    }
                }
            }
            );
            return rolePermission;
        }

}



