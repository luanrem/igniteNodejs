import { FastifyRequest, FastifyReply } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  // try {
  //   const authenticateUseCase = makeAuthenticateUseCase()

  //   await authenticateUseCase.execute({
  //     email,
  //     password,
  //   })
  // } catch (err) {
  //   if (err instanceof InvalidCredentialError) {
  //     return reply.status(400).send({ message: err.message })
  //   }

  //   throw err
  // }

  return reply.status(200).send()
}
