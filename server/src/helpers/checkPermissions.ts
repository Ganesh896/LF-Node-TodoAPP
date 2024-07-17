import { BaseModel } from "../model/base";

//get users
export class PermissionModel extends BaseModel {
    static async chekPermissions(userId: number) {
        const permissions = await this.queryBuilder()
            .select("p.permission")
            .from("roles as r")
            .join("userRoles as ur", "r.id", "ur.roleId")
            .join("rolePermissions as rp", "rp.roleId", "ur.roleId")
            .join("permissions as p", "rp.permissionId", "p.id")
            .where("ur.userId", userId);

        return permissions;
    }
}
