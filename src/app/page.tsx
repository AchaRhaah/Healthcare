import PatientForm from "@/components/components/forms/PatientForm";
import PasskeyModal from "@/components/components/PasskeyModal";
import Image from "next/image";
import Link from "next/link";

// Proper type for searchParams
interface HomeProps {
  searchParams?: { [key: string]: string | undefined };
}

export default async function Home({ searchParams }: HomeProps) {
  // Await searchParams if Next.js requires it
  const params = await Promise.resolve(searchParams ?? {});
  const isAdmin = params.admin === "true";

  return (
    <div className="flex h-screen max-h-screen">
      {isAdmin && <PasskeyModal />}
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="logo"
            className="mb-12 h-10 w-fit"
          />
          <PatientForm />
          <div className="text-14-regular mt-20 flex justify-between">
            <p>© 2024 carepulse</p>
            <Link href="/?admin=true" className="text-green-500">
              Admin
            </Link>
          </div>
        </div>
      </section>
      <Image
        src="/assets/images/onboarding-img.png"
        height={1000}
        width={1000}
        alt="onboarding"
        className="side-img max-w-[50%]"
      />
    </div>
  );
}
