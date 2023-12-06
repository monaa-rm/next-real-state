import Profile from "@/models/Profile";
import User from "@/models/User";
import connectDB from "@/utils/ConnectDB";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { join } from "path";
import { unlinkSync } from "fs";
import { dirname } from "path";
import { rmdirSync } from "fs";

export async function DELETE(req, context) {
  try {
    await connectDB();
    const id = context.params.profileId;
    console.log("id", id);
    const session = await getServerSession(req);
    if (!session) {
      return NextResponse.json(
        { error: "لطفا وارد حساب کاربری خود شوید" },
        { status: 404 }
      );
    }
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json(
        { error: "حساب کاربری یافت نشد" },
        { status: 404 }
      );
    }

    const profile = await Profile.findOne({ _id: id });
    const deletedImages = profile.images;
    if (!profile) {
      return NextResponse.json(
        { error: "آگهی مورد نظر وجود ندارد" },
        { status: 404 }
      );
    }
    if (!user._id.equals(profile.userId)) {
      return NextResponse.json(
        { error: "دسترسی شما به این آگهی محدود شده است" },
        { status: 403 }
      );
    }
    // delete images------------

    profile.images.length &&
      profile.images.map(async (deletedImage) => {
        const imagePath = deletedImage.replace(process.env.IMAGE_PATH, ""); // دریافت مسیر محل ذخیره تصویر
        const absolutePath = join(process.cwd(), "/public/images", imagePath); // ایجاد مسیر کامل فایل
        const folderPath = dirname(absolutePath);
        console.log("folderPath", folderPath);
        try {
          console.log("absolutePath", absolutePath);
          unlinkSync(absolutePath); // حذف تصویر
          rmdirSync(folderPath);
          console.log(`تصویر ${absolutePath} با موفقیت حذف شد.`);
        } catch (error) {
          console.error(
            `مشکلی در حذف تصویر ${absolutePath} پیش آمده است: ${error}`
          );
        }
      });
    // ;;;;;;;;;;;;;;;;;

    await Profile.findOneAndDelete({ _id: id });

    return NextResponse.json(
      { message: "آگهی با موفقیت پاک شد" },
      { status: 200 }
    );
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      { error: "مشکلی در سرور پیش آمده است" },
      { status: 500 }
    );
  }
}
