import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Download, Copy, RotateCcw, AlertTriangle, Info, CheckCircle, ArrowUpRight } from "lucide-react";
import { scales, calculateScore, getInterpretation, getMaxScore } from "../data/scales";

const T = {
  bg:"#080808", surface:"#111111", surfaceHi:"#161616",
  border:"#1e1e1e", borderHi:"#2a2a2a",
  lime:"#c8f542", white:"#f0f0f0", muted:"#444", mutedHi:"#777",
  danger:"#ff4d4d", dangerBg:"rgba(255,77,77,.07)", dangerBorder:"rgba(255,77,77,.2)",
  font:"'Syne',sans-serif", body:"'DM Sans',sans-serif",
};

const ActionBtn = ({ onClick, icon:Icon, label, primary=false }) => (
  <motion.button whileHover={{scale:1.02}} whileTap={{scale:0.97}} onClick={onClick}
    style={{
      display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",
      padding:"13px 20px",borderRadius:"6px",cursor:"pointer",
      fontFamily:T.body,fontSize:"13px",fontWeight:500,letterSpacing:"0.04em",
      background: primary ? T.lime : "transparent",
      color: primary ? T.bg : T.mutedHi,
      border:`1px solid ${primary ? T.lime : T.border}`,
      transition:"border-color .2s,color .2s,background .2s",
    }}
    onMouseEnter={e=>{ if(!primary){e.currentTarget.style.borderColor=T.borderHi;e.currentTarget.style.color=T.white;} }}
    onMouseLeave={e=>{ if(!primary){e.currentTarget.style.borderColor=T.border;e.currentTarget.style.color=T.mutedHi;} }}>
    <Icon size={14}/>{label}
  </motion.button>
);

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { scaleId, answers } = location.state || {};

  useEffect(()=>{ if(!scaleId||!answers) navigate("/tests"); },[scaleId,answers,navigate]);
  if(!scaleId||!answers) return null;

  const scale = scales.find(s=>s.id===scaleId);
  const score = calculateScore(scaleId, answers);
  const maxScore = getMaxScore(scaleId);
  const interpretation = getInterpretation(scaleId, score);
  const pct = Math.round((score/maxScore)*100);
  const showSafetyAlert = scaleId==="phq-9" && answers[8]>0;

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `MindMe Self-Check\nScale: ${scale.name}\nResult: ${interpretation?.label}\nScore: ${score}/${maxScore}\n\nNot a diagnosis. For self-awareness only.`
    );
  };

  return (
    <div style={{background:T.bg,minHeight:"100vh",position:"relative"}}>
      <div aria-hidden className="grid-texture"/>
      <div aria-hidden className="lime-glow"/>

      <div style={{
        position:"relative",zIndex:10,
        width:"100%",
        padding:"clamp(40px,5vw,64px) clamp(20px,4vw,48px)",
      }}>

        {/* Header label */}
        <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:0.1}}
          style={{display:"flex",alignItems:"center",gap:"12px",marginBottom:"32px"}}>
          <div style={{width:"28px",height:"1px",background:T.lime}}/>
          <span style={{fontFamily:T.body,fontSize:"11px",letterSpacing:"0.18em",textTransform:"uppercase",color:T.lime,fontWeight:500}}>
            {scale.name} · Results
          </span>
        </motion.div>

        {/* Main score card */}
        <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{delay:0.2,duration:0.6}}
          style={{
            background:T.surface,border:`1px solid ${T.borderHi}`,
            borderRadius:"10px",overflow:"hidden",marginBottom:"16px",
          }}>

          {/* Lime top line */}
          <div style={{height:"2px",background:T.lime}}/>

          <div style={{
            display:"flex",flexWrap:"wrap",gap:"0",
            borderBottom:`1px solid ${T.border}`,
          }}>
            {/* Left: big score */}
            <div style={{
              flex:"1 1 220px",padding:"40px 36px",
              borderRight:`1px solid ${T.border}`,
              display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
            }}>
              <div style={{fontFamily:T.body,fontSize:"10px",letterSpacing:"0.14em",textTransform:"uppercase",color:T.muted,marginBottom:"16px"}}>
                Your score
              </div>
              <div style={{fontFamily:T.font,fontWeight:800,fontSize:"clamp(64px,10vw,100px)",color:T.white,lineHeight:1,letterSpacing:"-0.04em"}}>
                {score}
              </div>
              <div style={{fontFamily:T.body,fontSize:"13px",color:T.muted,marginTop:"8px"}}>
                out of {maxScore}
              </div>

              {/* Score bar */}
              <div style={{width:"100%",height:"2px",background:T.border,borderRadius:"1px",marginTop:"24px"}}>
                <motion.div initial={{width:0}} animate={{width:`${pct}%`}} transition={{delay:0.5,duration:0.8,ease:"easeOut"}}
                  style={{height:"100%",background:T.lime,borderRadius:"1px"}}/>
              </div>
              <div style={{display:"flex",justifyContent:"space-between",width:"100%",marginTop:"6px"}}>
                <span style={{fontFamily:T.body,fontSize:"10px",color:T.muted}}>0</span>
                <span style={{fontFamily:T.body,fontSize:"10px",color:T.lime,fontWeight:500}}>{pct}%</span>
                <span style={{fontFamily:T.body,fontSize:"10px",color:T.muted}}>{maxScore}</span>
              </div>
            </div>

            {/* Right: interpretation */}
            <div style={{flex:"2 1 300px",padding:"40px 36px",display:"flex",flexDirection:"column",justifyContent:"center"}}>
              <div style={{fontFamily:T.body,fontSize:"10px",letterSpacing:"0.14em",textTransform:"uppercase",color:T.muted,marginBottom:"12px"}}>
                Interpretation
              </div>
              <div style={{
                display:"inline-block",marginBottom:"16px",
                border:`1px solid ${T.lime}`,borderRadius:"4px",
                padding:"6px 14px",fontFamily:T.font,fontWeight:800,
                fontSize:"clamp(14px,2vw,18px)",color:T.lime,letterSpacing:"-0.01em",
                width:"fit-content",
              }}>
                {interpretation?.label}
              </div>
              <p style={{fontFamily:T.body,fontSize:"14px",fontWeight:300,color:T.mutedHi,lineHeight:1.75,fontStyle:"italic",margin:0}}>
                "{interpretation?.desc}"
              </p>
            </div>
          </div>

          {/* Bottom disclaimer */}
          <div style={{padding:"14px 36px",display:"flex",alignItems:"center",gap:"8px"}}>
            <AlertTriangle size={12} color={T.muted}/>
            <span style={{fontFamily:T.body,fontSize:"11px",color:T.muted,letterSpacing:"0.04em"}}>
              This is not a clinical diagnosis — use for self-awareness only
            </span>
          </div>
        </motion.div>

        {/* Safety alert */}
        {showSafetyAlert && (
          <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:0.35}}
            style={{
              background:T.dangerBg,border:`1px solid ${T.dangerBorder}`,
              borderRadius:"8px",padding:"20px 24px",marginBottom:"16px",
              display:"flex",gap:"14px",alignItems:"flex-start",
            }}>
            <AlertTriangle size={18} color={T.danger} style={{flexShrink:0,marginTop:"1px"}}/>
            <div>
              <h3 style={{fontFamily:T.font,fontWeight:800,fontSize:"16px",color:T.danger,marginBottom:"8px",letterSpacing:"-0.01em"}}>
                Urgent Support Recommended
              </h3>
              <p style={{fontFamily:T.body,fontSize:"13px",color:"#ffaaaa",lineHeight:1.65,fontWeight:300,margin:0}}>
                You indicated thoughts related to self-harm. Please speak to a trusted person immediately
                and contact local emergency services or a qualified mental health professional.
              </p>
            </div>
          </motion.div>
        )}

        {/* Info cards */}
        <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:0.4}}
          style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,300px),1fr))",gap:"12px",marginBottom:"16px"}}>

          {/* What this means */}
          <div style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:"8px",padding:"24px"}}>
            <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"14px"}}>
              <Info size={15} color={T.lime}/>
              <span style={{fontFamily:T.font,fontWeight:800,fontSize:"14px",color:T.white,letterSpacing:"-0.01em"}}>
                What this means
              </span>
            </div>
            <p style={{fontFamily:T.body,fontSize:"13px",fontWeight:300,color:T.mutedHi,lineHeight:1.7,marginBottom:"14px"}}>
              This score is based on the {scale.name}, a standard screening tool reflecting the symptoms
              you reported over the specified timeframe.
            </p>
            <div style={{
              background:T.bg,border:`1px solid ${T.border}`,
              borderRadius:"6px",padding:"10px 14px",
              fontFamily:T.body,fontSize:"12px",color:T.muted,lineHeight:1.5,
            }}>
              Score only indicates symptom severity — not a diagnosis.
            </div>
          </div>

          {/* Next steps */}
          <div style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:"8px",padding:"24px"}}>
            <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"14px"}}>
              <CheckCircle size={15} color={T.lime}/>
              <span style={{fontFamily:T.font,fontWeight:800,fontSize:"14px",color:T.white,letterSpacing:"-0.01em"}}>
                Next steps
              </span>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
              {[
                "Discuss these results with a healthcare provider.",
                "Explore stress management and self-care techniques.",
                "Reach out to a trusted friend or family member.",
              ].map((step,i)=>(
                <div key={i} style={{display:"flex",alignItems:"flex-start",gap:"10px"}}>
                  <div style={{
                    width:"18px",height:"18px",borderRadius:"4px",
                    border:`1px solid ${T.border}`,flexShrink:0,marginTop:"1px",
                    display:"flex",alignItems:"center",justifyContent:"center",
                  }}>
                    <span style={{fontFamily:T.font,fontSize:"9px",color:T.muted,fontWeight:800}}>{i+1}</span>
                  </div>
                  <span style={{fontFamily:T.body,fontSize:"13px",fontWeight:300,color:T.mutedHi,lineHeight:1.6}}>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Action buttons */}
        <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:0.5}}
          style={{display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"20px"}}>
          <ActionBtn onClick={()=>navigate("/tests")} icon={RotateCcw} label="Take Another"/>
          <ActionBtn onClick={handleCopy} icon={Copy} label="Copy Summary"/>
          <ActionBtn onClick={()=>window.print()} icon={Download} label="Save / Print" primary/>
        </motion.div>

        {/* Privacy note */}
        <div style={{
          border:`1px solid ${T.border}`,borderRadius:"6px",
          padding:"12px 16px",
          display:"flex",alignItems:"center",gap:"8px",
        }}>
          <span style={{fontFamily:T.body,fontSize:"11px",color:T.muted,letterSpacing:"0.04em"}}>
            🔒 Do not share your score publicly. Use it privately for self-awareness only.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Result;