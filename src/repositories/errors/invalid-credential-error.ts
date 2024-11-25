export class InvalidCredentialError extends Error {
  constructor() {
    super('Credenciais inválidas')
  }
}
