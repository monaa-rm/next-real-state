import Profile from "@/models/Profile";
import User from "@/models/User";
import connectDB from "@/utils/ConnectDB";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { join } from "path";
import { unlinkSync } from "fs";
import { dirname } from "path";
import { rmdirSync } from "fs";

export async function PATCH(req, context) {
  try {
    //     return NextResponse.json(
    // { message: "injaaaaaaaaaaa" },
    // { status: 200 })
    await connectDB();
    const id = context.params.profileId;
    console.log("id", id);

    const session = await getServerSession(req);
    if (!session) {
      return NextResponse.json(
        { error: "لطفا وارد حساب کاربری خود شوید" },
        { status: 401 }
      );
    }
    const user = await User.findOne({ email: session.user.email });
    console.log("user", user);
    if (!user) {
      return NextResponse.json(
        { error: "حساب کاربری یافت نشد" },
        { status: 404 }
      );
    }
    if (user.role !== "ADMIN") {
      return NextResponse.json({ error: "دسترسی محدود" }, { status: 403 });
    }
    const profile = await Profile.findOne({ _id: id });
    if (!profile) {
      return NextResponse.json(
        { error: "آکهی مورد نظر یافت نشد" },
        { status: 404 }
      );
    }
    profile.published = true;
    profile.save();
    return NextResponse.json({ message: "آگهی منتشر شد" }, { status: 200 });
  } catch (error) {
    console.log(error);
    NextResponse.json({ error: "مشکلی در سرور پیش آمده است" }, { status: 500 });
  }
}

export async function DELETE(req, context) {
  try {
    await connectDB();
    const id = context.params.profileId;

    const session = await getServerSession(req);
    console.log("session", session);
    if (!session) {
      return NextResponse.json(
        { error: "لطفا وارد حساب کاربری خود شوید" },
        { status: 401 }
      );
    }
    const user = await User.findOne({ email: session.user.email });
    console.log("user", user);
    if (!user) {
      return NextResponse.json(
        { error: "حساب کاربری یافت نشد" },
        { status: 404 }
      );
    }
    if (user.role !== "ADMIN") {
      return NextResponse.json({ error: "دسترسی محدود" }, { status: 403 });
    }
    const profile = await Profile.findOne({ _id: id });
    if (!profile) {
      return NextResponse.json(
        { error: "آگهی شما یافت نشد" },
        { status: 404 }
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

    const removedProfile = await Profile.deleteOne({ _id: id });


    return NextResponse.json({ message: "آگهی حذف شد" }, { status: 200 });
  } catch (error) {
    console.log(error);
    NextResponse.json({ error: "مشکلی در سرور پیش آمده است" }, { status: 500 });
  }
}
