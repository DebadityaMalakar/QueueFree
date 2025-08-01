import { useEffect, useState } from 'react';

const Toast = ({ message, type = 'info', duration = 3000, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const typeStyles = {
    success: 'bg-emerald-100 border-emerald-400 text-emerald-800',
    error: 'bg-red-100 border-red-400 text-red-800',
    warning: 'bg-amber-100 border-amber-400 text-amber-800',
    info: 'bg-blue-100 border-blue-400 text-blue-800',
  };

  if (!visible) return null;

  return (
    <div className={`fixed bottom-4 right-4 border rounded-md p-4 shadow-md ${typeStyles[type]} z-50`}>
      <div className="flex items-center">
        <div className="flex-1">
          <p className="font-medium">{message.title}</p>
          {message.description && (
            <p className="text-sm mt-1">{message.description}</p>
          )}
        </div>
        <button 
          onClick={() => {
            setVisible(false);
            onClose();
          }}
          className="ml-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const showToast = (message, options = {}) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, ...options }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return { toasts, showToast, removeToast };
};

export const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div className="fixed bottom-4 right-4 space-y-2 z-50">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

export default Toast;