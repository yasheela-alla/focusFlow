import React from "react";
import { Button } from "../ui/button";
import { LogIn } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

interface LoginButtonProps {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

const LoginButton = ({
  variant = "outline",
  size = "sm",
  className = "",
}: LoginButtonProps) => {
  const { login, currentUser } = useAuth();

  const handleLogin = async () => {
    if (!currentUser) {
      try {
        await login();
      } catch (error) {
        console.error("Login failed:", error);
      }
    }
  };

  if (currentUser) {
    return null;
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleLogin}
      className={`flex items-center gap-2 ${className}`}
    >
      <LogIn className="h-4 w-4" />
      Sign in
    </Button>
  );
};

export default LoginButton;
