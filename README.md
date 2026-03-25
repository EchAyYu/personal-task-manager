# Personal Task Manager

Ứng dụng quản lý công việc cá nhân được xây dựng bằng React và Vite. Cho phép người dùng thêm, sửa, xóa, tìm kiếm và lọc công việc, với cảnh báo deadline và thống kê nhanh.

## Tính năng

- **Thêm công việc**: Tạo công việc mới với tiêu đề, mô tả và deadline.
- **Sửa/Xóa công việc**: Chỉnh sửa hoặc xóa công việc hiện có.
- **Tìm kiếm**: Tìm kiếm công việc theo tiêu đề.
- **Lọc**: Lọc công việc theo trạng thái (Tất cả, Đang làm, Hoàn thành).
- **Lưu trữ**: Lưu dữ liệu vào localStorage của trình duyệt.
- **Cảnh báo deadline**: Hiển thị cảnh báo cho công việc sắp deadline hoặc quá hạn.
- **Thống kê**: Hiển thị số lượng công việc theo trạng thái.
- **Giao diện responsive**: Tương thích với các thiết bị di động và máy tính.

## Công nghệ sử dụng

- **React 19**: Framework JavaScript cho giao diện người dùng.
- **Vite**: Công cụ build nhanh cho phát triển frontend.
- **CSS thuần**: Styling không sử dụng framework CSS bên ngoài.
- **localStorage**: Lưu trữ dữ liệu phía client.
- **ESLint**: Công cụ linting cho mã JavaScript/React.

## Hướng dẫn cài đặt và chạy local

### Yêu cầu hệ thống

- Node.js (phiên bản 16 trở lên)
- npm hoặc yarn

### Các bước cài đặt

1. **Clone repository**:

   ```bash
   git clone https://github.com/username/personal-task-manager.git
   cd personal-task-manager
   ```

2. **Cài đặt dependencies**:

   ```bash
   npm install
   ```

3. **Chạy ứng dụng ở chế độ phát triển**:

   ```bash
   npm run dev
   ```

   Ứng dụng sẽ chạy tại `http://localhost:5173` (hoặc cổng khác nếu 5173 bị chiếm).

4. **Build cho production** (tùy chọn):

   ```bash
   npm run build
   npm run preview
   ```

5. **Linting** (kiểm tra mã):
   ```bash
   npm run lint
   ```

## Giải thích các quyết định kỹ thuật

### Lựa chọn React và Vite

- **React**: Được chọn vì là thư viện phổ biến cho việc xây dựng giao diện người dùng động. Với React 19, chúng ta có các cải tiến về performance và developer experience. Ứng dụng này là Single Page Application (SPA), phù hợp với React để quản lý state và render component.

- **Vite**: Công cụ build nhanh hơn so với Create React App, đặc biệt cho các dự án nhỏ. Vite hỗ trợ Hot Module Replacement (HMR) tốt, giúp phát triển nhanh chóng.

### Lưu trữ dữ liệu với localStorage

- Vì đây là ứng dụng cá nhân đơn giản, không yêu cầu chia sẻ dữ liệu giữa nhiều người dùng, chúng ta sử dụng localStorage để lưu trữ dữ liệu phía client. Điều này giúp ứng dụng hoạt động offline và không cần backend server.

- Trong đề bài không chỉ rõ về backend, nên quyết định này giúp triển khai nhanh và đơn giản. Tuy nhiên, localStorage có hạn chế về dung lượng và không an toàn cho dữ liệu nhạy cảm.

### CSS thuần thay vì framework

- Sử dụng CSS thuần để giữ cho dự án nhẹ và không phụ thuộc vào framework bên ngoài. Điều này giúp kiểm soát styling tốt hơn và tránh overhead của các framework như Tailwind CSS (mặc dù README cũ đề cập, nhưng thực tế không sử dụng).

- Các component được style riêng biệt trong file CSS tương ứng, giúp tổ chức mã nguồn rõ ràng.

### Cấu trúc dự án

- **Components**: Chia nhỏ UI thành các component tái sử dụng như TaskForm, TaskList, etc.
- **Hooks**: Sử dụng custom hook `useTasks` để quản lý logic state của tasks.
- **Utils**: Các hàm utility cho logic nghiệp vụ như tạo ID, kiểm tra deadline, thống kê.
- **Styles**: CSS riêng cho từng component.

### Xử lý deadline và cảnh báo

- Sử dụng JavaScript Date để so sánh deadline với thời gian hiện tại.
- Hiển thị cảnh báo cho công việc quá hạn hoặc sắp deadline (trong 24 giờ).
- Không sử dụng thư viện bên ngoài cho việc này để giữ đơn giản.

## Những điểm sẽ cải thiện nếu có thêm thời gian

1. **Backend và Database**: Thêm server-side để lưu trữ dữ liệu an toàn hơn, cho phép chia sẻ và đồng bộ hóa giữa nhiều thiết bị.

2. **Authentication**: Thêm đăng nhập/đăng ký để quản lý công việc cá nhân cho nhiều người dùng.

3. **Notifications**: Gửi thông báo push hoặc email khi công việc sắp deadline.

4. **Testing**: Thêm unit tests và integration tests với Jest và React Testing Library để đảm bảo chất lượng mã.

5. **State Management**: Nếu ứng dụng phức tạp hơn, có thể sử dụng Redux hoặc Context API nâng cao.

6. **UI/UX cải tiến**: Thêm animations, dark mode, và cải thiện responsive design.

7. **API Integration**: Kết nối với calendar APIs như Google Calendar để đồng bộ deadline.

8. **Performance**: Lazy loading components, memoization để tối ưu hóa render.

9. **Accessibility**: Cải thiện a11y với ARIA labels và keyboard navigation.

10. **Deployment**: Thiết lập CI/CD pipeline và deploy lên Vercel/Netlify.

## Đóng góp

Nếu bạn muốn đóng góp, hãy fork repository và tạo pull request. Đảm bảo chạy `npm run lint` trước khi commit.

## Giấy phép

Dự án này sử dụng giấy phép MIT.
