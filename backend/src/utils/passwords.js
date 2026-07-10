import bcrypt from 'bcryptjs'

const COST_FACTOR = 10

export async function hashPassword(password) {
  return bcrypt.hash(password, COST_FACTOR)
}

export async function verifyPassword(password, passwordHash) {
  return bcrypt.compare(password, passwordHash)
}
