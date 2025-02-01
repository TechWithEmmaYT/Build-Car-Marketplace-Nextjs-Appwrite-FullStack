import { APP_CONFIG } from "@/lib/app-config";
import { createSessionClient } from "@/lib/appwrite";
import { uploadSchema } from "@/validation/upload.validatiomn";
import { NextResponse } from "next/server";
import { ID } from "node-appwrite";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll("files") as File[];

    const validationResult = uploadSchema.safeParse({ files });

    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.message },
        { status: 400 }
      );
    }
    const { storages } = await createSessionClient();

    // Upload each file to Appwrite
    const uploadPromises = files.map(async (file) => {
      const uploadedFile = await storages.createFile(
        APP_CONFIG.APPWRITE.BUCKET_IMAGES_ID, // Bucket ID
        ID.unique(), // Generate a unique file ID
        file // The file to upload
      );
      const fileUrl = `${APP_CONFIG.APPWRITE.ENDPOINT}/storage/buckets/${APP_CONFIG.APPWRITE.BUCKET_IMAGES_ID}/files/${uploadedFile.$id}/view?project=${APP_CONFIG.APPWRITE.PROJECT_ID}`;

      return {
        id: uploadedFile.$id,
        url: fileUrl,
      };
    });
    const uploadedFiles = await Promise.all(uploadPromises);

    // Return the file IDs and URLs
    return NextResponse.json({ files: uploadedFiles }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
