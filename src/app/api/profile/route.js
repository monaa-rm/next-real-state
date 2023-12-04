import connectDB from "@/utils/ConnectDB";
import { sanitizeFilename } from "@/utils/replaceName";
import { stat, mkdir, writeFile } from "fs/promises";
import { extname, join } from "path";

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import User from "@/models/User";
import { Types } from "mongoose";
import Profile from "@/models/Profile";
import { isValidUrl } from "@/utils/isValidUrl";
import { unlinkSync } from "fs";
import { dirname } from "path";
import { rmdirSync } from "fs";

export async function GET(req) {
  try {
    await connectDB();
    const profile = await Profile.find({ published: true }).select("-userId");
    return NextResponse.json({ data: profile }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "مشکلی در سرور پیش آمده است" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectDB();
    let formData = await req.formData();
    console.log("formData", formData)
    const title = await formData.get("title");
    const location = await formData.get("location");
    const description = await formData.get("description");
    const realState = await formData.get("realState");
    const price = await formData.get("price");
    const rentorsale = await formData.get("rentorsale");
    const earnest = await formData.get("earnest");
    const rentMoney = await formData.get("rentMoney");
    const phone = await formData.get("phone");
    const constructionDate = await formData.get("constructionDate");
    const category = await formData.get("category");
    // const rules = await formData.get("rules");
    // const amenities = await formData.get("amenities");
    //rules
    const rules = [];
    let rindex = 0;

    while (formData.has(`rules-[${rindex}]`)) {
      const rule = await formData.get(`rules-[${rindex}]`);
      rules.push(rule);
      rindex++;
    }
    //amenities
    const amenities = [];
    let aindex = 0;

    while (formData.has(`amenities-[${aindex}]`)) {
      const amenity = await formData.get(`amenities-[${aindex}]`);
      amenities.push(amenity);
      aindex++;
    }
    console.log({
      title,
      location,
      description,
      realState,
      price,
      rentorsale,
      rentMoney,
      earnest,
      phone,
      constructionDate,
      rules,
      amenities
    });

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
    console.log("user._id", new Types.ObjectId(user._id));
    if (!user) {
      return NextResponse.json(
        { error: "حساب کاربری یافت نشد" },
        { status: 404 }
      );
    }
    if (
      !title ||
      !location ||
      !description ||
      !phone ||
      !realState ||
      !rentorsale ||
      !constructionDate ||
      !category
    ) {
      return NextResponse.json(
        { error: "لطفا اطلاعات معتبر وارد کنید" },
        { status: 400 }
      );
    }
    //upload image ---------------------------------

    const images = [];
    let index = 0;
    let finalFilePaths = [];

    while (formData.has(`images-${index}`)) {
      const image = await formData.get(`images-${index}`);
      images.push(image);
      index++;
    }
    for (const imgFile of images) {
      const buffer = Buffer.from(await imgFile.arrayBuffer());

      const pathDist = join(process.cwd(), "/public/images");
      const relativeUploadDir = `${imgFile.name}-${Date.now().toString()}`;
      const uploadDir = join(pathDist, relativeUploadDir);

      try {
        await stat(uploadDir);
      } catch (error) {
        if (error.code === "ENOENT") {
          await mkdir(uploadDir, { recursive: true });
        } else {
          console.error(
            "Error while trying to create directory when uploading a file",
            e
          );

          return NextResponse.json(
            { error: `Something went wrong.${error}` },
            { status: 500 }
          );
        }
      }
      // ----------
      const uniqueSuffix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
      const fileExtension = extname(imgFile.name);
      const originalFilename = imgFile.name.replace(/\.[^/.]+$/, "");
      const sanitizedFilename = sanitizeFilename(originalFilename);
      const filename = `${sanitizedFilename}_${uniqueSuffix}${fileExtension}`;
      await writeFile(`${uploadDir}/${filename}`, buffer);

      const finalFilePath =
        process.env.IMAGE_PATH + `${relativeUploadDir}/${filename}`;
      finalFilePaths.push(finalFilePath);
      console.log("finalFilePath : " + finalFilePath);
      console.log("filename : " + filename);
    }
    // ----------------------------------------------
    // send to database-----------------
    console.log("final pasht----------------------------", finalFilePaths);
    try {
      const newProfile = await Profile.create({
        title,
        description,
        location,
        phone,
        rentorsale,
        earnest : +earnest,
        rentMoney : +rentMoney,
        realState,
        constructionDate,
        amenities,
        rules,
        category,
        price: +price,
        images: finalFilePaths,
        userId: new Types.ObjectId(user._id),
      });
      console.log(newProfile);

      return NextResponse.json(
        { message: "آگهی جدید اضافه شد" },
        { status: 201 }
      );
    } catch (error) {
      // delete images------------

      finalFilePaths.length &&
        finalFilePaths.map(async (deletedImage) => {
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
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "مشکلی در سرور پیش آمده است" },
      { status: 500 }
    );
  }
}

export async function PATCH(req) {
  try {
    await connectDB();
    let formData = await req.formData();
    console.log("formData", formData);

    const id = await formData.get("_id");
    const title = await formData.get("title");
    const location = await formData.get("location");
    const description = await formData.get("description");
    const realState = await formData.get("realState");
    const price = await formData.get("price");
    const rentorsale = await formData.get("rentorsale");
    const earnest = await formData.get("earnest");
    const rentMoney = await formData.get("rentMoney");
    const phone = await formData.get("phone");
    const constructionDate = await formData.get("constructionDate");
    const category = await formData.get("category");
    // const rules = await formData.get("rules");
    // const amenities = await formData.get("amenities");

      //rules
      const rules = [];
      let rindex = 0;
  
      while (formData.has(`rules-${rindex}`)) {
        const rule = await formData.get(`rules-${rindex}`);
        rules.push(rule);
        rindex++;
      }
      //amenities
      const amenities = [];
      let aindex = 0;
  
      while (formData.has(`amenities-${aindex}`)) {
        const amenity = await formData.get(`amenities-${aindex}`);
        amenities.push(amenity);
        aindex++;
      }
    console.log({
      id,
      title,
      location,
      description,
      realState,
      price,
      rentorsale,
      earnest,
      rentMoney,
      phone,
      constructionDate,
      rules,
      amenities
    });

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
    if (
      !id ||
      !title ||
      !location ||
      !description ||
      !phone ||
      !realState ||
      !rentorsale ||
      !constructionDate ||
      !category
    ) {
      return NextResponse.json(
        { error: "لطفا اطلاعات معتبر وارد کنید" },
        { status: 400 }
      );
    }
    const profile = await Profile.findOne({ _id: id });

    if (!profile) {
      return NextResponse.json(
        { message: "آگهی مورد نظر وجود ندارد" },
        { status: 404 }
      );
    }
    if (!user._id.equals(profile.userId)) {
      return NextResponse.json(
        { error: "دسترسی شما به این آگهی محدود شده است" },
        { status: 403 }
      );
    }
    //upload image ---------------------------------
    console.log(formData);
    const images = [];
    const prevImages = [];
    let index = 0;
    let finalFilePaths = [];

    while (formData.has(`images-${index}`)) {
      console.log("object", index);
      const image = await formData.get(`images-${index}`);
      if (isValidUrl(image)) {
        prevImages.push(image);
      } else {
        images.push(image);
      }
      index++;
    }
    console.log("new images-", images);
    console.log("new ssssss-", prevImages);

    for (const imgFile of images) {
      const buffer = Buffer.from(await imgFile.arrayBuffer());

      const pathDist = join(process.cwd(), "/public/images");
      const relativeUploadDir = `${imgFile.name}-${Date.now().toString()}`;
      const uploadDir = join(pathDist, relativeUploadDir);

      try {
        await stat(uploadDir);
      } catch (error) {
        if (error.code === "ENOENT") {
          await mkdir(uploadDir, { recursive: true });
        } else {
          console.error(
            "Error while trying to create directory when uploading a file",
            e
          );

          return NextResponse.json(
            { error: `Something went wrong.${error}` },
            { status: 500 }
          );
        }
      }
      // ----------
      const uniqueSuffix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
      const fileExtension = extname(imgFile.name);
      const originalFilename = imgFile.name.replace(/\.[^/.]+$/, "");
      const sanitizedFilename = sanitizeFilename(originalFilename);
      const filename = `${sanitizedFilename}_${uniqueSuffix}${fileExtension}`;
      await writeFile(`${uploadDir}/${filename}`, buffer);

      const finalFilePath =
        process.env.IMAGE_PATH + `${relativeUploadDir}/${filename}`;
      finalFilePaths.push(finalFilePath);
      console.log("finalFilePath : " + finalFilePath);
      console.log("filename : " + filename);
    }
    // remove deleted images========

    console.log("profileImage", prevImages);
    const deletedImages = [];
    const existingImages = [];
    profile.images.map((img) => {
      if (prevImages.includes(img)) {
        existingImages.push(img);
      } else {
        deletedImages.push(img);
      }
    });
    // ======================
    const deleteEmptyFoldersRecursively = function (folderPath) {
      // if (existsSync(folderPath)) {
      //   readdirSync(folderPath).forEach((file, index) => {
      //     const curPath = join(folderPath, file);
      //     if (lstatSync(curPath).isDirectory()) {
      //       // Recursive call for directories
      //       deleteEmptyFoldersRecursively(curPath);
      //     }
      //   });

      // Check if folder is empty after deleting all the files
      // if (fs.readdirSync(folderPath).length === 0) {
      rmdirSync(folderPath);
      console.log(`Folder ${folderPath} has been successfully deleted.`);
      // }
      // }
    };
    // ======================
    deletedImages.length &&
      deletedImages.map(async (deletedImage) => {
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

    // ----------------------------------------------
    // send to database-----------------
    console.log("deleted images", deletedImages);
    console.log("exist images", existingImages);
    profile.title = title;
    profile.description = description;
    profile.location = location;
    profile.phone = phone;
    profile.realState = realState;
    profile.constructionDate = constructionDate;
    profile.amenities = amenities;
    profile.category = category;
    profile.price = +price;
    profile.rentorsale = rentorsale;
    profile.earnest = +earnest;
    profile.rentMoney = +rentMoney;
    profile.images = existingImages.concat(finalFilePaths);
    profile.save();
    console.log("profileeeeeee", profile);
    return NextResponse.json({ message: "آگهی ویرایش شد" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "مشکلی در سرور پیش آمده است" },
      { status: 500 }
    );
  }
}
