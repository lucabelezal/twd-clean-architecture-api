import { User } from '@/entities/user'
import { UserData } from '@/entities/user-data'
import { UserRepository } from '@/usescases/register-user-on-mailing-list/ports/user-repository'
import { RegisterUserOnMailingList } from '@/usescases/register-user-on-mailing-list/register-user-on-mailing-list'
import { InMemoryUserRepository } from '@/usescases/register-user-on-mailing-list/repository/in-memory-user-repository'

describe('Register user on mailing list use case', () => {
  test('should add user with complete data to mailing list', async () => {
    const users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
    const name = 'any_name'
    const email = 'any@email.com'
    const user = User.create({ name, email }).value as User
    const response = await usecase.perform(user)
    const addedUser = repo.findUserByEmail('any@email.com')
    expect((await addedUser).name).toBe('any_name')
    expect(response.name).toBe('any_name')
  })
})
