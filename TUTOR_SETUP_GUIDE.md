# How to Develop a Local Shared Component in Tutor (Open edX)

This guide explains how to use this single local footer component (`frontend-component-footer-edx`) across multiple Open edX frontend applications (`learning`, `learner-dashboard`, `course-authoring`) running in Tutor/Docker.

## 🚀 The Goal
To have **ONE** central folder for the footer component on your host machine. When you edit files in this folder, the changes should instantly reflect in **ALL** your running frontend applications without rebuilding Docker images.

---

## 🛠️ The Setup

### 1. Mount the Local Folder into Docker
By default, Docker containers cannot see your host files. We must "mount" this folder into the containers.

**File:** `~/.local/share/tutor/env/dev/docker-compose.override.yml`

Create (or edit) this file to map your local path to a path inside the container (`/openedx/footer`).

```yaml
services:
  learning:
    volumes:
      - /home/binhbb/frontend-component-footer-edx:/openedx/footer
  
  learner-dashboard:
    volumes:
      - /home/binhbb/frontend-component-footer-edx:/openedx/footer

  course-authoring:
    volumes:
      - /home/binhbb/frontend-component-footer-edx:/openedx/footer
```

> **Note:** `/home/binhbb/frontend-component-footer-edx` is your HOST path. `/openedx/footer` is the CONTAINER path.
>
> ⚠️ **For Teammates:** If your partner is setting this up on their machine, they must change `/home/binhbb` to their own home directory path (e.g., `/home/username`).

### 2. Configure Webpack Alias (module.config.js)
Each MFE application needs to know that when it imports `@edx/frontend-component-footer`, it should look at `/openedx/footer`.

**IMPORTANT:** Use this "Smart Check" code to ensure it works for both **Local Dev** (Docker mount) and **Production** (npm install).

**File:** `frontend-app-learning/module.config.js` (and other apps)

```javascript
const fs = require('fs');

// Smart Check: 
// If /openedx/footer exists (Local Docker Mount), use it.
// If not (Production Build), fall back to node_modules via npm install.
const footerPath = '/openedx/footer';
const useLocalFooter = fs.existsSync(footerPath);

module.exports = {
  localModules: useLocalFooter ? [
    {
      moduleName: '@edx/frontend-component-footer',
      dir: footerPath,
      dist: 'src', 
    },
  ] : [],
};
```

### 3. Handle SCSS/Styles
The component should import its own SCSS in its entry file (e.g., `src/components/Footer.jsx` importing `./Footer.scss`). 

In your MFE's `src/App.scss`, **REMOVE** any manual imports of the footer styles to avoid conflicts or "File not found" errors.

---

## 📦 Production Deployment
For this to work in production (where Docker mounts usually stick to built images), you must add the footer repository as a dependency.

**File:** `package.json` (in each MFE)

```json
"dependencies": {
  "@edx/frontend-component-footer": "git+https://github.com/YOUR_ORG/frontend-component-footer-edx.git#main",
  ...
}
```

Run `npm install` to update `package-lock.json`.

---

## 🔄 How to Run (Local Dev)

1. **Stop the current session:**
   ```bash
   tutor dev stop
   ```

2. **Start with the mounted volumes:**
   ```bash
   tutor dev start -d
   ```

3. **Verify it works:**
   Enter a container and list the files:
   ```bash
   tutor dev exec learner-dashboard ls -la /openedx/footer
   ```
   You should see your component files.

---

## ⚡ Workflow
1. Edit code in `/home/binhbb/frontend-component-footer-edx/src/components/Footer.jsx`.
2. Save the file.
3. The changes automatically hot-reload in your browser for all 3 apps!
