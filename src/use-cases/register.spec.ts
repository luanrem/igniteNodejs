import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'usaav@rafanvob.pt',
      password: '980544',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'usaav@rafanvob.pt',
      password: '980544',
    })

    const isPasswordCorrectlyHashed = await compare(
      '980544',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email', async () => {
    const email = 'pi@di.hm'

    await sut.execute({
      name: 'John Doe',
      email,
      password: '980544',
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email,
        password: '980544',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
