import Profile from "@/models/Profile";
import DetailPage from "@/template/DetailPage"
import connectDB from "@/utils/ConnectDB"

const ProfileDetails = async ({params : {profileId}}) => {
await connectDB();
const profile = await Profile.findOne({_id : profileId});

if(!profile) return <h3>مشکلی پیش آمده است</h3>

  return (
    <DetailPage data={profile} />
  )
}

export default ProfileDetails

export const generateMetadata = async ({params : {profileId}}) => {
  await connectDB();
const profile = await Profile.findOne({_id : profileId});

return{title : profile.title , description : profile.description}
}