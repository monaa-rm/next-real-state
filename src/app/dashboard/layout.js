import DashboardSideBar from "@/layout/DashboardSideBar";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import User from "@/models/User";

export const metadata = {
  title: "پنل داشبورد املاک | پروژه بوتواستارت",
};

const Dashboardlayout = async ({ children }) => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/signin");
  const user = await User.findOne({ email: session.user.email });
  if (!user) return <h3>مشکلی پیش آمده است</h3>;

  return (
    <DashboardSideBar email={user.email} role={user.role}>
      {children}
    </DashboardSideBar>
  );
};

export default Dashboardlayout;
