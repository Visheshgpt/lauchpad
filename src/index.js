const app = require("./app");
const config = require("./config/config");

app.listen(config.port || 3000, () => {
  console.log("app started on the port " + (config.port || 3000));
});