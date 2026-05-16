import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { HelpCircle, ArrowUpRight, Activity, Brain, Moon, Heart, Smile } from "lucide-react";
import { scales } from "../data/scales";

const T = {
  bg:"#080808", surface:"#111111", surfaceHi:"#161616",
  border:"#1e1e1e", borderHi:"#2a2a2a",
  lime:"#c8f542", white:"#f0f0f0", muted:"#444", mutedHi:"#777",
  font:"'Syne',sans-serif", body:"'DM Sans',sans-serif",
};

const scaleConfig = {
  "pss-10": { icon: Activity, accent: "#ff6b6b", label: "STRESS"  },
  "gad-7":  { icon: Heart,    accent: "#a78bfa", label: "ANXIETY" },
  "phq-9":  { icon: Brain,    accent: "#60a5fa", label: "MOOD"    },
  "isi":    { icon: Moon,     accent: "#fbbf24", label: "SLEEP"   },
  "who-5":  { icon: Smile,    accent: T.lime,    label: "WELLBEING"},
};

const TestCard = ({ scale, idx, navigate }) => {
  const [hovered, setHovered] = useState(false);
  const cfg = scaleConfig[scale.id] || { icon: Activity, accent: T.lime, label: scale.shortName.toUpperCase() };
  const Icon = cfg.icon;

  return (
    <motion.div
      initial={{ opacity:0, y:24 }}
      animate={{ opacity:1, y:0 }}
      transition={{ delay: idx*0.08, duration:0.55, ease:[0.16,1,0.3,1] }}
      onMouseEnter={()=>setHovered(true)}
      onMouseLeave={()=>setHovered(false)}
      style={{
        background: hovered ? T.surfaceHi : T.surface,
        border:`1px solid ${hovered ? T.borderHi : T.border}`,
        borderRadius:"8px", padding:"28px",
        display:"flex", flexDirection:"column",
        transition:"background .2s,border-color .2s,transform .2s",
        transform: hovered ? "translateY(-3px)" : "none",
        cursor:"pointer",
      }}
      onClick={()=>navigate(`/test/${scale.id}`)}>

      {/* Top row */}
      <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:"28px"}}>
        {/* Number index + icon */}
        <div style={{display:"flex",alignItems:"center",gap:"12px"}}>
          <div style={{
            width:"44px",height:"44px",borderRadius:"6px",
            border:`1px solid ${T.border}`,
            display:"flex",alignItems:"center",justifyContent:"center",
            background:T.bg,
          }}>
            <Icon size={20} color={cfg.accent}/>
          </div>
          <span style={{
            fontFamily:T.body,fontSize:"10px",letterSpacing:"0.12em",
            textTransform:"uppercase",color:T.muted,fontWeight:500,
          }}>
            0{idx+1}
          </span>
        </div>

        {/* Time estimate badge */}
        <div style={{
          border:`1px solid ${T.border}`,borderRadius:"4px",
          padding:"4px 10px",fontFamily:T.body,fontSize:"10px",
          color:T.mutedHi,letterSpacing:"0.06em",
        }}>
          {scale.timeEstimate}
        </div>
      </div>

      {/* Category tag */}
      <div style={{
        display:"inline-block",marginBottom:"10px",
        fontFamily:T.body,fontSize:"10px",letterSpacing:"0.16em",
        textTransform:"uppercase",color:cfg.accent,fontWeight:500,
      }}>
        {cfg.label}
      </div>

      {/* Title */}
      <h2 style={{
        fontFamily:T.font,fontWeight:800,fontSize:"clamp(20px,2.5vw,26px)",
        color:T.white,lineHeight:1.05,letterSpacing:"-0.02em",
        marginBottom:"12px",
      }}>
        {scale.shortName}
      </h2>

      {/* Desc */}
      <p style={{
        fontFamily:T.body,fontSize:"13px",fontWeight:300,
        color:T.mutedHi,lineHeight:1.7,flex:1,marginBottom:"28px",
      }}>
        {scale.description}
      </p>

      {/* Footer row */}
      <div style={{
        display:"flex",alignItems:"center",justifyContent:"space-between",
        paddingTop:"18px",borderTop:`1px solid ${T.border}`,
      }}>
        <div style={{display:"flex",alignItems:"center",gap:"6px"}}>
          <HelpCircle size={12} color={T.muted}/>
          <span style={{fontFamily:T.body,fontSize:"11px",color:T.muted,letterSpacing:"0.04em"}}>
            {scale.questions.length} questions
          </span>
        </div>

        <div style={{
          display:"flex",alignItems:"center",gap:"6px",
          background: hovered ? T.lime : "transparent",
          color: hovered ? T.bg : T.mutedHi,
          border:`1px solid ${hovered ? T.lime : T.border}`,
          borderRadius:"4px",padding:"6px 12px",
          transition:"background .2s,color .2s,border-color .2s",
          fontFamily:T.font,fontWeight:800,fontSize:"11px",letterSpacing:"0.1em",textTransform:"uppercase",
        }}>
          Start <ArrowUpRight size={12} strokeWidth={2.5}/>
        </div>
      </div>
    </motion.div>
  );
};

const TestSelection = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      position:"relative",minHeight:"100vh",
      padding:"clamp(40px,5vw,72px) clamp(20px,4vw,48px)",
      width:"100%",
    }}>
      <div aria-hidden className="grid-texture"/>

      {/* Page header */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6}}
        style={{marginBottom:"60px",position:"relative",zIndex:1}}>

        <div style={{display:"flex",alignItems:"center",gap:"12px",marginBottom:"20px"}}>
          <div style={{width:"28px",height:"1px",background:T.lime}}/>
          <span style={{fontFamily:T.body,fontSize:"11px",letterSpacing:"0.18em",textTransform:"uppercase",color:T.lime,fontWeight:500}}>
            Validated screening tools
          </span>
        </div>

        <h1 style={{
          fontFamily:T.font,fontWeight:800,margin:0,
          fontSize:"clamp(42px,7vw,80px)",
          lineHeight:0.92,letterSpacing:"-0.03em",color:T.white,
          marginBottom:"20px",
        }}>
          THE<br/>
          <span style={{color:"transparent",WebkitTextStroke:`2px ${T.lime}`}}>CHECKS.</span>
        </h1>

        <p style={{fontFamily:T.body,fontSize:"15px",fontWeight:300,color:T.mutedHi,maxWidth:"480px",lineHeight:1.7}}>
          Five standardized tools for self-awareness. Pick one, answer honestly, get insight. 100% private.
        </p>
      </motion.div>

      {/* Grid */}
      <div style={{
        position:"relative",zIndex:1,
        display:"grid",
        gridTemplateColumns:"repeat(auto-fill,minmax(min(100%,300px),1fr))",
        gap:"12px",
      }}>
        {scales.map((scale,idx)=>(
          <TestCard key={scale.id} scale={scale} idx={idx} navigate={navigate}/>
        ))}
      </div>
    </div>
  );
};

export default TestSelection;