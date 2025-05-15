const User = require("../models/User");
const Address = require("../models/Address");

module.exports = class UserController {
  static async createUser(req, res) {
    res.render("users/create");
  }
  static async createUserPost(req, res) {
    const { name, email, age, country, city, street } = req.body;

    // Validação de dados
    if (!name || !email || !age || !country || !city || !street) {
      req.flash("error", "Preencha todos os campos");
      return res.status(400).json({ error: "Preencha todos os campos" });
    }
    // Verifica se o usuário já existe
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      req.flash("error", "Usuário já existe");
      return res.status(400).json({ error: "Usuário já existe" });
    }

    try {
      await User.create({
        name,
        email,
        age,
      });
      // Criação do endereço
      // Associa o endereço ao usuário
      const user = await User.findOne({ where: { email } });
      const address = await Address.create({
        country,
        city,
        street,
        UserId: user.id, // Associa o endereço ao usuário
      });
      req.flash("success", "Usuario criado com sucesso");
      res.redirect("/");
    } catch (error) {
      req.flash("error", "Erro ao criar usuario");
      res.status(500).json({ error: error.message });
    }
  }
  static async getAllUsers(req, res) {
    try {
      const users = await User.findAll({
        include: {
          model: Address,
        },
      });
      // Verifica se existem usuários
      // Se não houver usuários, retorna um erro
      if (!users) {
        req.flash("error", "Nenhum usuário encontrado");
        return res.status(404).json({ error: "Nenhum usuário encontrado" });
      }
      // Renderiza a página com os usuários
      res.render("users/ver", {
        users: users.map((user) => user.get({ plain: true })),
      });
    } catch (error) {
      req.flash("error", "Erro ao listar usuários");
      res.status(500).json({ error: error.message });
    }
  }
};
