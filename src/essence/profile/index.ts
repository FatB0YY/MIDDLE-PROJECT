import { IProfile, ProfileSchema } from './model/types/profile'
import { profileActions, profileReducer } from './model/slice/profileSlice'
import { ProfileCard } from './ui/ProfileCard/ProfileCard'

export { ProfileCard, IProfile, ProfileSchema, profileActions, profileReducer }
