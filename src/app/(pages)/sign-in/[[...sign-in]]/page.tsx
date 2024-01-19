import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex justify-center pt-24">
      <SignIn
        appearance={{
          elements: {
            footer: {
              display: "none",
            },
          },
        }}
      />
    </div>
  );
}
