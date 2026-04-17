import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { ModalProvider } from "./lib/modal-context";
import { ContactModal } from "./components/ContactModal";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Services } from "./components/Services";
import { Features } from "./components/Features";
import { Pricing } from "./components/Pricing";
import { Portfolio } from "./components/Portfolio";
import { Testimonials } from "./components/Testimonials";
import { FAQ } from "./components/FAQ";
import { CTABanner } from "./components/CTABanner";
import { Footer } from "./components/Footer";
import { ChatWidget } from "./components/ChatWidget";
import Impressum from "./pages/Impressum";
import Datenschutz from "./pages/Datenschutz";
import Agb from "./pages/Agb";

const queryClient = new QueryClient();

function Home() {
  return (
    <div className="min-h-[100dvh] flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <About />
        <Services />
        <Features />
        <Pricing />
        <Portfolio />
        <Testimonials />
        <FAQ />
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
}

function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[100dvh] flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/impressum">
        <LegalLayout><Impressum /></LegalLayout>
      </Route>
      <Route path="/datenschutz">
        <LegalLayout><Datenschutz /></LegalLayout>
      </Route>
      <Route path="/agb">
        <LegalLayout><Agb /></LegalLayout>
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ModalProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
            <ContactModal />
            <ChatWidget />
          </WouterRouter>
          <Toaster />
        </ModalProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
