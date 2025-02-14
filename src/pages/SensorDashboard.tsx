<<<<<<< HEAD
export default SensorDashboard;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Menu } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const SensorDashboard = () => {
  const [temperatureData, setTemperatureData] = useState([]);
  const [vibrationData, setVibrationData] = useState([]);
  const [flowData, setFlowData] = useState([]); // ✅ 流量データのステート追加
  const [temperature, setTemperature] = useState<(number | null)[]>(Array(2).fill(null));
  const [vibration, setVibration] = useState<(number | null)[]>(Array(4).fill(null));
  const [flow, setFlow] = useState<number | null>(null); // ✅ 流量の現在値
  const backendUrl = "https://unozawa-backend.onrender.com";
  const deviceID = "unozawa";
=======
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Menu } from "lucide-react";

const SensorDashboard = () => {
  const [temperature, setTemperature] = useState<number[]>(Array(6).fill(null));
  const [vibration, setVibration] = useState<number[]>(Array(6).fill(null));
  const [flowRate, setFlowRate] = useState<number[]>(Array(2).fill(null));
  const backendUrl = "https://showarealtime.onrender.com"; // バックエンドのURL
>>>>>>> 90b9cf8 (Reinitialized Git repository after moving folder)

  useEffect(() => {
    const fetchData = async () => {
      try {
<<<<<<< HEAD
        const response = await axios.get(`${backendUrl}/api/data/${deviceID}`);
        const latestData = response.data;

        if (latestData) {
          const timestamp = new Date().toLocaleTimeString();
          setTemperatureData(prevData => [...prevData.slice(-11), { time: timestamp, temp1: latestData.tempC[0]}]);
          setVibrationData(prevData => [...prevData.slice(-11), { time: timestamp, vib1: latestData.vReal[0], vib2: latestData.vReal[1]}]);
          setFlowData(prevData => [...prevData.slice(-11), { time: timestamp, flow1: latestData.Flow1 }]); // ✅ 流量データを追加
          setTemperature([latestData.tempC[0]]);
          setVibration([latestData.vReal[0], latestData.vReal[1]]);
          setFlow(latestData.Flow1); // ✅ 現在の流量をセット
        }
=======
        const response = await axios.get(`${backendUrl}/api/data/SDsesnsor-demo1`);
        const latestData = response.data;

        setTemperature([
          latestData.tempC1, latestData.tempC2, latestData.tempC3,
          latestData.tempC4, latestData.tempC5, latestData.tempC6
        ]);

        setVibration([
          latestData.vReal1, latestData.vReal2, latestData.vReal3,
          latestData.vReal4, latestData.vReal5, latestData.vReal6
        ]);

        setFlowRate([
          latestData.Flow1, latestData.Flow2
        ]);

>>>>>>> 90b9cf8 (Reinitialized Git repository after moving folder)
      } catch (error) {
        console.error("データ取得に失敗しました:", error);
      }
    };

<<<<<<< HEAD
    fetchData();
    const interval = setInterval(fetchData, 5000);
=======
    fetchData(); // 初回データ取得
    const interval = setInterval(fetchData, 5000); // 5秒ごとに更新

>>>>>>> 90b9cf8 (Reinitialized Git repository after moving folder)
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
<<<<<<< HEAD
=======
      {/* Navbar */}
>>>>>>> 90b9cf8 (Reinitialized Git repository after moving folder)
      <nav className="w-full bg-white px-2 py-3 flex items-center border-b border-gray-200 gap-4">
        <Menu size={20} className="text-black" />
        <img src="/icons/showa_logo.png" alt="Showa Icon" className="h-6" />
      </nav>

<<<<<<< HEAD
      <div className="flex flex-col items-center justify-center p-4">
        <div className="px-6 py-6 bg-[#F3F4F6] rounded-lg mt-8 gap-6 w-full">
          
          {/* 温度センサ データ表示 */}
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

          {/* 振動センサ データ表示 */}
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

          {/* 流量センサ データ表示 */}
          <div className="bg-white rounded-md shadow p-4">
            <h2 className="text-lg font-semibold text-[#868DAA] text-center mb-4">流量センサ</h2>
            <div className="text-center w-full border border-gray-200 rounded-md p-4">
              <p className="text-[#868DAA]">流量センサ 1</p>
              <p className="text-lg font-bold text-gray-900">
                {flow !== null ? `${flow} L/min` : "データなし"}
              </p>
            </div>
          </div>

          {/* 温度センサ グラフ */}
          <div className="bg-white rounded-md shadow p-4">
            <h2 className="text-lg font-semibold text-[#868DAA] text-center mb-4">温度センサ (リアルタイム)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={temperatureData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="temp1" stroke="#FF0000" name="温度センサ1" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* 振動センサ グラフ */}
          <div className="bg-white rounded-md shadow p-4">
            <h2 className="text-lg font-semibold text-[#868DAA] text-center mb-4">振動センサ (リアルタイム)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={vibrationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="vib1" stroke="#FFA500" name="振動センサ1" />
                <Line type="monotone" dataKey="vib2" stroke="#008000" name="振動センサ2" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* 流量センサ グラフ */}
          <div className="bg-white rounded-md shadow p-4">
            <h2 className="text-lg font-semibold text-[#868DAA] text-center mb-4">流量センサ (リアルタイム)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={flowData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="flow1" stroke="#0000FF" name="流量センサ1" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <p className="text-[#8091A3] pt-10 text-sm">© 2006-2025 株式会社 ショウワ 無断転載禁止。</p>
=======
      {/* Content */}
      <div className="flex flex-col items-center justify-center p-4">
        <div className="flex flex-col items-center justify-center px-6 py-6 bg-[#F3F4F6] rounded-lg mt-8 gap-3">
          
          {/* 温度センサ */}
          <div className="px-4 pt-3 bg-white rounded-md shadow w-full">
            <h2 className="text-lg font-semibold text-[#868DAA] text-center mb-4">
              温度センサ
            </h2>
            {temperature.map((temp, index) => (
              <div key={index} className="text-center mb-4 w-full border border-gray-200 rounded-md p-4">
                <p className="text-[#868DAA]">温度センサ {index + 1}</p>
                <p className="text-lg font-bold text-gray-900">
                  {temp !== null ? `${temp} °C` : "データなし"}
                </p>
              </div>
            ))}
          </div>

          {/* 振動センサ */}
          <div className="px-4 pt-3 bg-white rounded-md shadow w-full">
            <h2 className="text-lg font-semibold text-[#868DAA] text-center mb-4">
              振動センサ
            </h2>
            {vibration.map((vib, index) => (
              <div key={index} className="text-center mb-4 w-full border border-gray-200 rounded-md p-4">
                <p className="text-[#868DAA]">振動センサ {index + 1}</p>
                <p className="text-lg font-bold text-gray-900">
                  {vib !== null ? `${vib} Hz` : "データなし"}
                </p>
              </div>
            ))}
          </div>

          {/* 水流センサ */}
          <div className="px-4 pt-3 bg-white rounded-md shadow w-full">
            <h2 className="text-lg font-semibold text-[#868DAA] text-center mb-4">
              水流センサ
            </h2>
            {flowRate.map((flow, index) => (
              <div key={index} className="text-center mb-4 w-full border border-gray-200 rounded-md p-4">
                <p className="text-[#868DAA]">水流センサ {index + 1}</p>
                <p className="text-lg font-bold text-gray-900">
                  {flow !== null ? `${flow} L/min` : "データなし"}
                </p>
              </div>
            ))}
          </div>

        </div>

        <p className="text-[#8091A3] pt-10 text-sm">
          © 2006-2025 株式会社 ショウワ 無断転載禁止。
        </p>
>>>>>>> 90b9cf8 (Reinitialized Git repository after moving folder)
      </div>
    </div>
  );
};

export default SensorDashboard;
