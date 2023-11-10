import React, { useState } from 'react'
import { io } from "socket.io-client";
const socket = io('http://192.168.21.25:3001');

export default function QrCode() {

    const [qr, setQr] = useState('')

    socket.on('qr_code', (data) => {
        console.log(data);
        setQr(data)
        // QRCode.toCanvas(canvas, data, function (error) {
        //     if (error) console.error(error)
        //     console.log('success!');
        // })
        // dataDisplay1.textContent = `NO order: ${data}`;
        // dataDisplay2.textContent = `Status: ${newData.status}`;
        // dataDisplay3.textContent = `Sts: ${newData.sts}`;
        // bg.style.backgroundColor = newData.color;
    });

    socket.on('disconnect', () => {
        console.log('Disconnected from Socket.io');
    });
    return (
        <div>
            <img src={qr} alt="" />
        </div>
    )
}
