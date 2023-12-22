import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import AddProfilePage from '@/template/AddProfilePage'
import connectDB from '@/utils/ConnectDB'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'

const AddProfile = async () => {
  await connectDB()
  const session = await getServerSession(authOptions);
  if(!session) {
    redirect("/signin")
  }
  return (
<AddProfilePage />
  )
}

export default AddProfile
