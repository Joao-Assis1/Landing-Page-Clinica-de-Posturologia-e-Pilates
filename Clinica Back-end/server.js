require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const contactRoutes = require("./routes/contact");

const app = express();
const PORT = process.env.PORT || 10000;

// Middlewares
app.use(helmet());
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin:
      process.env.FRONTEND_URL ||
      "https://joao-assis1.github.io/Landing-Page-Clinica-de-Posturologia-e-Pilates/",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

// Limite simples para evitar spam
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: { error: "Muitas requisições. Tente novamente em breve." },
});
app.use("/api/", limiter);

// Conexão com MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => {
    console.error("Erro MongoDB", err);
    process.exit(1);
  });

// Rotas
app.get("/", (req, res) => res.send("API rodando"));
app.use("/api/contact", contactRoutes);

// Inicia servidor
app.listen(PORT, () => console.log(`Server rodando na porta ${PORT}`));
