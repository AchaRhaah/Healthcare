import RegisterForm from "@/components/components/forms/RegisterForm";
import Image from "next/image";
import { getUser } from "../../../../../lib/actions/patient.actions";

const Register = async ({ params }: { params: { userId: string } }) => {
  const userId = params.userId; // params does not need to be awaited

  // Fetch the user using the ID
  const user = await getUser(userId);

  // Handle the case where the user might not exist
  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>User not found. Please check the user ID or contact support.</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen max-h-screen">
      {/* Todo: OTP verification */}
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[760px] flex-col py-10">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
          />
          <RegisterForm user={user} />
          <div className="text-14-regular mt-20 justify-between">
            <p>© 2024 carepulse</p>
          </div>
        </div>
      </section>
      <Image
        src="/assets/images/register-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[390px]"
      />
    </div>
  );
};

export default Register;
