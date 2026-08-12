import { motion } from 'motion/react';
import { 
  MessageSquare, 
  Route, 
  Zap, 
  Code2, 
  Play, 
  CheckCircle2, 
  BrainCircuit,
  Search,
  Wrench,
  ShieldCheck,
  Database,
  ArrowRight
} from 'lucide-react';

const FlowNode = ({ 
  label, 
  content, 
  icon: Icon, 
  color = "sky",
  delay = 0,
  glow = false
}: {
  label: string;
  content: string;
  icon: any;
  color?: "sky" | "emerald" | "amber" | "purple" | "rose" | "cyan" | "zinc";
  delay?: number;
  glow?: boolean;
}) => {
  const colorMap = {
    sky: { text: "text-sky-400", bg: "bg-sky-500/10", border: "border-sky-500/20", shadow: "shadow-sky-500/10" },
    emerald: { text: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20", shadow: "shadow-emerald-500/10" },
    amber: { text: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20", shadow: "shadow-amber-500/10" },
    purple: { text: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20", shadow: "shadow-purple-500/10" },
    rose: { text: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/20", shadow: "shadow-rose-500/10" },
    cyan: { text: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20", shadow: "shadow-cyan-500/10" },
    zinc: { text: "text-zinc-400", bg: "bg-zinc-500/10", border: "border-zinc-500/20", shadow: "shadow-zinc-500/10" },
  };

  const c = colorMap[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`flex items-center w-full min-w-[240px] max-w-[280px] p-4 rounded-xl border ${c.bg} ${c.border} shadow-lg backdrop-blur-sm z-10 relative`}
    >
      {glow && (
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute inset-0 rounded-xl ${c.shadow} blur-md -z-10`}
        />
      )}
      <div className={`p-3 rounded-lg bg-zinc-900/80 border ${c.border} mr-4 shrink-0`}>
        <Icon className={`w-5 h-5 ${c.text}`} />
      </div>
      <div className="flex flex-col flex-grow overflow-hidden">
        <span className={`text-[10px] font-bold tracking-widest uppercase ${c.text} mb-1 opacity-80`}>
          {label}
        </span>
        <span className="text-zinc-200 font-mono text-xs truncate">
          {content}
        </span>
      </div>
    </motion.div>
  );
};

const VerticalLine = ({ delay = 0, height = "h-8" }: { delay?: number; height?: string }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.4, delay }}
    className={`flex items-center justify-center ${height} my-1 w-full relative`}
  >
    <div className="w-[1px] h-full bg-zinc-800/80 relative overflow-hidden">
      <motion.div 
        initial={{ top: "-100%" }}
        animate={{ top: "100%" }}
        transition={{ 
          duration: 1.5, 
          delay: delay + 0.2,
          repeat: Infinity,
          ease: "linear" 
        }}
        className="absolute left-1/2 -translate-x-1/2 w-[2px] h-6 rounded-full bg-zinc-500/50"
      />
    </div>
  </motion.div>
);

export default function AgentFlow() {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-5xl mx-auto py-12 px-4 font-sans">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <h1 className="text-2xl md:text-3xl font-light text-zinc-100 tracking-wide">
          Math Node Architecture
        </h1>
        <p className="text-sm text-zinc-400 mt-2 max-w-lg mx-auto">
          Differentiating fast, deterministic mathematical execution from organic agent capabilities.
        </p>
      </motion.div>

      <div className="flex flex-col items-center w-full relative">
        <FlowNode 
          label="REQUEST" 
          content='"solve this nonlinear diff eq..."' 
          icon={MessageSquare} 
          color="zinc" 
          delay={0.2} 
        />
        
        <VerticalLine delay={0.4} height="h-10" />
        
        <FlowNode 
          label="ROUTER" 
          content="Request Analysis" 
          icon={Route} 
          color="zinc" 
          delay={0.5} 
        />

        {/* The trunk */}
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
          className="w-[1px] h-10 bg-zinc-800/80 mt-1" 
        />
        
        {/* The horizontal bar and branches */}
        <div className="w-full flex justify-between relative mt-0">
          <motion.div 
            initial={{ scaleX: 0 }} 
            animate={{ scaleX: 1 }} 
            transition={{ duration: 0.5, delay: 0.8 }}
            className="absolute top-0 left-[25%] right-[25%] h-[1px] bg-zinc-800/80 origin-center" 
          />
          
          {/* Left Branch (Known) */}
          <div className="w-1/2 flex flex-col items-center pt-8 relative px-4">
             <motion.div 
               initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 0.9 }}
               className="absolute top-0 left-1/2 w-[1px] h-8 bg-zinc-800/80 -translate-x-1/2 origin-top" 
             />
             
             <motion.h3 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}
               className="text-[10px] font-bold tracking-widest text-emerald-500 mb-6 uppercase flex items-center gap-2"
             >
               <Zap className="w-3 h-3" /> Known Operation
             </motion.h3>
             
             <FlowNode label="MATH RUNTIME" content="Fast & Deterministic" icon={Zap} color="emerald" delay={1.1} />
             <VerticalLine delay={1.2} />
             <FlowNode label="PARSE → AST" content="expression.parse" icon={Code2} color="emerald" delay={1.3} />
             <VerticalLine delay={1.4} />
             <FlowNode label="EXECUTE" content="calculus.chain_rule" icon={Play} color="emerald" delay={1.5} />
             <VerticalLine delay={1.6} />
             <FlowNode label="RESULT" content="2x·cos(x²)" icon={CheckCircle2} color="emerald" delay={1.7} glow />
          </div>

          {/* Right Branch (Unknown) */}
          <div className="w-1/2 flex flex-col items-center pt-8 relative px-4">
             <motion.div 
               initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 0.9 }}
               className="absolute top-0 left-1/2 w-[1px] h-8 bg-zinc-800/80 -translate-x-1/2 origin-top" 
             />

             <motion.h3 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}
               className="text-[10px] font-bold tracking-widest text-purple-500 mb-6 uppercase flex items-center gap-2"
             >
               <BrainCircuit className="w-3 h-3" /> New Requirement
             </motion.h3>

             <FlowNode label="AGENT PLANE" content="Capability Loop" icon={BrainCircuit} color="purple" delay={1.1} />
             <VerticalLine delay={1.2} />
             <FlowNode label="DISCOVER" content="001: Identify Gap" icon={Search} color="purple" delay={1.3} />
             <VerticalLine delay={1.4} />
             <FlowNode label="BUILD" content="004: Create Capability" icon={Wrench} color="purple" delay={1.5} />
             <VerticalLine delay={1.6} />
             <FlowNode label="VERIFY" content="006: Capability Tests" icon={ShieldCheck} color="purple" delay={1.7} />
             <VerticalLine delay={1.8} />
             <FlowNode label="REGISTER" content="007: Update Substrate" icon={Database} color="purple" delay={1.9} glow />
          </div>
        </div>
      </div>
    </div>
  );
}
