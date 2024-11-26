// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?
// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init

datasource db {
provider = "postgresql"
url = env("DATABASE_URL")
directUrl = env("DIRECT_URL")
}

generator client {
provider = "prisma-client-js"
}

model User {
id String @id
name String @unique
password String @unique
email String @unique
emailVerified Boolean
image String?
createdAt DateTime
updatedAt DateTime

meals Meal[]
session Session[]
account Account[]
}

model Meal {
id Int @id @default(autoincrement())
name String @unique
image String?
comments String?
notes String?
ingredients String?
timeToCook String?

categoryId Int
userId String

category MealCategory @relation(fields: [categoryId], references: [id])
user User @relation(fields: [userId], references: [id])
}

model MealCategory {
id Int @id @default(autoincrement())
name String @unique
Meal Meal[]
}

model Session {
id String @id
expiresAt DateTime
ipAddress String?
userAgent String?
userId String
user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model Account {
id String @id
accountId String
providerId String
userId String
user User @relation(fields: [userId], references: [id], onDelete: Cascade)
accessToken String?
refreshToken String?
idToken String?
expiresAt DateTime?
password String?
}

model Verification {
id String @id
identifier String
value String
expiresAt DateTime
}
