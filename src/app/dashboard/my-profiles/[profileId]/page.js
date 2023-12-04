import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import Profile from '@/models/Profile'
import AddProfilePage from '@/template/AddProfilePage'
import connectDB from '@/utils/ConnectDB'

const EditPage = async ({params : {profileId}}) => {
  await connectDB();
const profile = await Profile.findOne({_id : profileId})
if(!profile) return(<h1>مشکلی پیش آمده است.لطفا دوباره امتحان کنید..</h1>)
  return (
    <div>
      <AddProfilePage data={JSON.parse(JSON.stringify(profile))} />
    </div>
  )
}

export default EditPage
