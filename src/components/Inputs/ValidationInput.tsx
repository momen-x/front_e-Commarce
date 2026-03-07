"use client";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { InputHTMLAttributes } from "react";

type Props<T> = {
  fieldTitle: string;
  nameInSchema: keyof T & string;
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function ValidationInput<T>({
  fieldTitle,
  nameInSchema,
  className,
  ...props
}: Props<T>) {
  const form = useFormContext();

  return (
    <FormField
      name={nameInSchema}
      control={form.control}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base" htmlFor={nameInSchema}>
            {fieldTitle}
          </FormLabel>
          <FormControl>
            {/* <Input
              id={nameInSchema}
              className={`w-full max-w-xs disabled:text-blue-500 dark:disabled:text-yellow-300 disabled:opacity-75
                ${className}
                    `}
              {...props}
              {...field}

            /> */}
            <Input
  id={nameInSchema}
  className={`w-full max-w-xs disabled:text-blue-500 dark:disabled:text-yellow-300 disabled:opacity-75 ${className}`}
  {...props}
  {...field}
  // override value and onChange for file inputs
  value={props.type === "file" ? undefined : field.value}
  onChange={(e) => {
    if (props.type === "file") {
      field.onChange(e.target.files?.[0]); // pass the actual File object
    } else {
      field.onChange(e);
    }
  }}
/>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    ></FormField>
  );
}
