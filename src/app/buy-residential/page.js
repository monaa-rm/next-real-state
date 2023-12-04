import BuyResidentialPage from "@/template/BuyResidentialPage";

const BuyResidential = async({searchParams}) => {
  const res = await fetch("http://localhost:3000/api/profile", {
    cache: "no-store",
  });
  const { data } = await res.json();
let finalData  = data;
if(searchParams.category) {
finalData = finalData.filter(i => i.category === searchParams.category)
}
  return <BuyResidentialPage data={finalData} />;
};

export default BuyResidential;
