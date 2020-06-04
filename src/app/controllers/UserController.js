import * as Yup from 'yup';
import Cryptr from 'cryptr';

import User from '../models/User';
import Mail from '../../lib/Mail';

class UserController {
  async index(req, res) {
    const users = await User.findAll({ attributes: ['name', 'email'] });
    return res.json(users);
  }

  async show(req, res) {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(400).json({ error: 'Invalid user.' });
    }
    return res.json(user);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required().min(6).max(55),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6).max(55),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails.' });
    }

    const userExists = await User.findOne({ where: { email: req.body.email } });
    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }
    const { id, name, email } = await User.create(req.body);

    const cryptr = new Cryptr('YourSecretHere');
    const encryptedString = cryptr.encrypt(id);
    // const decryptedString = cryptr.decrypt(encryptedString);

    await Mail.sendMail({
      to: `${name} <${email}>`,
      subject: "Welcome, we are glad you're here!",
      template: 'welcome',
      context: {
        username: name,
        verificationUrl: `http://localhost:3000/verify/${encryptedString}`,
      },
    });

    return res.json({ id, name, email, provider });
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      await user.update(req.body);
      return res.json(user);
    } catch (err) {
      return res.status(401).json({ error: 'The update sadly failed.' });
    }
  }

  async recovery(req, res) {
    const { email } = req.query;
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      return res.status(400).json({
        error: 'Invalid email',
      });
    }

    const { id, name } = user;
    const cryptr = new Cryptr('YourSecretHere');
    const encryptedString = cryptr.encrypt(id);

    await Mail.sendMail({
      to: `${name} <${email}>`,
      subject: 'Recover your password',
      template: 'recovery',
      context: {
        username: name,
        recoveryUrl: `http://localhost:3000/recovery/${encryptedString}`,
      },
    });

    return res.send();
  }
}

export default new UserController();
