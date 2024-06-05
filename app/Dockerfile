# ใช้ node image จาก Docker Hub
FROM node:14

# ตั้งค่าชื่อ directory สำหรับ application
WORKDIR /usr/src/app

# คัดลอก package.json และ package-lock.json ไปที่ directory ของ application
COPY package*.json ./

# ติดตั้ง dependencies ตามที่ระบุใน package.json
RUN npm install

# คัดลอกไฟล์ทั้งหมดของ application ไปที่ directory ของ application
COPY . .

# ประกาศ port ที่จะ expose
EXPOSE 3000

# รันคำสั่งเพื่อเริ่ม application
CMD [ "node", "main.js" ]
