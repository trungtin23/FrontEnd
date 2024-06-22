import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWebSocket } from '../../context/WebSocketContext';

interface RegisterProps {}

const Register: React.FC<RegisterProps> = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();
  const { webSocket, connectWebSocket } = useWebSocket();

  useEffect(() => {
    connectWebSocket();
  }, [connectWebSocket]);

  const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (webSocket && webSocket.readyState === WebSocket.OPEN) {
      const registerData = {
        action: 'onchat',
        data: {
          event: 'REGISTER',
          data: {
            user: username,
            pass: password,
          },
        },
      };
      const JsonRegister = JSON.stringify(registerData);
      console.log('Chuỗi JSON register:', JsonRegister);
      webSocket.send(JsonRegister);

      webSocket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        console.log('Received message:', message);
        if (message.status === 'success') {
          // Đăng ký thành công
          alert('Đăng ký thành công!');
          navigate('/login');
        } else {
          // Đăng ký thất bại
          alert('Đăng ký thất bại! Vui lòng kiểm tra lại thông tin.');
          webSocket.close();
        }
      };

      webSocket.onerror = (error) => {
        console.error('WebSocket error:', error);
        alert('Lỗi kết nối WebSocket!');
      };
    } else {
      alert('Lỗi kết nối WebSocket!');
    }
  };

  return (
      <div className="bg-gray-100 flex items-center justify-center h-screen">
        <div className="w-full max-w-xs">
          <h1 className="text-center font-extrabold text-3xl mb-8 text-black">ĐĂNG KÝ</h1>
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleRegister}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Tài khoản
              </label>
              <input
                  className="shadow bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Mật khẩu
              </label>
              <input
                  className="shadow bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="**************"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
              >
                Đăng ký
              </button>
              <button
                  className="bg-slate-400 w-28 hover:bg-blue-700 text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline"
                  type="button"
              >
                <a href="/login">Đăng nhập</a>
              </button>
            </div>
          </form>
          <p className="text-center text-gray-500 text-xs">
            &copy;Lập trình FE-2024- Nhóm 4.
          </p>
        </div>
      </div>
  );
};

export default Register;
