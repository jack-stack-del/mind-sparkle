
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import MemoryGame from "./pages/MemoryGame";
import GamesHub from "./pages/GamesHub";
import SpeedTap from "./pages/games/SpeedTap";
import NumberOrder from "./pages/games/NumberOrder";
import PatternRecall from "./pages/games/PatternRecall";
import MatchFlip from "./pages/games/MatchFlip";
import SortItFast from "./pages/games/SortItFast";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/games" element={<GamesHub />} />
          <Route path="/games/memory" element={<MemoryGame />} />
          <Route path="/games/speedtap" element={<SpeedTap />} />
          <Route path="/games/numberorder" element={<NumberOrder />} />
          <Route path="/games/patternrecall" element={<PatternRecall />} />
          <Route path="/games/matchflip" element={<MatchFlip />} />
          <Route path="/games/sortitfast" element={<SortItFast />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
