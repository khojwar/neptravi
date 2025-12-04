"use client";

import { Textarea } from "@/components/ui/textarea"
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod"
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";


const userQuerySchema = z.object({
  message: z.string().min(1, "Message cannot be empty").max(4000),
});

type userQueryData = z.infer<typeof userQuerySchema>;

const UserQuery = () => {
  const [isLoading, setIsLoading] = useState(false);

    const form = useForm<userQueryData>({
    resolver: zodResolver(userQuerySchema),
    defaultValues: { message: "" },
  });

  const onSubmit = async (values: userQueryData) => {
    if (isLoading) return;
    setIsLoading(true);

    console.log("Submitted:", values.message);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    form.reset();
    setIsLoading(false);
  };

  // Enter = submit, Shift+Enter = newline
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      form.handleSubmit(onSubmit)();
    }
  };


  return (
    <div className="  w-full max-w-sm md:max-w-lg mt-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} >
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormControl>
                  <Textarea
                    className="text-sm md:text-lg h-16 md:h-20"
                    placeholder="Eg. I want to go to Chitwan for a romantic getaway with a budget of $2000..."
                    disabled={isLoading}
                    {...field}
                    onKeyDown={handleKeyDown}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  )
}

export default UserQuery