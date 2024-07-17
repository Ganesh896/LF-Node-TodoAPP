import { BaseModel } from "../model/base";

//get users
export class PermissionModel extends BaseModel {
    static async chekPermissions(userId: number) {
        const permissions = await this.queryBuilder()
            .select("p.permission")
            .from("roles as r")
            .join("userRoles as ur", "r.id", "ur.role_id")
            .join("rolePermissions as rp", "rp.role_id", "ur.role_id")
            .join("permissions as p", "rp.permission_id", "p.id")
            .where("ur.user_id", userId);

        return permissions;
    }
}
