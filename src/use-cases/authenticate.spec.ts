import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialError } from './errors/invalid-credentials-error'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to authenticate', async () => {
    // sut -> System Under Test

    await usersRepository.create({
      name: 'John Doe',
      email: 'linosdal@memdole.gq',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'linosdal@memdole.gq',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'linosdal@memdole.gq',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialError)
  })

  it('should not be able to authenticate with the wrong', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'linosdal@memdole.gq',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'linosdal@memdole.gq',
        password: '007627',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialError)
  })
})
