const { Client } = require('whatsapp-web.js');
const server = require('http').createServer();
const io = require('socket.io')(server, { cors: { origin: "*" } });
const fs = require('fs');
const QRCode = require('qrcode');
const { queryDB } = require('./config/MySQL.config');


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
    client.on('group_update', (contacts) => {
        console.log('group_update', contacts);
        // Handle contact list updates here
    });
    client.on('message', async (message) => {
        try {

            const info = client.info
            const checkUser = await queryDB(`select * from user where no_hp=?`,
                [info.wid.user || message.from.replace('@c.us', '')])
            if (checkUser.rows.length === 0) {
                await queryDB(`insert into user(username, no_hp) values(?,?)`,
                    [info.pushname || 'unknown', info.wid.user])
            }
            await queryDB(`insert into message(message, from, no_hp) values(?,?,?)`,
                [message.body, info.pushname, info.wid.user])
            const getStage = await queryDB(`select * from stages where message=?`,
                [message.body])
            if (getStage.rows.length > 0) {
                message.reply(getStage.rows[0].message);
            } else {
                const getStage = await queryDB(`select * from stages where id_message=0`)
                client.sendMessage(msg.from, getStage.rows[0].message);
            }
        } catch (error) {
            console.log(error);
        }
    });

    client.initialize();
    socket.on("disconnect", () => {
        console.log('disconnected');
    });
})


server.listen(3000);