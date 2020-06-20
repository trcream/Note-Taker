const express = require("express");

const htmlRoutes = require("./routes/htmlRoutes");
const apiRoutes = require("./routes/apiRoutes");

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use("/api", apiRoutes);
app.use(htmlRoutes);

app.listen(PORT, () => {
  console.log(`Listenting on Port ${PORT}`);
});
