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
        <div>{
            qr
                ? <img src={qr} alt="" />
                :
                <div role="status" class="space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center">
                    <div class="flex items-center justify-center w-[266px] h-[276px] bg-gray-300 rounded dark:bg-gray-700">
                        <svg class="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                        </svg>
                    </div>
                </div>
        }
        </div>
    )
}
