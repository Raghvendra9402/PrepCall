"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  category: z.string(),
  difficulty: z.enum(["Easy", "Intermediate", "Hard"]),
});

type CategorySelectItemsType = {
  value: string;
  label: string;
};

const categorySelectItems: CategorySelectItemsType[] = [
  {
    value: "fullstack",
    label: "Fullstack",
  },
  {
    value: "backend",
    label: "Backend",
  },
  {
    value: "devops",
    label: "Devops",
  },
  {
    value: "system design",
    label: "System Design",
  },
  {
    value: "machine learning",
    label: "Machine Learning",
  },
];

export function InterviewForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { data } = await axios.post("/api/interview", values);
      toast.success(
        "Your interview is created, you will be redirected there...",
      );
      router.push(`/interview/${data.id}`);
    } catch {
      toast.error("Something went wrong!");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Interview Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-[400px]">
                    <SelectValue placeholder="Select category of your choice" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="w-[400px]">
                  {categorySelectItems.map((cat, idx) => (
                    <SelectItem value={cat.value} key={idx}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription className=" w-[400px]">
                Choose the role or domain you&apos;d like to be interviewed for.
                This helps the AI tailor its questions to match your chosen
                field.
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="difficulty"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Difficulty level</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col"
                >
                  <FormItem className="flex items-center gap-3">
                    <FormControl>
                      <RadioGroupItem value="Easy" />
                    </FormControl>
                    <FormLabel className="font-normal">Easy</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center gap-3">
                    <FormControl>
                      <RadioGroupItem value="Intermediate" />
                    </FormControl>
                    <FormLabel className="font-normal">Intermediate</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center gap-3">
                    <FormControl>
                      <RadioGroupItem value="Hard" />
                    </FormControl>
                    <FormLabel className="font-normal">Hard</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />

        <div className="w-full inline-flex justify-center mt-4">
          <Button
            type="submit"
            disabled={form.formState.isSubmitting || !form.formState.isValid}
          >
            Start Interview
          </Button>
        </div>
      </form>
    </Form>
  );
}
