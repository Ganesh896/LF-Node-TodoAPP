export class BaseError extends Error {
    constructor(message = "") {
        super(message);
    }
}

export class UnauthenticatedError extends BaseError {
    constructor(message = "Unauthenticated") {
        super(message);
    }
}
export class BadRequestError extends BaseError {
    constructor(message = "Not a valid request") {
        super(message);
    }
}

export class ForbiddenError extends BaseError {
    constructor(message = "Forbidden access") {
        super(message);
    }
}

export class NotFoundError extends BaseError {
    constructor(message = "Not Found") {
        super(message);
    }
}

export class ConflictError extends BaseError {
    constructor(message = "Conflict") {
        super(message);
    }
}
