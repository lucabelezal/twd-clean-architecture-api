import { UserData } from '@/entities/user-data'
import { UserRepository } from '../ports/user-repository'

export class InMemoryUserRepository implements UserRepository {
  private users: UserData[]

  constructor (users: UserData[]) {
    this.users = users
  }

  async add (user: UserData): Promise<void> {
    const isExistingUser = await this.exists(user)
    if (!isExistingUser) {
      this.users.push(user)
    }
  }

  async findUserByEmail (email: string): Promise<UserData> {
    const userFound = this.users.find(user => user.email === email)
    return userFound || null
  }

  async findAllUsers (): Promise<UserData[]> {
    return this.users
  }

  async exists (user: UserData): Promise<boolean> {
    return await this.findUserByEmail(user.email) != null
  }
}
