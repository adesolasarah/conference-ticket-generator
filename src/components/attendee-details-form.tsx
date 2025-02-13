'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

import { ImageUpload } from '@/components/image-upload';
import { Textarea } from '@/components/ui/textarea';
import {
  attendeeFormSchema,
  type AttendeeFormValues,
} from '@/lib/validations/attendee';

interface AttendeeDetailsFormProps {
  onSubmit: (data: AttendeeFormValues) => void;
  initialData?: Partial<AttendeeFormValues> | null;
}

export function AttendeeDetailsForm({
  onSubmit,
  initialData,
}: AttendeeDetailsFormProps) {
  const router = useRouter();

  const form = useForm<AttendeeFormValues>({
    resolver: zodResolver(attendeeFormSchema),
    defaultValues: {
      name: initialData?.name || '',
      email: initialData?.email || '',
      avatarUrl: initialData?.avatarUrl || '',
      specialRequest: initialData?.specialRequest || '',
    },
  });

  function onFormSubmit(data: AttendeeFormValues) {
    try {
      onSubmit(data);
      toast.success('Your ticket details have been saved.');
    } catch (error) {
      console.log(error);
      toast.error('Your ticket details have been saved.');
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="avatarUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Photo</FormLabel>
              <FormControl>
                <ImageUpload
                  onUploadComplete={(url) => field.onChange(url)}
                  error={form.formState.errors.avatarUrl?.message}
                  maxSizeMB={5}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your full name"
                  className="bg-[#08343C]/30 border-2 border-teal-800 text-white"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-[#08343C]/30 border-2 border-teal-800 text-white"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="specialRequest"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Special Request</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Any special requests or requirements?"
                  className="bg-[#08343C]/30 border-2 border-teal-800 text-white resize-none h-32"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex space-x-4 mt-8">
          <button
            onClick={() => router.back()}
            className="w-1/2 py-3 text-center border-2 border-[#24A0B5] rounded-lg hover:bg-teal-900/30"
          >
            Back
          </button>
          <button
            type="submit"
            className="w-1/2 py-3 text-center bg-[#24A0B5] rounded-lg hover:bg-teal-400"
          >
            Get My Free Ticket
          </button>
        </div>
      </form>
    </Form>
  );
}
