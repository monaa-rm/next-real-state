import DashboardPage from "@/template/DashboardPage";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import connectDB from "@/utils/ConnectDB";

const Dashboard = async () => {
  await connectDB()
  const session = await getServerSession(authOptions);
  if (!session) redirect("/signin")
  const user = await User.findOne({ email: session.user.email });
  console.log(user)
  return <DashboardPage createdAt={user.createdAt} />;
};

export default Dashboard;
