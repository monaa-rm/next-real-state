import Profile from "@/models/Profile";
import BuyResidentialPage from "@/template/BuyResidentialPage";
import connectDB from "@/utils/ConnectDB";

const BuyResidential = async({searchParams}) => {
  // const res = await fetch("http://localhost:3000/api/profile", {
  //   cache: "no-store",
  // });
  // const { data } = await res.json();
  await connectDB();
  const data = await Profile.find();
let finalData  = data;
if(searchParams.category) {
finalData = finalData.filter(i => i.category === searchParams.category)
}
  return <BuyResidentialPage data={JSON.parse(JSON.stringify(finalData))} />;
};

export default BuyResidential;
