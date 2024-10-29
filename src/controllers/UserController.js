import User from '../models/User';

class UserController {
  async store(req, res) {
    try {
      const novoUser = await User.create(req.body);
      const { id, nome, email } = novoUser;
      return res.json({ id, nome, email });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // Index
  async index(req, res) {
    try {
      const users = await User.findAll({ attributes: ['id', 'nome', 'email'] });
      return res.json(users);
    } catch (e) {
      return res.json(null);
    }
  }

  // Show
  async show(req, res) {
    try {
      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.status(404).json({ errors: ['Usuário não existe'] });
      }

      const { id, nome, email } = user;
      return res.json({ id, nome, email });
    } catch (e) {
      return res.json(null);
    }
  }

  // Update
  async update(req, res) {
    try {
      // Verificar se o userId vem do middleware de autenticação ou do corpo da requisição
      const userId = req.userId || req.body.id;
      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(400).json({
          errors: ['Usuário não existe'],
        });
      }

      const novosDados = await user.update(req.body);
      const { id, nome, email } = novosDados;
      return res.json({ id, nome, email });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

// Delete
async delete(req, res) {
  try {
    const userId = req.body.id; // ID que está sendo enviado na requisição
    console.log(`ID recebido para exclusão: ${userId}`); // Log para verificar o ID recebido

    const user = await User.findByPk(userId);

    if (!user) {
      console.log(`Usuário não encontrado com ID: ${userId}`); // Log para verificar o ID buscado
      return res.status(400).json({
        errors: ['Usuário não existe'],
      });
    }

    await user.destroy();
    return res.json({ message: `Usuário com ID ${userId} excluído com sucesso` });
  } catch (e) {
    return res.status(400).json({
      errors: e.errors.map((err) => err.message),
    });
  }
}


}

export default new UserController();
