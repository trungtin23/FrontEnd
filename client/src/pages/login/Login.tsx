import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWebSocket } from '../../context/WebSocketContext';

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();
  const { webSocket, connectWebSocket } = useWebSocket();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (webSocket && webSocket.readyState === WebSocket.OPEN) {
      const loginData = {
        action: 'onchat',
        data: {
          event: 'LOGIN',
          data: {
            user: username,
            pass: password,
          },
        },
      };

      const JsonLogin = JSON.stringify(loginData);
      webSocket.send(JsonLogin);

      const handleWebSocketMessage = (event: MessageEvent) => {
        const message = JSON.parse(event.data);
        if (message.status === 'success') {
          alert('Đăng nhập thành công!');
          navigate('/home');
        } else {
          alert('Đăng nhập thất bại! Vui lòng kiểm tra lại thông tin đăng nhập.');
        }
      };

      const handleWebSocketError = (error: Event) => {
        console.error('WebSocket error:', error);
        alert('Lỗi kết nối WebSocket!');
      };

      webSocket.addEventListener('message', handleWebSocketMessage);
      webSocket.addEventListener('error', handleWebSocketError);

      return () => {
        webSocket.removeEventListener('message', handleWebSocketMessage);
        webSocket.removeEventListener('error', handleWebSocketError);
      };
    } else {
      alert('Lỗi kết nối WebSocket!');
      connectWebSocket(); // Reconnect WebSocket if not connected
    }
  };

  return (
      <div className="bg-gray-100 flex items-center justify-center h-screen">
        <div className="w-full max-w-xs">
          <h1 className="text-center font-extrabold text-3xl mb-8 text-black">ĐĂNG NHẬP</h1>
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
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
                Đăng nhập
              </button>
              <button
                  className="bg-slate-400 w-28 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
              >
                <a href="/register">Đăng ký</a>
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

export default Login;
