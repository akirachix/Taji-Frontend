import Image from "next/image";
import Login from "./(dashboard)/dashboard/login/page";
import SignUp from "./(dashboard)/dashboard/sign-up/page";
import PharmacyList from "./(dashboard)/dashboard/reports/page";
export default function Home() {
  return (
    <div>
      {/* <SignUp />
      <Login/> */}
      <PharmacyList/>
      
    </div>
  );
}
