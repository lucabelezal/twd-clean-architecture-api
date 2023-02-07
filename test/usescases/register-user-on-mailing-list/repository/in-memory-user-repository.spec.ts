import { InMemoryUserRepository } from '@/usescases/register-user-on-mailing-list/repository/in-memory-user-repository'
import { createEmptyUsersDataDummy, createUserDummy, createUsersDataDummy } from '@test/usescases/test-doubles/dummies/users-data-dummy'

describe('InMemoryUserRepository', () => {
    /* eslint-disable no-unused-vars */
    const enum UsersDataDummyType {
        Empty,
        Content
    }
    function createSUT (dummyType: UsersDataDummyType = UsersDataDummyType.Empty): InMemoryUserRepository {
      switch (dummyType) {
        case UsersDataDummyType.Empty:
          return new InMemoryUserRepository(createEmptyUsersDataDummy())
        case UsersDataDummyType.Content:
          return new InMemoryUserRepository(createUsersDataDummy())
      }
    }
    describe('add', () => {
      test('should add if user not exists', async () => {
        const sut = createSUT()
        expect((await sut.findAllUsers()).length).toBe(0)
        await sut.add(createUserDummy())
        expect((await sut.findAllUsers()).length).toBe(1)
      })
      test('should not add if user already exists', async () => {
        const sut = createSUT()
        await sut.add(createUserDummy())
        expect((await sut.findAllUsers()).length).toBe(1)
        await sut.add(createUserDummy())
        expect((await sut.findAllUsers()).length).toBe(1)
      })
    })
    describe('findUserByEmail', () => {
      test('should return null if user is not found', async () => {
        const sut = createSUT()
        const receivedUser = await sut.findUserByEmail('any@mail.com')
        expect(receivedUser).toBeNull()
      })

      test('should return user if it is found in the repository', async () => {
        const sut = createSUT()
        await sut.add(createUserDummy())
        const receivedUser = await sut.findUserByEmail('any@mail.com')
        expect(receivedUser.name).toBe('any_name')
      })
    })
    describe('findAllUsers', () => {
      test('should return all users in the repository', async () => {
        const sut = createSUT(UsersDataDummyType.Content)
        const returnedUsers = await sut.findAllUsers()
        expect(returnedUsers.length).toBe(2)
      })
    })
    describe('exists', () => {
      test('should return true if user exists', async () => {
        const sut = createSUT()
        await sut.add(createUserDummy())
        const isExistingUser = await sut.exists(createUserDummy())
        expect(isExistingUser).toBeTruthy()
      })
      test('should return false if user not exists', async () => {
        const sut = createSUT()
        const isExistingUser = await sut.exists(createUserDummy())
        expect(isExistingUser).toBeFalsy()
      })
    })
})
