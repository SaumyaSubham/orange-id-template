import { BedrockPassportProvider } from "@bedrock_org/passport";
import "@bedrock_org/passport/dist/style.css";

export function OrangeAuthProvider({
  children,
}: {
  children?: React.ReactNode;
}) {

  const domain = "orange-id-template.vercel.app";
  
  // Debug logging during initialization
  console.log("[mount.start]: Bedrock Passport");
  
  return (
    <BedrockPassportProvider
      baseUrl="https://api.bedrockpassport.com"
      authCallbackUrl={`${domain}/auth/callback`}
      tenantId="orange-ood92bfz7z"
      subscriptionKey="870c3f7db0ad4c9e9a5f90435d59edbd"
    >
      {children}
    </BedrockPassportProvider>
  );
}
