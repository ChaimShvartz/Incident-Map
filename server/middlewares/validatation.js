export const validation =
    (model, prop = "body") =>
    (req, _res, next) => {
        const { success, error, data } = model.safeParse(req[prop]);
        if (!success)
            throw Object.assign(new Error(), {
                status: 400,
                message: error.issues[0].message,
            });
        prop === "body" ? (req.body = data) : (req.category = data);
        next();
    };
