export const Permissions = {
    USER_CREATE: "users.create",
    USER_GET: "users.get",
    USER_UPDATE: "users.update",
    USER_DELETE: "users.delete",
    TODO_CREATE: "todos.create",
    TODO_GET: "todos.get",
    TODO_UPDATE: "todos.update",
    TODO_DELETE: "todos.delete",
} as const;

export type Permission = (typeof Permissions)[keyof typeof Permissions];
