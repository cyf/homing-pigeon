"use client";

import * as React from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    return (
      <div className="relative">
        <input
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          className={cn(
            "border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          ref={ref}
          {...props}
        />
        {type === "password" && (
          <div className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 text-gray-400">
            {showPassword ? (
              <EyeIcon className="h-4 w-4" onClick={togglePasswordVisibility} />
            ) : (
              <EyeOffIcon
                className="h-4 w-4"
                onClick={togglePasswordVisibility}
              />
            )}
          </div>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

const FileInput = React.forwardRef<
  HTMLInputElement,
  InputProps & React.PropsWithChildren & { htmlFor: string }
>(({ className, type, children, htmlFor, ...props }, ref) => {
  return (
    <div className="relative">
      {children}
      <input
        className={cn(
          "border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
          "hidden",
        )}
        ref={ref}
        {...props}
        id={htmlFor}
        type="file"
      />
    </div>
  );
});
FileInput.displayName = "FileInput";

export { Input, FileInput };
