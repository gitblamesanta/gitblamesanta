import { useState, useEffect } from 'react';
import { Terminal, Github, Gift, AlertCircle, Lock, CheckCircle2, ArrowRight, MapPin, Code, Building } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './components/ui/alert';

const SANTA_WISHLIST_URL = 'https://participant-v2.my-secret-santa.org/lettre_PN';

// Messages rares qui peuvent apparaître aléatoirement
const RARE_MESSAGES = [
  "Found suspicious amount of cat videos in browser history...",
  "Warning: Coffee consumption levels above recommended limits",
  "Detected: Multiple tabs of StackOverflow open simultaneously",
  "Alert: Unusual amount of time spent on GitHub at 3 AM",
  "Notice: High frequency of 'git push --force' detected",
  "Observation: Remarkable collection of mechanical keyboards identified",
  "Log: User frequently searches 'how to exit vim'",
  "Warning: Excessive use of dark mode detected",
  "Alert: Multiple instances of 'console.log' found in production"
];

const NPM_MESSAGES = [
  "🎄 found 2024 packages in 1.5s",
  "🎁 searching for gift dependencies...",
  "⚠️ package 'coal' is deprecated",
  "✨ preparing presents",
  "🔍 analyzing gift compatibility",
  "📦 packaging joy@3.2.1"
];

