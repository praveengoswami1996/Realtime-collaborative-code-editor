"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { LoaderCircle, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import useCreateProject from "@/hooks/mutations/projects/useCreateProject";

const createProjectSchema = z.object({
  name: z
    .string()
    .min(1, "Project name is required"),
});

type CreateProjectFormData = z.infer<typeof createProjectSchema>;

export default function CreateProjectForm() {
  const form = useForm<CreateProjectFormData>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: "",
    },
    mode: "all",
  });
  const { mutate: createProject, isPending } = useCreateProject(); 

  const onSubmit = async (data: CreateProjectFormData) => {
    try {
      createProject(data);
      form.reset();
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter your project name..."
                  className="flex-1 h-12 text-base bg-card/80 border-border focus:border-primary/50 focus:ring-primary/20 backdrop-blur-sm"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={!form.watch("name") || isPending}
          className="h-12 px-8 text-white font-medium bg-rose-700 transition-all duration-300 hover:scale-105 cursor-pointer"
        >
          {!isPending ? (
            <>
              <Plus className="mr-1 h-4 w-4" />
              Create Project
            </>
          ) : (
            <>
              <LoaderCircle className="mr-1 h-4 w-4 animate-spin" />
              Creating Project...
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}