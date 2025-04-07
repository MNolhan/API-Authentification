const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();
const z = require('zod');

const JWT_SECRET = process.env.JWT_SECRET;

//! -------- Zod --------

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, 'Le mot de passe doit faire au moins 6 caractères')
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

//! -------- Register --------

router.post('/register', async (req, res) => {
  const result = registerSchema.safeParse(req.body);

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    return res.status(400).json({ error: 'Champs invalides', details: errors });
  }

  const { email, password } = result.data;

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) return res.status(400).json({ error: 'Email déjà utilisé.' });

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { email, password: hashedPassword }
  });

  res.status(201).json({ message: 'Compte créé', userId: user.id });
});

//! -------- Login --------

router.post('/login', async (req, res) => {
  const result = loginSchema.safeParse(req.body);

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    return res.status(400).json({ error: 'Champs invalides', details: errors });
  }

  const { email, password } = result.data;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(400).json({ error: 'Email ou mot de passe invalide.' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ error: 'Email ou mot de passe invalide.' });

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1d' });
  res.json({ token });
});

module.exports = router;