const SecretSantaTerminal = () => {
  const [step, setStep] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [loadingDots, setLoadingDots] = useState('');
  const [command, setCommand] = useState('');
  const [matrixMode, setMatrixMode] = useState(false);
  const [glitchEffect, setGlitchEffect] = useState(false);
  const [rareMessage, setRareMessage] = useState('');
  const [showPrompt, setShowPrompt] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState([]);
  const [isSnowing, setIsSnowing] = useState(false);
  const [npmInstalling, setNpmInstalling] = useState(false);
  const [npmProgress, setNpmProgress] = useState(0);
  const [helpVisible, setHelpVisible] = useState(false);

  // Animation principale
  useEffect(() => {
    const timer = setInterval(() => {
      if (step < 12) {
        setStep(prev => prev + 1);
      } else {
        setShowPrompt(true);
      }
    }, 1500);

    return () => clearInterval(timer);
  }, [step]);

  // Effet curseur
  useEffect(() => {
    const cursorTimer = setInterval(() => {
      if (step < 12 || showPrompt) {
        setShowCursor(prev => !prev);
      } else {
        setShowCursor(false);
      }
    }, 500);

    return () => clearInterval(cursorTimer);
  }, [step, showPrompt]);

  // Points de chargement
  useEffect(() => {
    const loadingTimer = setInterval(() => {
      setLoadingDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);

    return () => clearInterval(loadingTimer);
  }, []);

  // Effet Matrix
  useEffect(() => {
    if (matrixMode) {
      const timer = setTimeout(() => {
        setMatrixMode(false);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [matrixMode]);

  // Effet Glitch
  useEffect(() => {
    if (glitchEffect) {
      const timer = setTimeout(() => {
        setGlitchEffect(false);
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [glitchEffect]);

  // Effet neige
  useEffect(() => {
    if (isSnowing) {
      const timer = setTimeout(() => {
        setIsSnowing(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [isSnowing]);

  // Effet npm install
  useEffect(() => {
    if (npmInstalling && npmProgress < NPM_MESSAGES.length) {
      const timer = setInterval(() => {
        setNpmProgress(prev => prev + 1);
        if (npmProgress === NPM_MESSAGES.length - 1) {
          setNpmInstalling(false);
          addToTerminal("ERR! 403 Forbidden: Packages can only be installed by Santa");
        }
      }, 800);
      return () => clearInterval(timer);
    }
  }, [npmInstalling, npmProgress]);

  // Sélection d'un message rare aléatoire
  useEffect(() => {
    if (step === 7 && Math.random() < 0.2) { // 20% de chance
      const randomMessage = RARE_MESSAGES[Math.floor(Math.random() * RARE_MESSAGES.length)];
      setRareMessage(randomMessage);
    }
  }, [step]);

  const addToTerminal = (message, type = 'output') => {
    setTerminalOutput(prev => [...prev, { type, content: message, id: Date.now() }]);
  };

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = command.trim().toLowerCase();
      addToTerminal(`$ ${command}`, 'input');

      switch (cmd) {
        case '/etc/init.d/christmas start':
          setIsSnowing(true);
          addToTerminal("🎄 Christmas daemon started successfully");
          addToTerminal("✨ Initializing snow particles...");
          addToTerminal("🎅 Santa services running on port 2024");
          break;

        case 'npm install presents':
          setNpmInstalling(true);
          setNpmProgress(0);
          break;

        case 'whoami':
          addToTerminal("=== Elf Identity Card ===");
          addToTerminal("🧝 Username: elf_" + Math.floor(Math.random() * 9000 + 1000));
          addToTerminal("📍 Location: Secret Workshop, North Pole");
          addToTerminal("☕ Coffee Level: CRITICAL - Refill needed");
          addToTerminal("🎁 Gifts Packed: " + Math.floor(Math.random() * 10000));
          addToTerminal("📊 Status: Slightly behind schedule (as always)");
          break;

        case 'help':
          setHelpVisible(true);
          addToTerminal("\n=== North Pole Terminal v2.24.12 ===");
          addToTerminal("Available commands:");
          addToTerminal("  whoami           - Display elf identifier");
          addToTerminal("  coffee --refill  - Request coffee refill");
          addToTerminal("  vim wishlist.txt - Edit wishlist (not recommended)");
          addToTerminal("  clear           - Clear terminal output");
          addToTerminal("\nFor more information, contact your local elf administrator");
          break;

        case 'coffee --refill':
          addToTerminal("☕ Initializing coffee maker...");
          setTimeout(() => addToTerminal("⚠️ ERROR: Coffee maker is in North Pole. User is too far away."), 500);
          setTimeout(() => addToTerminal("💡 Suggestion: Try asking your Secret Santa for a coffee machine!"), 1000);
          break;

        case 'vim wishlist.txt':
          addToTerminal("Opening vim...");
          setTimeout(() => addToTerminal("⚠️ WARNING: No one knows how to exit vim."), 500);
          setTimeout(() => addToTerminal("❌ Operation cancelled for your own safety."), 1000);
          setTimeout(() => addToTerminal("💡 Suggestion: Use the Secret Santa portal instead!"), 1500);
          break;

        case 'clear':
          setTerminalOutput([]);
          break;

        case 'git blame santa':
          setGlitchEffect(true);
          setTimeout(() => setMatrixMode(true), 1000);
          break;

        default:
          addToTerminal(`Command not found: ${command}`);
          addToTerminal("Type 'help' for available commands");
      }
      setCommand('');
    }
  };

  return (
    <div className={`min-h-screen bg-gray-900 text-gray-100 p-6 ${glitchEffect ? 'animate-glitch' : ''}`}>
      <div className="max-w-2xl mx-auto space-y-4">
        <div className="flex items-center space-x-2 mb-6">
          <Terminal className="w-6 h-6 text-green-500" />
          <Github className="w-6 h-6" />
          <h1 className="text-xl font-mono">North Pole Operations Terminal</h1>
        </div>

        <div className="bg-black/50 p-4 rounded-lg font-mono text-sm text-green-500 min-h-[500px] border border-gray-700">
          <div className="space-y-2">
            {step >= 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-white">$</span>
                <span>ssh secret-santa@north-pole.christmas -p 2024</span>
              </div>
            )}

            {step >= 1 && (
              <div className="flex items-center space-x-2">
                <Lock className="w-4 h-4" />
                <span>Password: ********</span>
              </div>
            )}

            {step >= 2 && (
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>Connection established. Encrypting channel using SANTAES-256...</span>
              </div>
            )}

            {step >= 3 && (
              <div className="text-yellow-400 pt-2">
                🎅 SECRET SANTA TASK MANAGER v2.24.12 🎅
                <br />
                =======================================
              </div>
            )}

            {step >= 4 && (
              <div className="text-blue-400">
                → Initializing connection to Santa&apos;s Global Registry{loadingDots}
              </div>
            )}

            {step >= 5 && (
              <div className="text-blue-400">
                → Scanning European Division{loadingDots}
              </div>
            )}

            {step >= 6 && (
              <div>
                <span className="text-blue-400">→ Company identified:</span>
                <div className="pl-4 mt-2 text-white">
                  <div className="flex items-center space-x-2">
                    <Building className="w-4 h-4" />
                    <span>Organization: Unlikely</span>
                  </div>
                  <div className="pl-6 text-gray-400 text-xs space-y-1">
                    <div>Type: Digital Agency</div>
                    <div>Specialization: E-commerce & Digital Experiences</div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3" />
                      <span>41 rue de Paradis, 75010 Paris, France</span>
                    </div>
                    <div>Notable Clients: Jean-Paul Gaultier, Jimmy Fairly, Eric Bompard, Martell</div>
                  </div>
                </div>
              </div>
            )}

            {step >= 7 && (
              <div className="mt-2">
                <span className="text-blue-400">→ Scanning employee database...</span>
                <br />
                <span className="text-white">Target located: @antoninlanglade</span>
              </div>
            )}

            {step >= 8 && (
              <div className="mt-4 text-white">
                <div>Personnel File:</div>
                <div className="pl-4 mt-2 space-y-1 text-xs">
                  <div className="flex items-center space-x-2">
                    <Code className="w-3 h-3" />
                    <span>GitHub: @antoninlanglade</span>
                  </div>
                  <div>Role: Chief Technical Officer (CTO)</div>
                  <div>Status: Active</div>
                  <div>Access Level: Administrator</div>
                  <div>Department: Technical Leadership</div>
                  <div>Project Oversight: All Active E-commerce Implementations</div>
                </div>
              </div>
            )}

            {step >= 9 && (
              <div className="mt-2">
                <span className="text-red-400">[CRITICAL ALERT]</span>
                <br />
                <span>Wishlist status verification initiated...</span>
                <br />
                <span className="text-yellow-300">Result: NO_WISHLIST_FOUND</span>
              </div>
            )}

            {step >= 10 && (
              <div className="mt-2 text-white">
                <div>Exception Details:</div>
                <div className="pl-4 mt-1 text-xs font-mono bg-red-950/30 p-2 rounded">
                  Error: WISHLIST_NOT_FOUND
                  <br />
                  at SantaRegistry.checkWishlist(employees.js:1225)
                  <br />
                  message: &quot;Unable to process gift allocation for @antoninlanglade&quot;
                </div>
              </div>
            )}

            {step >= 11 && (
              <div className="mt-4">
                <div className="text-yellow-400">SYSTEM RECOMMENDATION:</div>
                <div className="pl-4 mt-1 text-xs">
                  To ensure optimal gift matching and maintain Secret Santa protocol integrity,
                  immediate wishlist submission is required through the secure portal.
                </div>
              </div>
            )}

            {step >= 12 && (
              <div className="mt-4">
                <div className="text-red-400">URGENT ACTION REQUIRED:</div>
                <div className="mt-2 pl-4">
                  Please proceed to the secure wishlist submission portal:
                  <div className="mt-2">
                    <a
                      href={SANTA_WISHLIST_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-blue-400 hover:text-blue-300"
                    >
                      <Gift className="w-4 h-4" />
                      <span>Access Wishlist Portal</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            )}
            {step < 12 && showCursor && <span className="animate-pulse">_</span>}
          </div>
        </div>

        <Alert className="border-yellow-600/50 bg-yellow-600/10 text-yellow-200">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Security Notice</AlertTitle>
          <AlertDescription>
            This terminal session is monitored by North Pole Security Division. Any attempt to identify the Secret Santa agent will result in immediate placement on the naughty list and revocation of hot chocolate privileges.
          </AlertDescription>
        </Alert>

        {matrixMode && (
          <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 overflow-hidden">
            <div className="text-green-500 font-mono text-xl animate-matrix">
              <div className="animate-typing">ACCESS DENIED: SANTA IS BEYOND GIT&apos;S JURISDICTION</div>
              <div className="mt-4 text-sm animate-pulse">Nice try, @antoninlanglade...</div>
            </div>
          </div>
        )}

        {step >= 7 && rareMessage && (
          <div className="text-xs text-gray-500 italic mt-1 pl-8">
            [HIDDEN_LOG] {rareMessage}
          </div>
        )}

        {/* Terminal Output */}
        <div className="terminal-output mt-4 space-y-1">
          {terminalOutput.map(output => (
            <div
              key={output.id}
              className={`font-mono text-sm ${output.type === 'input' ? 'text-green-500' : 'text-gray-300'
                }`}
            >
              {output.content}
            </div>
          ))}
        </div>

        {/* Animation de neige */}
        {isSnowing && (
          <div className="snow-container fixed inset-0 pointer-events-none">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="snow-flake"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDuration: `${Math.random() * 3 + 2}s`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        )}

        {/* Animation npm install */}
        {npmInstalling && (
          <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-40">
            <div className="space-y-2 w-96">
              {NPM_MESSAGES.slice(0, npmProgress + 1).map((msg, i) => (
                <div key={i} className="text-sm font-mono text-green-500">
                  {msg}
                </div>
              ))}
            </div>
          </div>
        )}

        {showPrompt && (
          <div className="flex items-center space-x-2 mt-4">
            <span className="text-green-500">$</span>
            <input
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              onKeyPress={handleCommand}
              className="bg-transparent border-none outline-none text-green-500 font-mono flex-1"
              placeholder="Type your command..."
              spellCheck="false"
              autoComplete="off"
            />
            {showCursor && <span className="animate-pulse">_</span>}
          </div>
        )}

        <style>{`
        @keyframes glitch {
          0% { transform: translate(0) }
          20% { transform: translate(-2px, 2px) skew(3deg) }
          40% { transform: translate(-2px, -2px) skew(-3deg) }
          60% { transform: translate(2px, 2px) skew(-3deg) }
          80% { transform: translate(2px, -2px) skew(3deg) }
          100% { transform: translate(0) }
        }

        @keyframes matrix {
          0% { opacity: 0; transform: translateY(20px) }
          100% { opacity: 1; transform: translateY(0) }
        }

        @keyframes typing {
          from { width: 0 }
          to { width: 100% }
        }

        .animate-glitch {
          animation: glitch 0.3s infinite;
        }

        .animate-matrix {
          animation: matrix 1s ease-out;
        }

        .animate-typing {
          overflow: hidden;
          white-space: nowrap;
          animation: typing 2s steps(40, end);
        }

        .snow-flake {
          position: absolute;
          top: -10px;
          color: white;
          font-size: 1em;
          text-shadow: 0 0 5px #000;
          animation: fall linear infinite;
        }

        .snow-flake::after {
          content: "❄";
        }

        @keyframes fall {
          to {
            transform: translateY(100vh);
          }
        }
      `}</style>
      </div>
    </div>
  );
};

export default SecretSantaTerminal;