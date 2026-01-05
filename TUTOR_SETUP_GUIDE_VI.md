# Hướng dẫn phát triển Component dùng chung Local trong Tutor (Open edX)

Tài liệu này hướng dẫn cách sử dụng một component footer cục bộ, dùng chung (`frontend-component-footer-edx`) cho nhiều ứng dụng Open edX frontend (`learning`, `learner-dashboard`, `course-authoring`) chạy trên nền tảng Tutor/Docker.

## 🚀 Mục tiêu
Có **MỘT** thư mục trung tâm chứa mã nguồn footer trên máy thật (host machine). Khi bạn sửa code trong thư mục này, thay đổi sẽ cập nhật **NGAY LẬP TỨC** trên **TẤT CẢ** các ứng dụng đang chạy mà không cần build lại Docker image.

---

## 🛠️ Cài đặt

### 1. Mount thư mục Local vào Docker
Mặc định, các container Docker không thể nhìn thấy file trên máy của bạn. Chúng ta cần "mount" (gắn) thư mục này vào trong container.

**File cần sửa:** `~/.local/share/tutor/env/dev/docker-compose.override.yml`

Tạo (hoặc sửa) file này để map đường dẫn máy thật của bạn tới đường dẫn bên trong container (`/openedx/footer`).

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

> **Lưu ý:** `/home/binhbb/frontend-component-footer-edx` là đường dẫn trên máy **HOST** (máy thật). `/openedx/footer` là đường dẫn trong **CONTAINER**.
>
> ⚠️ **Dành cho thành viên nhóm:** Nếu bạn setup trên máy của mình, bạn bắt buộc phải đổi `/home/binhbb` thành đường dẫn thư mục home của bạn (ví dụ: `/home/username`).
> Để biết chính xác đường dẫn, mở terminal tại thư mục footer và gõ kệnh `pwd`.

### 2. Cấu hình Webpack Alias (module.config.js)
Mỗi ứng dụng MFE cần được cấu hình để khi import `@edx/frontend-component-footer`, nó sẽ biết tìm trong `/openedx/footer` thay vì tìm trong `node_modules`.

**File:** `frontend-app-learning/module.config.js` (và các app tương tự)

```javascript
module.exports = {
  localModules: [
    {
      moduleName: '@edx/frontend-component-footer',
      dir: '/openedx/footer', // 👈 Đọc từ đường dẫn đã mount trong Docker
      dist: 'src',            // 👈 Sử dụng folder 'src' để hỗ trợ hot-reloading
    },
  ],
};
```

### 3. Xử lý SCSS/Styles
Component nên tự import file SCSS của chính nó trong file code gốc (ví dụ: `src/components/Footer.jsx` import `./Footer.scss`). 

Trong file `src/App.scss` của các MFE, hãy **XÓA** bất kỳ dòng import thủ công nào để tránh xung đột hoặc lỗi "File not found".

```scss
// ❌ XÓA DÒNG NÀY
// @import "~@edx/frontend-component-footer/dist/_footer"; 

// ✅ NÊN LÀM
// (Không làm gì cả. Để component tự lo style của nó.)
```

---

## 🔄 Cách chạy

1. **Dừng session hiện tại:**
   ```bash
   tutor dev stop
   ```

2. **Khởi động lại với volume đã mount:**
   ```bash
   tutor dev start -d
   ```

3. **Kiểm tra hoạt động:**
   Vào trong container và liệt kê danh sách file:
   ```bash
   tutor dev exec learner-dashboard ls -la /openedx/footer
   ```
   Bạn sẽ thấy danh sách file của component hiện ra.

---

## ⚡ Quy trình làm việc (Workflow)
1. Sửa code tại `/home/binhbb/frontend-component-footer-edx/src/components/Footer.jsx`.
2. Lưu file (Ctrl + S).
3. Trình duyệt của bạn sẽ tự động reload và cập nhật thay đổi trên cả 3 ứng dụng!
