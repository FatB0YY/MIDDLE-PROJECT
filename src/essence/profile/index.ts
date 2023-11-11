import { IProfile, ProfileSchema } from './model/types/profile'
import { profileActions, profileReducer } from './model/slice/profileSlice'
import { ProfileCard } from './ui/ProfileCard/ProfileCard'
import { getProfileState } from './model/selectors/getProfileState'
import { fetchProfileDataThunk } from './model/services/fetchProfileDataThunk'
import { updateProfileDataThunk } from './model/services/updateProfileDataThunk'

export {
  updateProfileDataThunk,
  fetchProfileDataThunk,
  getProfileState,
  ProfileCard,
  IProfile,
  ProfileSchema,
  profileActions,
  profileReducer,
}
