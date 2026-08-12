import SocialLoginButtons from "@/components/ui/socialloginbuttons";
import ConditionalAuthHeader from "@/components/ui/conditional-auth-header";

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <div className="min-h-screen w-full flex flex-col items-center p-5">
        <h2 className="text-4xl text-primary font-bold">Budgefy</h2>
        <p className="text-lg text-primary mb-2">
          Your personal expense tracker
        </p>
        <div className="min-w-sm rounded-md border border-gray-200 p-4 shadow-sm md:w-md">
          <h2 className="text-2xl font-semibold text-gray-900 mb-1">
            <ConditionalAuthHeader />
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Start tracking your expenses today!
          </p>

          {/* Oauth container */}
          <SocialLoginButtons />

          {/* Divider line with "or" text */}
          <div className="flex flex-row items-center gap-4">
            <div className="w-full border-t border-gray-200" />
            <span className="text-gray-500">or</span>
            <div className="w-full border-t border-gray-200" />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
