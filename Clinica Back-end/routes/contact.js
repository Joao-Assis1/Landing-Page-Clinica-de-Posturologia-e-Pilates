const express = require("express");
const router = express.Router();
const Contact = require("../models/contact");
const sendEmail = require("../services/emailService");

// Regex simples para validar email
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post("/", async (req, res) => {
  try {
    const { nome, email, telefone, mensagem } = req.body;

    // Validação básica dos campos
    if (!nome || !email || !mensagem) {
      return res.status(400).json({
        error: "Campos obrigatórios: nome, email e mensagem.",
      });
    }

    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Email inválido." });
    }

    // Salva no MongoDB
    const contact = await Contact.create({ nome, email, telefone, mensagem });

    // Prepara mensagem para envio
    const msg = {
      to: process.env.TO_EMAIL,
      from: process.env.FROM_EMAIL,
      subject: `Novo contato: ${nome}`,
      text: `${mensagem}\n\nTelefone: ${
        telefone || "Não informado"
      }\nEmail: ${email}`,
      html: `<p>${mensagem}</p>
             <p><strong>Nome:</strong> ${nome}</p>
             <p><strong>Telefone:</strong> ${telefone || "Não informado"}</p>
             <p><strong>Email:</strong> ${email}</p>`,
    };

    // Envia email
    await sendEmail(msg);

    return res.status(201).json({ message: "Mensagem enviada com sucesso!" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro interno do servidor." });
  }
});

module.exports = router;
