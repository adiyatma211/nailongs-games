# 🌸 Nailong Games - Taman Mawar Interaktif

🌹 **Permainan interaktif untuk menumbuhkan semangat Anin dengan merawat taman mawar Nailong!**

## 🎮 Cara Bermain

1. **Mulai Permainan** - Klik tombol "🌱 Mulai Bermain" untuk memulai petualangan berkebun
2. **Siram Tanaman** - Tekan dan tahan tombol 💧 air untuk menyiram tanaman
3. **Tahap Pertumbuhan** - Lihat mawar tumbuh dari biji hingga mekar sempurna:
   - 🌰 **Biji** - Permulaan perjalanan
   - 🌱 **Akar** - Akar mawar mulai tumbuh
   - 🥀 **Batang** - Batang muncul siap mekar
   - 🌹 **Mekar Sempurna** - Mawar mekar indah!

## 🎯 Gameplay Mechanics

- **Super Easy Mode** - Rentang siraman yang sangat mudah (10-90% safe zone)
- **Progressive Stages** - 4 tahap pertumbuhan dengan visual dan pesan unik
- **Interactive Watering** - Efek visual dan animasi saat menyiram
- **Background Music** - Musik relaksasi yang bisa di-toggle
- **Nailong Characters** - Karakter nailong mengambang dengan emoji lucu

## 🎵 Fitur Audio

- **Background Music** - Musik menenangkan untuk pengalaman bermain yang menyenangkan
- **Audio Controls** - Tombol 🔊/🔇 untuk mengatur musik
- **Volume Control** - Pengaturan volume yang dapat disesuaikan

## 💝 Ending Interaktif

Setelah mawar mekar sempurna, pemain akan melalui serangkaian pertanyaan interaktif:

1. **Feel Check** - "How do you feel right now? sedih? capek?"
2. **Confirmation** - "Udah better ni yakin?"
3. **Meet Request** - "Haris mau dong di kabarin lagi, ditelpon lagi"
4. **Happy Ending** - "Yeyyy Ayo Kita Mainnnnn Lagii"

## 📱 Fitur Teknis

- **Responsive Design** - Berjalan baik di desktop dan mobile
- **Touch Support** - Mendukung sentuhan untuk perangkat mobile
- **Progress Indicators** - Visual progress dots untuk tracking tahap
- **Confetti Effects** - Animasi confetti saat mawar mekar sempurna
- **Error Handling** - Error states yang user-friendly
- **WhatsApp Integration** - Auto-trigger WhatsApp API saat ending

## 🛠️ Teknologi

- **Frontend**: Next.js 14 dengan TypeScript
- **Styling**: CSS dengan animasi kustom
- **State Management**: React hooks (useState, useEffect, useRef)
- **API Integration**: WhatsApp API trigger untuk notifikasi

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm atau yarn

### Installation

```bash
# Clone repository
git clone https://github.com/username/nailong-games.git

# Navigate to project
cd nailong-games

# Install dependencies
npm install

# Run development server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser untuk melihat hasilnya.

### Build & Deploy

```bash
# Build untuk production
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
nailong-games/
├── public/
│   ├── assets/
│   │   ├── nailong-1.png
│   │   ├── nailong-2.png
│   │   └── nailong-no-bg.png
│   └── music/
│       └── bgm-music.mp3
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── whatsapp/
│   │   │       └── route.ts
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── styles/
│       └── Game.css
├── .claude/
├── package.json
├── tailwind.config.ts
└── README.md
```

## 🎨 Customization

### Mengubah Pesan Pesan
Edit `src/app/page.tsx` untuk mengubah:
- Pesan nailong
- Tahap pertumbuhan
- Ending dialog
- Progress requirements

### Mengubah Asset
- Ganti gambar nailong di `public/assets/`
- Ganti musik background di `public/music/`
- Edit CSS di `src/styles/Game.css`

## 📊 Game Progression

| Level | Water Required | Plant Stage | Message |
|-------|----------------|-------------|---------|
| 0 → 1 | 2 siraman | 🌰 Biji | "sudah siap untuk di tanam biji mawar" |
| 1 → 2 | 4 siraman | 🌱 Akar | "lanjuti menyiram yaa sedikit lagi tumbuh akar" |
| 2 → 3 | 6 siraman | 🥀 Batang | "sedikit lagi tumbuh batangnya" |
| 3 → 4 | 8 siraman | 🌹 Mekar | "mawarnya mekar sempurna!" |

## 🔧 Configuration

### Watering Mechanics
- **Safe Zone**: 10-90% progress bar
- **Progress Speed**: +2% per 50ms
- **Fail Messages**: Friendly feedback untuk terlalu cepat/lambat

### API Configuration
- **WhatsApp Trigger**: `/api/whatsapp` endpoint
- **External API**: `https://haris-pijam.gadingprint.com/fonnt.php`
- **Timeout**: 10 seconds

## 🐛 Troubleshooting

### Common Issues
1. **Musik tidak bermain** - Check browser audio policy
2. **Touch tidak bekerja** - Ensure proper touch event handling
3. **API call gagal** - Check external endpoint availability

### Debug Mode
Open browser console untuk melihat:
- Watering progress logs
- API call status
- State changes

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 License

This project is dedicated to bring happiness and positive vibes to Anin! 💕

## 💌 Special Thanks

Dibuat dengan ❤️ untuk Anin & Nailong
- Interactive gameplay untuk menumbuhkan semangat
- Happy vibes guaranteed!

---

*"Taman Nailong dimana semangat tumbuh bersama mawar" 🌹*
