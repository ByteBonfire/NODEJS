export default async (app) => {
  app.use("/api/user", require("./api/user"));
};
