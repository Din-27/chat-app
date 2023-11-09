const { Client } = require('whatsapp-web.js');
const server = require('http').createServer();
const io = require('socket.io')(server, { cors: { origin: "*" } });
const fs = require('fs');
const QRCode = require('qrcode')


const SESSION_FILE_PATH = './session.json'; // Path untuk menyimpan session

let sessionData;

// Cek apakah ada file session yang tersimpan
if (fs.existsSync(SESSION_FILE_PATH)) {
    sessionData = require(SESSION_FILE_PATH);
}

const client = new Client({ session: sessionData });

io.on('connection', (socket) => {
    console.log('connected');
    client.on('qr', (qr) => {
        console.log('QR code akan ditampilkan di sini. Anda bisa memindai kode ini dengan aplikasi WhatsApp Anda.');
        QRCode.toDataURL(qr, function (err, url) {
            if (err) throw err
            io.emit('qr_code', url)
        })
    });
    client.on('authenticated', (session) => {
        console.log('Berhasil terautentikasi!');
        // Simpan session untuk autentikasi berikutnya
        fs.writeFileSync(SESSION_FILE_PATH, JSON.stringify(session));
    });

    client.on('ready', () => {
        console.log('Bot siap digunakan!');
    });

    client.initialize();
    socket.on("disconnect", () => {
        console.log('disconnected');
    });
})


server.listen(3000);