# Firestore setup for Studium (step-by-step)

## 1. Enable Firestore and create the database

1. Open [Firebase Console](https://console.firebase.google.com/) and select your project (the one whose config is in `.env`).
2. In the left sidebar, click **Build** → **Firestore Database**.
3. Click **Create database**.
4. Choose a mode:
   - **Production mode** – only requests that pass your security rules are allowed. Use this when you have rules ready.
   - **Test mode** – read/write allowed for 30 days from any origin. Use only for quick local testing.
5. Pick a **location** for the database (e.g. `europe-west1` or `us-central1`). You cannot change it later.
6. Click **Enable**. Wait until the database is created and the Firestore console opens.

---

## 2. Deploy security rules

### Option A: Paste rules in the Firebase Console (no CLI)

1. In Firebase Console, go to **Build** → **Firestore Database**.
2. Open the **Rules** tab.
3. Delete the default rules in the editor.
4. Open `web/firestore.rules` in your project and copy its full contents.
5. Paste into the Rules editor in the console.
6. Click **Publish**. If you see warnings, fix any syntax errors and publish again.

### Option B: Deploy with Firebase CLI

1. Install the Firebase CLI (once per machine):
   ```bash
   npm install -g firebase-tools
   ```
2. Log in and select your project:
   ```bash
   firebase login
   firebase use <your-project-id>
   ```
   Use the same **Project ID** as in your `.env` (`VITE_FIREBASE_PROJECT_ID`).
3. From the **project root** (parent of `web`), run:
   ```bash
   firebase deploy --only firestore:rules
   ```
   If the CLI says “Firebase not initialized”, run:
   ```bash
   firebase init firestore
   ```
   When asked for a Firestore rules file, choose `web/firestore.rules` (or the path where you keep it). Then run `firebase deploy --only firestore:rules` again.

---

## 3. Create indexes (only when the app or console asks)

- Firestore will show an error in the browser **console** or in the Firebase Console when a query needs an index.
- In that error you’ll see a **link** like “Create index” or “Open in Console”. Click it – it opens the Firebase Console with the index pre-filled.
- Click **Create index** and wait until the index status is “Enabled”.

For Studium’s current queries:

- **Single-field**: We only query `decks` by `userId`. Firestore usually indexes single fields automatically, so you often **don’t** need to create an index for that.
- **Composite index**: If you later add a query that uses both `userId` and another field (e.g. `createdAt`), the console or the error message will tell you to create a composite index and will give you the link.

So in practice: **run the app, use Tutor / Plan / Flashcards**. If you see an index error, use the link in the error to create the index, then retry.

---

## 4. Quick checklist

- [ ] Firestore database created (production or test mode).
- [ ] Rules from `web/firestore.rules` pasted or deployed.
- [ ] Rules **Published** (Console) or **deploy** finished (CLI).
- [ ] App tested (sign in, send message, create plan, create deck). Create indexes only if an error appears.
