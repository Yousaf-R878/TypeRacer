const constructorMethod = (app) => {
    app.use("*", (req, res) => {
        res.render("test")
    });
};

export default constructorMethod;