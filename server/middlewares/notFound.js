export const notFound = (_req, _res, next) => {
    throw Object.assign(new Error(), {
        status: 404,
        message: "Path not found",
    });
};
