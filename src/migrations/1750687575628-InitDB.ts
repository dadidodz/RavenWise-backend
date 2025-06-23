import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDB1750687575628 implements MigrationInterface {
    name = 'InitDB1750687575628'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "exercices" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "content" text NOT NULL, "deposit" text, "lessonId" integer)`);
        await queryRunner.query(`CREATE TABLE "lectures" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "content" text NOT NULL, "lessonId" integer)`);
        await queryRunner.query(`CREATE TABLE "lessons" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar(255) NOT NULL, "content" text, "estimated_duration" integer NOT NULL, "type" text NOT NULL, "chapterId" integer, CONSTRAINT "UQ_3dad32ba0ff20feee98b1b0c43d" UNIQUE ("title"))`);
        await queryRunner.query(`CREATE TABLE "chapters" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar(255) NOT NULL, "description" text, "courseId" integer, CONSTRAINT "UQ_02b640f9de4714070b5fd6c0240" UNIQUE ("title"))`);
        await queryRunner.query(`CREATE TABLE "courses" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar(255) NOT NULL, "description" text, "difficulty" text NOT NULL, "category" text NOT NULL, "image" varchar(255) NOT NULL, "is_published" boolean NOT NULL DEFAULT (0), CONSTRAINT "UQ_a01a7f0e38c6f16024d16058ab5" UNIQUE ("title"))`);
        await queryRunner.query(`CREATE TABLE "messages" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "text" text NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "authorClerkId" varchar NOT NULL, "publicationId" integer NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "publications" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar(255) NOT NULL, "description" text NOT NULL, "category" text NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "authorClerkId" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "users" ("clerkId" varchar PRIMARY KEY NOT NULL, "firstName" text NOT NULL, "lastName" text NOT NULL, "email" text NOT NULL, "imageUrl" text, "role" text NOT NULL DEFAULT ('free'), "created_at" datetime NOT NULL DEFAULT (datetime('now')), "hours_spent" integer NOT NULL DEFAULT (0))`);
        await queryRunner.query(`CREATE TABLE "quiz_answers" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "answer" text NOT NULL, "isCorrect" boolean NOT NULL DEFAULT (0), "quizId" integer)`);
        await queryRunner.query(`CREATE TABLE "quizzes" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "question" text NOT NULL, "lessonId" integer NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "users_courses" ("course_id" integer NOT NULL, "user_id" varchar NOT NULL, PRIMARY KEY ("course_id", "user_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7b0538c99652d7eb1c3ec9e170" ON "users_courses" ("course_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_b04ebfbec561e2e472e3e9fb25" ON "users_courses" ("user_id") `);
        await queryRunner.query(`CREATE TABLE "temporary_exercices" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "content" text NOT NULL, "deposit" text, "lessonId" integer, CONSTRAINT "FK_814227fe802aef196bd49975c43" FOREIGN KEY ("lessonId") REFERENCES "lessons" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_exercices"("id", "content", "deposit", "lessonId") SELECT "id", "content", "deposit", "lessonId" FROM "exercices"`);
        await queryRunner.query(`DROP TABLE "exercices"`);
        await queryRunner.query(`ALTER TABLE "temporary_exercices" RENAME TO "exercices"`);
        await queryRunner.query(`CREATE TABLE "temporary_lectures" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "content" text NOT NULL, "lessonId" integer, CONSTRAINT "FK_e2f671240ef4b44c7c289708d7f" FOREIGN KEY ("lessonId") REFERENCES "lessons" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_lectures"("id", "content", "lessonId") SELECT "id", "content", "lessonId" FROM "lectures"`);
        await queryRunner.query(`DROP TABLE "lectures"`);
        await queryRunner.query(`ALTER TABLE "temporary_lectures" RENAME TO "lectures"`);
        await queryRunner.query(`CREATE TABLE "temporary_lessons" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar(255) NOT NULL, "content" text, "estimated_duration" integer NOT NULL, "type" text NOT NULL, "chapterId" integer, CONSTRAINT "UQ_3dad32ba0ff20feee98b1b0c43d" UNIQUE ("title"), CONSTRAINT "FK_1067c75d93c6ce6408cd1ad156a" FOREIGN KEY ("chapterId") REFERENCES "chapters" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_lessons"("id", "title", "content", "estimated_duration", "type", "chapterId") SELECT "id", "title", "content", "estimated_duration", "type", "chapterId" FROM "lessons"`);
        await queryRunner.query(`DROP TABLE "lessons"`);
        await queryRunner.query(`ALTER TABLE "temporary_lessons" RENAME TO "lessons"`);
        await queryRunner.query(`CREATE TABLE "temporary_chapters" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar(255) NOT NULL, "description" text, "courseId" integer, CONSTRAINT "UQ_02b640f9de4714070b5fd6c0240" UNIQUE ("title"), CONSTRAINT "FK_becd2c25ed5b601e7a4466271c8" FOREIGN KEY ("courseId") REFERENCES "courses" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_chapters"("id", "title", "description", "courseId") SELECT "id", "title", "description", "courseId" FROM "chapters"`);
        await queryRunner.query(`DROP TABLE "chapters"`);
        await queryRunner.query(`ALTER TABLE "temporary_chapters" RENAME TO "chapters"`);
        await queryRunner.query(`CREATE TABLE "temporary_messages" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "text" text NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "authorClerkId" varchar NOT NULL, "publicationId" integer NOT NULL, CONSTRAINT "FK_58f5504d75d34dc479f622ff2af" FOREIGN KEY ("authorClerkId") REFERENCES "users" ("clerkId") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_6d3b41d2cf72896698f1d09f2ab" FOREIGN KEY ("publicationId") REFERENCES "publications" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_messages"("id", "text", "created_at", "authorClerkId", "publicationId") SELECT "id", "text", "created_at", "authorClerkId", "publicationId" FROM "messages"`);
        await queryRunner.query(`DROP TABLE "messages"`);
        await queryRunner.query(`ALTER TABLE "temporary_messages" RENAME TO "messages"`);
        await queryRunner.query(`CREATE TABLE "temporary_publications" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar(255) NOT NULL, "description" text NOT NULL, "category" text NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "authorClerkId" varchar NOT NULL, CONSTRAINT "FK_57f192cb5f64a58247f4c274b4f" FOREIGN KEY ("authorClerkId") REFERENCES "users" ("clerkId") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_publications"("id", "title", "description", "category", "created_at", "authorClerkId") SELECT "id", "title", "description", "category", "created_at", "authorClerkId" FROM "publications"`);
        await queryRunner.query(`DROP TABLE "publications"`);
        await queryRunner.query(`ALTER TABLE "temporary_publications" RENAME TO "publications"`);
        await queryRunner.query(`CREATE TABLE "temporary_quiz_answers" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "answer" text NOT NULL, "isCorrect" boolean NOT NULL DEFAULT (0), "quizId" integer, CONSTRAINT "FK_eafc7d80de07cc970a64e7ab34e" FOREIGN KEY ("quizId") REFERENCES "quizzes" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_quiz_answers"("id", "answer", "isCorrect", "quizId") SELECT "id", "answer", "isCorrect", "quizId" FROM "quiz_answers"`);
        await queryRunner.query(`DROP TABLE "quiz_answers"`);
        await queryRunner.query(`ALTER TABLE "temporary_quiz_answers" RENAME TO "quiz_answers"`);
        await queryRunner.query(`CREATE TABLE "temporary_quizzes" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "question" text NOT NULL, "lessonId" integer NOT NULL, CONSTRAINT "FK_eba9ff0775c843581aab6916b32" FOREIGN KEY ("lessonId") REFERENCES "lessons" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_quizzes"("id", "question", "lessonId") SELECT "id", "question", "lessonId" FROM "quizzes"`);
        await queryRunner.query(`DROP TABLE "quizzes"`);
        await queryRunner.query(`ALTER TABLE "temporary_quizzes" RENAME TO "quizzes"`);
        await queryRunner.query(`DROP INDEX "IDX_7b0538c99652d7eb1c3ec9e170"`);
        await queryRunner.query(`DROP INDEX "IDX_b04ebfbec561e2e472e3e9fb25"`);
        await queryRunner.query(`CREATE TABLE "temporary_users_courses" ("course_id" integer NOT NULL, "user_id" varchar NOT NULL, CONSTRAINT "FK_7b0538c99652d7eb1c3ec9e1708" FOREIGN KEY ("course_id") REFERENCES "courses" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_b04ebfbec561e2e472e3e9fb259" FOREIGN KEY ("user_id") REFERENCES "users" ("clerkId") ON DELETE CASCADE ON UPDATE NO ACTION, PRIMARY KEY ("course_id", "user_id"))`);
        await queryRunner.query(`INSERT INTO "temporary_users_courses"("course_id", "user_id") SELECT "course_id", "user_id" FROM "users_courses"`);
        await queryRunner.query(`DROP TABLE "users_courses"`);
        await queryRunner.query(`ALTER TABLE "temporary_users_courses" RENAME TO "users_courses"`);
        await queryRunner.query(`CREATE INDEX "IDX_7b0538c99652d7eb1c3ec9e170" ON "users_courses" ("course_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_b04ebfbec561e2e472e3e9fb25" ON "users_courses" ("user_id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_b04ebfbec561e2e472e3e9fb25"`);
        await queryRunner.query(`DROP INDEX "IDX_7b0538c99652d7eb1c3ec9e170"`);
        await queryRunner.query(`ALTER TABLE "users_courses" RENAME TO "temporary_users_courses"`);
        await queryRunner.query(`CREATE TABLE "users_courses" ("course_id" integer NOT NULL, "user_id" varchar NOT NULL, PRIMARY KEY ("course_id", "user_id"))`);
        await queryRunner.query(`INSERT INTO "users_courses"("course_id", "user_id") SELECT "course_id", "user_id" FROM "temporary_users_courses"`);
        await queryRunner.query(`DROP TABLE "temporary_users_courses"`);
        await queryRunner.query(`CREATE INDEX "IDX_b04ebfbec561e2e472e3e9fb25" ON "users_courses" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_7b0538c99652d7eb1c3ec9e170" ON "users_courses" ("course_id") `);
        await queryRunner.query(`ALTER TABLE "quizzes" RENAME TO "temporary_quizzes"`);
        await queryRunner.query(`CREATE TABLE "quizzes" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "question" text NOT NULL, "lessonId" integer NOT NULL)`);
        await queryRunner.query(`INSERT INTO "quizzes"("id", "question", "lessonId") SELECT "id", "question", "lessonId" FROM "temporary_quizzes"`);
        await queryRunner.query(`DROP TABLE "temporary_quizzes"`);
        await queryRunner.query(`ALTER TABLE "quiz_answers" RENAME TO "temporary_quiz_answers"`);
        await queryRunner.query(`CREATE TABLE "quiz_answers" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "answer" text NOT NULL, "isCorrect" boolean NOT NULL DEFAULT (0), "quizId" integer)`);
        await queryRunner.query(`INSERT INTO "quiz_answers"("id", "answer", "isCorrect", "quizId") SELECT "id", "answer", "isCorrect", "quizId" FROM "temporary_quiz_answers"`);
        await queryRunner.query(`DROP TABLE "temporary_quiz_answers"`);
        await queryRunner.query(`ALTER TABLE "publications" RENAME TO "temporary_publications"`);
        await queryRunner.query(`CREATE TABLE "publications" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar(255) NOT NULL, "description" text NOT NULL, "category" text NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "authorClerkId" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "publications"("id", "title", "description", "category", "created_at", "authorClerkId") SELECT "id", "title", "description", "category", "created_at", "authorClerkId" FROM "temporary_publications"`);
        await queryRunner.query(`DROP TABLE "temporary_publications"`);
        await queryRunner.query(`ALTER TABLE "messages" RENAME TO "temporary_messages"`);
        await queryRunner.query(`CREATE TABLE "messages" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "text" text NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "authorClerkId" varchar NOT NULL, "publicationId" integer NOT NULL)`);
        await queryRunner.query(`INSERT INTO "messages"("id", "text", "created_at", "authorClerkId", "publicationId") SELECT "id", "text", "created_at", "authorClerkId", "publicationId" FROM "temporary_messages"`);
        await queryRunner.query(`DROP TABLE "temporary_messages"`);
        await queryRunner.query(`ALTER TABLE "chapters" RENAME TO "temporary_chapters"`);
        await queryRunner.query(`CREATE TABLE "chapters" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar(255) NOT NULL, "description" text, "courseId" integer, CONSTRAINT "UQ_02b640f9de4714070b5fd6c0240" UNIQUE ("title"))`);
        await queryRunner.query(`INSERT INTO "chapters"("id", "title", "description", "courseId") SELECT "id", "title", "description", "courseId" FROM "temporary_chapters"`);
        await queryRunner.query(`DROP TABLE "temporary_chapters"`);
        await queryRunner.query(`ALTER TABLE "lessons" RENAME TO "temporary_lessons"`);
        await queryRunner.query(`CREATE TABLE "lessons" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar(255) NOT NULL, "content" text, "estimated_duration" integer NOT NULL, "type" text NOT NULL, "chapterId" integer, CONSTRAINT "UQ_3dad32ba0ff20feee98b1b0c43d" UNIQUE ("title"))`);
        await queryRunner.query(`INSERT INTO "lessons"("id", "title", "content", "estimated_duration", "type", "chapterId") SELECT "id", "title", "content", "estimated_duration", "type", "chapterId" FROM "temporary_lessons"`);
        await queryRunner.query(`DROP TABLE "temporary_lessons"`);
        await queryRunner.query(`ALTER TABLE "lectures" RENAME TO "temporary_lectures"`);
        await queryRunner.query(`CREATE TABLE "lectures" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "content" text NOT NULL, "lessonId" integer)`);
        await queryRunner.query(`INSERT INTO "lectures"("id", "content", "lessonId") SELECT "id", "content", "lessonId" FROM "temporary_lectures"`);
        await queryRunner.query(`DROP TABLE "temporary_lectures"`);
        await queryRunner.query(`ALTER TABLE "exercices" RENAME TO "temporary_exercices"`);
        await queryRunner.query(`CREATE TABLE "exercices" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "content" text NOT NULL, "deposit" text, "lessonId" integer)`);
        await queryRunner.query(`INSERT INTO "exercices"("id", "content", "deposit", "lessonId") SELECT "id", "content", "deposit", "lessonId" FROM "temporary_exercices"`);
        await queryRunner.query(`DROP TABLE "temporary_exercices"`);
        await queryRunner.query(`DROP INDEX "IDX_b04ebfbec561e2e472e3e9fb25"`);
        await queryRunner.query(`DROP INDEX "IDX_7b0538c99652d7eb1c3ec9e170"`);
        await queryRunner.query(`DROP TABLE "users_courses"`);
        await queryRunner.query(`DROP TABLE "quizzes"`);
        await queryRunner.query(`DROP TABLE "quiz_answers"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "publications"`);
        await queryRunner.query(`DROP TABLE "messages"`);
        await queryRunner.query(`DROP TABLE "courses"`);
        await queryRunner.query(`DROP TABLE "chapters"`);
        await queryRunner.query(`DROP TABLE "lessons"`);
        await queryRunner.query(`DROP TABLE "lectures"`);
        await queryRunner.query(`DROP TABLE "exercices"`);
    }

}
