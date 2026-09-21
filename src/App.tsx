import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { LandingPage } from "@/pages/LandingPage";
import { LandingOnePage } from "@/pages/LandingOnePage";
import { LoginPage } from "@/pages/LoginPage";
import { ChatScreen } from "@/components/chat/ChatScreen";
import { LegalPage } from "@/pages/LegalPage";
import { ScrollToHash } from "@/router/ScrollToHash";
import { getSession } from "@/auth/session";

/** المحادثة خلف الجلسة — زائرٌ بلا جلسة يُحوَّل إلى الدخول */
function RequireSession({ children }: { children: React.ReactNode }) {
  return getSession() ? <>{children}</> : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<LandingOnePage />} />
        {/* الهبوط السابق ذو الأقسام، محفوظٌ على مسارٍ جانبيّ */}
        <Route path="/classic" element={<LandingPage />} />
        <Route path="/bento" element={<Navigate to="/" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/privacy" element={<LegalPage />} />
        <Route path="/terms" element={<LegalPage />} />
        <Route
          path="/chat"
          element={
            <RequireSession>
              <ChatScreen />
            </RequireSession>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
