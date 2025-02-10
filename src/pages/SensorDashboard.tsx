import React, { useState, useEffect } from "react";
import axios from "axios";
import { Menu } from "lucide-react";

const SensorDashboard = () => {
  const [temperature, setTemperature] = useState<(number | null)[]>(Array(2).fill(null)); // 温度センサ2つ
  const [vibration, setVibration] = useState<(number | null)[]>(Array(4).fill(null)); // 振動センサ4つ
  const backendUrl = "https://showarealtime.onrender.com"; // バックエンドのURL
  const deviceID = "takahashigarilei"; // デバイスID

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/data/${deviceID}`);
        const latestData = response.data;

        if (latestData) {
          // 🔹 tempC1, tempC2 のみ取得
          setTemperature([latestData.tempC[0], latestData.tempC[1]]);

          // 🔹 vReal1 ～ vReal4 のみ取得
          setVibration([latestData.vReal[0], latestData.vReal[1], latestData.vReal[2], latestData.vReal[3]]);
        }
      } catch (error) {
        console.error("データ取得に失敗しました:", error);
      }
    };

    fetchData(); // 初回データ取得
    const interval = setInterval(fetchData, 5000); // 5秒ごとに更新

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navbar */}
      <nav className="w-full bg-white px-2 py-3 flex items-center border-b border-gray-200 gap-4">
        <Menu size={20} className="text-black" />
        <img src="/icons/showa_logo.png" alt="Showa Icon" className="h-6" />
      </nav>

      {/* Content */}
      <div className="flex flex-col items-center justify-center p-4">
        <div className="px-6 py-6 bg-[#F3F4F6] rounded-lg mt-8 gap-6 w-full">
          
          {/* 温度センサ */}
          <div className="bg-white rounded-md shadow p-4">
            <h2 className="text-lg font-semibold text-[#868DAA] text-center mb-4">温度センサ</h2>
            <div className="flex flex-row justify-center gap-4">
              {temperature.map((temp, index) => (
                <div key={index} className="text-center w-1/4 border border-gray-200 rounded-md p-4">
                  <p className="text-[#868DAA]">温度センサ {index + 1}</p>
                  <p className="text-lg font-bold text-gray-900">
                    {temp !== null ? `${temp} °C` : "データなし"}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 振動センサ */}
          <div className="bg-white rounded-md shadow p-4">
            <h2 className="text-lg font-semibold text-[#868DAA] text-center mb-4">振動センサ</h2>
            <div className="flex flex-row justify-center gap-4">
              {vibration.map((vib, index) => (
                <div key={index} className="text-center w-1/4 border border-gray-200 rounded-md p-4">
                  <p className="text-[#868DAA]">振動センサ {index + 1}</p>
                  <p className="text-lg font-bold text-gray-900">
                    {vib !== null ? `${vib} Hz` : "データなし"}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        <p className="text-[#8091A3] pt-10 text-sm">
          © 2006-2025 株式会社 ショウワ 無断転載禁止。
        </p>
      </div>
    </div>
  );
};

export default SensorDashboard;
