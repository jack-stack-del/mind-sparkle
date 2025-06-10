
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import MemoryGame from "./pages/MemoryGame";
import GamesHub from "./pages/GamesHub";
import About from "./pages/About";
import Insights from "./pages/Insights";
import SpeedTap from "./pages/games/SpeedTap";
import NumberOrder from "./pages/games/NumberOrder";
import PatternRecall from "./pages/games/PatternRecall";
import MatchFlip from "./pages/games/MatchFlip";
import SortItFast from "./pages/games/SortItFast";
import WordMemory from "./pages/games/WordMemory";
import ColorStroop from "./pages/games/ColorStroop";
import SimpleReaction from "./pages/games/SimpleReaction";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/games" element={
              <ProtectedRoute>
                <GamesHub />
              </ProtectedRoute>
            } />
            <Route path="/games/memory" element={
              <ProtectedRoute>
                <MemoryGame />
              </ProtectedRoute>
            } />
            <Route path="/games/speedtap" element={
              <ProtectedRoute>
                <SpeedTap />
              </ProtectedRoute>
            } />
            <Route path="/games/numberorder" element={
              <ProtectedRoute>
                <NumberOrder />
              </ProtectedRoute>
            } />
            <Route path="/games/patternrecall" element={
              <ProtectedRoute>
                <PatternRecall />
              </ProtectedRoute>
            } />
            <Route path="/games/matchflip" element={
              <ProtectedRoute>
                <MatchFlip />
              </ProtectedRoute>
            } />
            <Route path="/games/sortitfast" element={
              <ProtectedRoute>
                <SortItFast />
              </ProtectedRoute>
            } />
            <Route path="/games/wordmemory" element={
              <ProtectedRoute>
                <WordMemory />
              </ProtectedRoute>
            } />
            <Route path="/games/colorstroop" element={
              <ProtectedRoute>
                <ColorStroop />
              </ProtectedRoute>
            } />
            <Route path="/games/simplereaction" element={
              <ProtectedRoute>
                <SimpleReaction />
              </ProtectedRoute>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
