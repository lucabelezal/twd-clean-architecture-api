import { UserData } from '@/entities/user-data'

export function createUserDummy (index: number = 0): UserData {
  return createUsersDataDummy()[index]
}

export function createUsersDataDummy (): UserData[] {
  return [
    { name: 'any_name', email: 'any@mail.com' },
    { name: 'second_name', email: 'second@mail.com' }
  ]
}

export function createEmptyUsersDataDummy (): UserData[] {
  return []
}
