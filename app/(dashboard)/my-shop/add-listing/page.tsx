"use client";
import React from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import FileUploader from "@/components/FileUploader";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { addListingFields } from "@/constants/listing-fields";
import FormGenerator from "@/components/FormGenerator";
import { Button } from "@/components/ui/button";

const AddListing = () => {
  const formSchema = z.object(
    addListingFields.reduce((schema, field) => {
      let fieldSchema: z.ZodSchema = z.string().optional(); // Default to optional string
      if (field.required) {
        if (field.fieldType === "number") {
          fieldSchema = z.string().trim();
        } else if (field.fieldType === "multiselect") {
          fieldSchema = z.array(z.string());
        } else if (field.fieldType === "select") {
          fieldSchema = z.string({
            required_error: `${field.label} is required`,
          });
        } else {
          fieldSchema = z
            .string({
              required_error: `${field.label} is required`,
            })
            .min(1, { message: `${field.label} is required` }); // Required string
        }
      } else {
        if (field.fieldType === "number") {
          fieldSchema = z.string().optional();
        } else if (field.fieldType === "multiselect") {
          fieldSchema = z.array(z.string()).optional();
        } else if (field.fieldType === "select") {
          fieldSchema = z.string().optional();
        }
      }

      schema[field.name] = fieldSchema;
      return schema;
    }, {} as Record<string, z.ZodSchema>)
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {},
  });

  console.log(form.formState.errors);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const handleImageUrls = (imageUrls: string[]) => {
    console.log("Uploaded files in AddListingPage:", imageUrls);
  };
  return (
    <main className="container mx-auto px-4 pt-3 pb-8">
      <div className="max-w-4xl mx-auto pt-5">
        <Card className="!bg-transparent shadow-none border-none">
          <CardHeader
            className="flex items-center justify-center
           bg-white rounded-[8px] p-5 mb-3"
          >
            <CardTitle className="font-semibold text-xl">Add Listing</CardTitle>
          </CardHeader>

          <CardContent className="bg-white rounded-[8px] p-4 px-6 pb-8">
            <div className="w-full mx-auto">
              <div className="flex items-center">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full"
                  >
                    <div className="col-span-2 space-y-2 pt-3">
                      <h2 className="text-sm font-medium text-[#28363e]">
                        Add Photo
                      </h2>
                      <div className="text-sm text-[#6c8ea0]">
                        <div className="font-bold">
                          Add at least 5 photos for this category
                        </div>
                        First picture - is the title picture.{" "}
                        <span>You can sell all of the photos here</span>
                      </div>
                      <div className="flex items-center justify-start">
                        <FileUploader onImageUrlsReceived={handleImageUrls} />
                        <ScrollArea className="w-96 whitespace-nowrap ml-3">
                          <div className="flex w-max space-x-4 items-center h-20">
                            {[0, 1].map((_, index) => (
                              <div
                                key={index}
                                className={`relative overflow-hidden
                                 w-20 h-20 rounded-[8px] bg-[#e5f6e8]`}
                              >
                                <Image
                                  src="/images/benz.webp"
                                  alt="benz"
                                  width={80}
                                  height={80}
                                  className="spect-square
                                    w-full h-full rounded-[8px] object-cover"
                                />
                              </div>
                            ))}
                          </div>
                          <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 mt-4 gap-5">
                      {/* Render form fields dynamically using FormGenerator */}
                      {addListingFields.map((field, index) => (
                        <FormField
                          key={index}
                          control={form.control}
                          name={field.name}
                          disabled={field.disabled}
                          render={({ field: formField }) => (
                            <FormItem
                              className={`${
                                field.col ? `col-span-${field.col}` : ""
                              }`}
                            >
                              <FormControl>
                                <FormGenerator
                                  field={field}
                                  register={form.register}
                                  errors={form.formState.errors}
                                  defaultValue={field.value}
                                  {...formField}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="mt-6 py-6 mb-4 w-full max-w-xs 
                      flex place-items-center justify-self-center"
                    >
                      Post Listing
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default AddListing;
