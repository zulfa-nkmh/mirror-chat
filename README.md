**ARUNIKA MC (Mirror Chat)**

ARUNIKA MC (MirrorChat) adalah aplikasi web chat AI Twin berbasis Next.js dengan antarmuka modern, responsif, dan interaktif. Aplikasi ini menampilkan percakapan dengan AI sekaligus menyediakan fitur membership.

Dirancang sebagai cermin bagi perjalanan karier dan pengembangan diri, ARUNIKA MC membantu pengguna merefleksi pengalaman, mengembangkan kemampuan, dan menghadapi tantangan pribadi melalui percakapan digital.

Pengguna dapat membagikan pemikiran, tantangan, atau tujuan, serta menerima panduan, refleksi, dan saran mentor yang dipersonalisasi. Setiap interaksi mendorong penguasaan keterampilan, penyelesaian hambatan, dan pengelolaan perjalanan karier secara lebih efektif.

AI Twin ini hadir untuk mendengarkan, merefleksikan, dan membimbing dengan dukungan konsisten dan objektif.
_______________
**USER FLOW:**
1. User harus sudah melakukan skillmatch terlebih dahulu agar data hasil analisis Skillmatch dapat di sinkronisasikan dengan personalisasi MirrorChat.
2. User Sign-in menggunakan account yang sama saat skillmatch.
3. User langsung di arahkan pada ChatPage/ChatBox yang telah memiliki sinkronisasi data userId.
4. User bisa langsung melakukan chat interaktif dengan AI Twin dan memanfaatkan fitur-fitur yang ada di ChatPage/ChatBox (Chat Box,Account,Search,Library dan History)
5. User akan mendapatkan rekomendasi mentor yang sudah di personalisasi (berdasarkan userId) saat mengalami kebingungan maksimal 5 kali ketika berinteraksi dengan AI Twin, dengan kriteria telah menunjukkan kata- kata "confusion" seperti "bingung", "stuck", "deadlock", "mentok",dan "buntu" dalam percakapan.

___Contoh Simulasi___
Sign-in dengan account berikut :
__________
"email": "anakusuma@gmail.com",
"password": "123456",
__________
"email": "yasmin@gmail.com",
"password": "123458"
__________
"email": "citradewi@gmail.com",
"password": "123459",

________________

**FITUR UTAMA**

Next.js – Framework React untuk rendering server-side dan routing otomatis.

Tailwind CSS – Styling utility-first untuk desain yang cepat dan responsif.

Zustand - state management untuk mengatur percakapan, history chat, dan status bot.

context - state management untuk mengelola login dan data user.

ShadCN UI / Radix UI – Komponen UI.

Lucide React Icons – Ikon modern untuk UI interaktif.

Responsive Layout – Mobile-first, grid/flex untuk penyesuaian ukuran layar.

Chat Interaktif – Menampilkan history chat, indikator mengetik, dan avatar user/bot.

_______________________
**INSTALASI**

1. Instal dependensi:

npm install 

2. Jalankan server pengembangan:

npm run dev 
Buka http://localhost:3000 
untuk melihat aplikasi.

_________________
**👩‍💻 Author : Zulfatun Nikmah GitHub: @zulfa-nkmh**

**📜 Lisensi**

**MIT License – bebas digunakan & dimodifikasi dengan menyertakan atribusi.
MIT License**

Copyright (c) 2025 Zulfa-nkmh

MIT License

Copyright (c) 2025 Zulfa NKMH

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
