export const validation = (model) => (req, _res, next) => {
    const { success, error, data } = model.safeParse(req.body);
    if (!success)
        throw Object.assign(new Error(), {
            status: 400,
            message: error.issues[0].message,
        });
    req.body = data;
    next();
};
