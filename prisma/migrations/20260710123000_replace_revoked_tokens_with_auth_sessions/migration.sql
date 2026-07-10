-- Replace the revocation list with persistent active sessions.
ALTER TABLE "RevokedToken" RENAME TO "AuthSession";

ALTER INDEX "RevokedToken_pkey" RENAME TO "AuthSession_pkey";
ALTER INDEX "RevokedToken_token_key" RENAME TO "AuthSession_token_key";
ALTER INDEX "RevokedToken_expiresAt_idx" RENAME TO "AuthSession_expiresAt_idx";

ALTER TABLE "AuthSession" ADD COLUMN "userId" TEXT;

DELETE FROM "AuthSession";

ALTER TABLE "AuthSession" ALTER COLUMN "userId" SET NOT NULL;

ALTER TABLE "AuthSession" ADD CONSTRAINT "AuthSession_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

CREATE INDEX "AuthSession_userId_idx" ON "AuthSession"("userId");
