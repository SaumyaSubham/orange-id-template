import { useEffect } from "react";
import { useLocation } from "wouter";
import { useBedrockPassport } from "@bedrock_org/passport";
import { useToast } from "@/hooks/use-toast";

export default function AuthCallback() {
  const [, setLocation] = useLocation();
  const { loginCallback } = useBedrockPassport();
  const { toast } = useToast();

  useEffect(() => {
    console.log("AuthCallback: Processing authentication callback");
    
    const login = async (token: string, refreshToken: string) => {
      try {
        console.log("AuthCallback: Attempting login with token and refreshToken");
        const success = await loginCallback(token, refreshToken);
        console.log("AuthCallback: Login result:", success);
        
        if (success) {
          toast({
            title: "Successfully logged in",
            description: "Welcome back!",
          });
          
          // Return to the previous page or home
          const returnPath = sessionStorage.getItem("returnPath") || "/";
          console.log("AuthCallback: Redirecting to", returnPath);
          sessionStorage.removeItem("returnPath"); // Clean up
          setLocation(returnPath);
        } else {
          console.error("AuthCallback: Login callback returned false");
          toast({
            variant: "destructive",
            title: "Authentication failed",
            description: "Login process completed but returned unsuccessful status",
          });
          setLocation("/");
        }
      } catch (error) {
        console.error("AuthCallback: Login callback error:", error);
        toast({
          variant: "destructive",
          title: "Authentication failed",
          description:
            error instanceof Error ? error.message : "Please try again",
        });
        setLocation("/");
      }
    };

    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const refreshToken = params.get("refreshToken");
    
    console.log("AuthCallback: URL Params -", 
      "token:", token ? "present" : "missing", 
      "refreshToken:", refreshToken ? "present" : "missing"
    );

    if (token && refreshToken) {
      login(token, refreshToken);
    } else {
      console.error("AuthCallback: Missing token or refreshToken in callback URL");
      toast({
        variant: "destructive",
        title: "Authentication failed",
        description: "Invalid authentication response",
      });
      setLocation("/");
    }
  }, [loginCallback, setLocation, toast]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black">
      <img src="/orange_logo.png" alt="Orange Logo" className="h-12 mb-4" />
      <div className="animate-pulse text-[#F37920] font-medium">
        Signing in...
      </div>
      <div className="mt-4 w-24 h-1 bg-gray-800 rounded-full relative overflow-hidden">
        <div className="absolute top-0 left-0 h-full bg-[#F37920] animate-loading"></div>
      </div>
    </div>
  );
}
