import { User } from '@/entities/user'
import { UserData } from '@/entities/user-data'
import { UseCase } from '../ports/use-case'
import { UserRepository } from './ports/user-repository'

export class RegisterUserOnMailingList implements UseCase {
  private readonly userRepo: UserRepository

  constructor (userRepo: UserRepository) {
    this.userRepo = userRepo
  }

  public async perform (request: User): Promise<UserData> {
    const name = request.name.value
    const email = request.email.value
    const userData = { name, email }
    if (!(await this.userRepo.exists(userData))) {
      await this.userRepo.add(userData)
    }
    return userData
  }
}
