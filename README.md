# โรงคั่ว — Coffee Shop Ordering System (React Hooks)

ระบบสั่งเครื่องดื่ม/เบเกอรี่ร้านกาแฟ พัฒนาด้วย React + Vite ตามข้อกำหนดของใบงาน
"การพัฒนาระบบร้านกาแฟด้วย React Hooks"

## วิธีติดตั้งและรัน

ต้องมี [Node.js](https://nodejs.org/) เวอร์ชัน 18 ขึ้นไป

```bash
# 1. ติดตั้ง dependencies
npm install

# 2. รันเซิร์ฟเวอร์สำหรับพัฒนา (dev server)
npm run dev
```

จากนั้นเปิดเบราว์เซอร์ไปที่ลิงก์ที่ปรากฏในเทอร์มินัล (ปกติคือ `http://localhost:5173`)

คำสั่งอื่นๆ ที่มีให้ใช้:

```bash
npm run build     # build โปรเจ็คสำหรับ production ไปที่ dist/
npm run preview   # เปิดดูผลลัพธ์ของ production build
```

## โครงสร้างโปรเจ็ค

```
coffee-shop/
├── discussion-questions.md   # คำตอบคำถามอภิปรายท้ายใบงาน
├── index.html
├── src/
│   ├── App.jsx                     # หน้าหลัก รวม state และ logic การกรองเมนู
│   ├── App.css                     # ดีไซน์ระบบทั้งหมด (โทนโรงคั่วกาแฟ)
│   ├── index.css                   # design tokens / theme variables
│   ├── main.jsx                    # entry point + ThemeProvider
│   ├── context/
│   │   └── ThemeContext.jsx        # useContext: ธีม Day Shift / Night Brew
│   ├── hooks/
│   │   ├── useLocalStorage.js      # custom hook: persist ค่าใดๆ ลง Local Storage
│   │   └── useCart.js              # custom hook: รวม logic ตะกร้าทั้งหมด
│   ├── reducers/
│   │   └── cartReducer.js          # useReducer: action ของตะกร้าสินค้า
│   ├── data/
│   │   └── menuData.js             # ข้อมูลเมนู (Coffee / Tea / Bakery / Dessert)
│   └── components/
│       ├── Header.jsx              # ป้ายร้าน + ปุ่มเปิดตะกร้า
│       ├── ThemeToggle.jsx         # ปุ่มสลับธีม
│       ├── SearchBar.jsx           # ค้นหาเมนู
│       ├── CategoryFilter.jsx      # แท็บกรองหมวดหมู่
│       ├── MenuList.jsx / MenuItem.jsx   # แสดงรายการเมนู (MenuItem ใช้ React.memo)
│       └── Cart.jsx / CartItem.jsx       # ตะกร้าสไตล์ใบเสร็จ (CartItem ใช้ React.memo)
```

## Hooks ที่ใช้ในโปรเจ็ค และจุดที่ใช้งาน

| Hook | ใช้ที่ไฟล์ | รายละเอียด |
| --- | --- | --- |
| `useState` | `App.jsx` | คำค้นหา, หมวดหมู่ที่เลือก, สถานะเปิด/ปิดตะกร้า |
| `useEffect` | `useLocalStorage.js`, `useCart.js`, `ThemeContext.jsx` | โหลด/บันทึกตะกร้าและธีมลง Local Storage, ปรับ `data-theme` บน `<html>` |
| `useContext` | `ThemeContext.jsx`, `ThemeToggle.jsx` | แชร์ธีม (Day/Night) ทั่วทั้งแอปโดยไม่ต้องส่ง props |
| `useReducer` | `cartReducer.js`, `useCart.js` | จัดการ action ของตะกร้า: เพิ่ม/ลบ/เพิ่มจำนวน/ลดจำนวน/ล้างตะกร้า |
| `useMemo` | `App.jsx` (กรองเมนู), `useCart.js` (ยอดรวม/จำนวนชิ้น) | คำนวณใหม่เฉพาะตอน dependency เปลี่ยนจริง |
| `useCallback` | `useCart.js`, `App.jsx` | คง reference ฟังก์ชันให้คงที่ ส่งต่อให้ `React.memo` component |
| Custom Hook | `useLocalStorage.js`, `useCart.js` | รวม logic ที่ใช้ซ้ำไว้เป็น hook เฉพาะของตัวเอง |

## ฟีเจอร์หลัก

- แสดงเมนูเครื่องดื่ม/เบเกอรี่/ของหวาน พร้อมรูป (emoji), ชื่อ, ราคา, หมวดหมู่
- ค้นหาเมนูตามชื่อ (ไทย/อังกฤษ) และกรองตามหมวดหมู่ (Coffee, Tea, Bakery, Dessert)
- เพิ่ม/ลบสินค้าในตะกร้า, เพิ่ม-ลดจำนวน, ล้างตะกร้า
- ตะกร้าสไตล์ "ใบเสร็จ" สรุปจำนวนชิ้นและยอดรวมแบบเรียลไทม์
- บันทึกตะกร้าและธีมไว้ใน Local Storage (รีเฟรชหน้าแล้วข้อมูลไม่หาย)
- สลับธีม Day Shift (สว่าง) / Night Brew (มืด)
- รองรับ responsive ตั้งแต่มือถือถึงจอกว้าง
