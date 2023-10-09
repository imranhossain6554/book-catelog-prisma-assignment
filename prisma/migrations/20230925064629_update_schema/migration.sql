-- DropForeignKey
ALTER TABLE "books" DROP CONSTRAINT "books_category_id_fkey";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "profile_img" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "books" ADD CONSTRAINT "books_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
