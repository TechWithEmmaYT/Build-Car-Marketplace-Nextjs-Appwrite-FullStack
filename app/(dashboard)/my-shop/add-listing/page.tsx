"use client";
import React from "react";
import { useForm, useWatch } from "react-hook-form";
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
import { addListingMutationFn } from "@/lib/fetcher";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { Loader, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { listingSchema } from "@/validation/listing.validation";
import useCurrentUser from "@/hooks/api/use-current-user";
import { isValidPhoneNumber } from "react-phone-number-input";
import {
  CAR_BRAND_OPTIONS,
  CAR_COLOR_OPTIONS,
  CAR_MODEL_OPTIONS,
  CAR_YEAR_OPTIONS,
} from "@/constants/cars";

const AddListing = () => {
  const router = useRouter();
  const { data } = useCurrentUser();
  const shop = data?.shop;

  const { mutate, isPending } = useMutation({
    mutationFn: addListingMutationFn,
  });

  const listingClientSchema = listingSchema.extend({
    contactPhone: z
      .string({
        required_error: "Contact number is required",
      })
      .refine(isValidPhoneNumber, "Invalid phone number"),
  });

  type FormDataType = z.infer<typeof listingClientSchema>;
  type FormFieldName = keyof FormDataType;

  const form = useForm<FormDataType>({
    resolver: zodResolver(listingClientSchema),
    mode: "onBlur",
    defaultValues: {
      brand: "",
      model: "",
      yearOfManufacture: "",
      exteriorColor: "",
      interiorColor: "",
      condition: "",
      secondCondition: [],
      mileage: "",
      transmission: "",
      fuelType: "",
      keyFeatures: [],
      vin: "",
      bodyType: "",
      drivetrain: "",
      seatingCapacity: "",
      description: "",
      price: 0,
      contactPhone: "",
      imageUrls: [],
    },
  });

  // Watch the imageUrls field for changes
  const imageUrls = useWatch({
    control: form.control,
    name: "imageUrls",
  });

  const brand = useWatch({
    control: form.control,
    name: "brand",
  });

  const handleImageUrls = (imageUrls: string[]) => {
    console.log("Uploaded files in AddListingPage:", imageUrls);
    form.setValue("imageUrls", [...form.getValues().imageUrls, ...imageUrls]);
  };

  const handleRemoveImage = (index: number) => {
    const updatedImageUrls = [...form.getValues().imageUrls];
    updatedImageUrls.splice(index, 1);
    form.setValue("imageUrls", updatedImageUrls);
  };

  const getLabel = (
    value: string,
    options: { value: string; label: string }[]
  ) => {
    const option = options.find((opt) => opt.value === value);
    return option ? option.label : value;
  };

  function onSubmit(values: FormDataType) {
    const { brand, model, condition, yearOfManufacture, exteriorColor } =
      values;
    const displayTitle = [
      condition === "BRAND_NEW" ? "New" : null,
      getLabel(brand, CAR_BRAND_OPTIONS),
      getLabel(model, CAR_MODEL_OPTIONS),
      getLabel(yearOfManufacture, CAR_YEAR_OPTIONS),
      exteriorColor !== "other"
        ? getLabel(exteriorColor, CAR_COLOR_OPTIONS)
        : null,
    ]
      .filter(Boolean)
      .join(" ");

    const payload = {
      ...values,
      displayTitle,
      shopId: shop?.$id,
    };

    mutate(payload, {
      onSuccess: () => {
        toast({
          title: "Listing added successfully",
          description: "Your listing is now live on the platform",
          variant: "success",
        });
        router.push("/my-shop");
      },
      onError: (error) => {
        toast({
          title: "Something went wrong",
          description: error.message,
          variant: "destructive",
        });
      },
    });
  }

  return (
    <main className="container mx-auto px-4 pt-3 pb-8">
      <div className="max-w-4xl mx-auto pt-5">
        <Card className="!bg-transparent shadow-none border-none">
          <CardHeader
            className="flex items-center justify-center
           bg-white rounded-[8px] p-4 mb-4"
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
                        <FileUploader onImageUrlsReceived={handleImageUrls}>
                          <ScrollArea className="w-96 whitespace-nowrap ml-3">
                            <div className="flex w-max space-x-4 items-center h-20">
                              {imageUrls.map((imageUrl, index) => (
                                <div
                                  key={index}
                                  className={`relative overflow-hidden
                                 w-20 h-20 rounded-[8px] bg-[#e5f6e8]`}
                                >
                                  <img
                                    src={imageUrl}
                                    alt=""
                                    width={80}
                                    height={80}
                                    className="spect-square
                                    w-full h-full rounded-[8px] object-cover"
                                  />
                                  <button
                                    onClick={() => handleRemoveImage(index)} // Add your remove logic here
                                    className="absolute top-0 right-0 p-1
                                     bg-black rounded-full"
                                  >
                                    <X className="w-4 h-4 !text-white  " />
                                  </button>
                                </div>
                              ))}
                            </div>
                            <ScrollBar orientation="horizontal" />
                          </ScrollArea>
                        </FileUploader>
                      </div>
                      <FormMessage>
                        {form.formState.errors.imageUrls?.message}
                      </FormMessage>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 mt-4 gap-5">
                      {/* Render form fields dynamically using FormGenerator */}
                      {addListingFields.map((field, index) => (
                        <FormField
                          key={index}
                          control={form.control}
                          name={field.name as FormFieldName}
                          disabled={field.disabled || isPending}
                          render={({ field: formField }) => {
                            const filteredModels =
                              field.name === "model" && brand
                                ? field?.options?.filter(
                                    (model: any) => model.key === brand
                                  )
                                : [];

                            const valueMultiSelect =
                              field.fieldType === "multiselect"
                                ? Array.isArray(formField.value)
                                  ? formField.value
                                  : []
                                : [];

                            return (
                              <FormItem
                                className={`${
                                  field.col ? `col-span-${field.col}` : ""
                                }`}
                              >
                                <FormControl>
                                  <FormGenerator
                                    field={{
                                      ...field,
                                      options:
                                        field.name === "model"
                                          ? filteredModels
                                          : field.options,
                                    }}
                                    register={form.register}
                                    errors={form.formState.errors}
                                    formValue={formField.value}
                                    valueMultiSelect={valueMultiSelect}
                                    onChange={formField.onChange}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </div>

                    {/* <Separator className="mt-5" />
                    <div className="pt-5 w-full max-w-sm mx-auto">
                      <h2 className="text-lg  mb-2 font-semibold text-[#28363e]">
                        Listing Plans
                      </h2>

                      <div className="flex items-center justify-between">
                        <div className="w-full flex flex-col gap-3 border-primary border-2 p-5 rounded-[8px]">
                          <h5 className="text-base font-medium text-black">
                            Free Listing
                          </h5>
                          <p className="text-sm text-[#6c8ea0]">
                            Your listing will be listed forever and will be
                            visible to all users
                          </p>
                          <Badge
                            className="bg-primary/80 justify-center
                             w-20 p-2 rounded-full border-1 border-primary
                           !shadow-none text-white"
                          >
                            Forever
                          </Badge>
                        </div>
                      </div>
                    </div> */}

                    <Button
                      type="submit"
                      size="lg"
                      className="mt-6 py-6 mb-4 w-full max-w-xs 
                      flex place-items-center justify-self-center"
                      disabled={isPending}
                    >
                      {isPending && (
                        <Loader className="w-4 h-4 mr-2 animate-spin" />
                      )}
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
