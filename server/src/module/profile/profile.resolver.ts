import { Args, Query, Resolver } from '@nestjs/graphql'
import { ProfileService } from './profile.service'
import { Profile } from './entities/profile.entity'

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Query(() => Profile)
  getProfileByName(@Args('name')name: string) {
    return this.profileService.getProfileByName(name)
  }
}
