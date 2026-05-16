import React, { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, BookOpen, ShieldCheck } from "lucide-react";
import { scales } from "../data/scales";

const T = {
  bg:"#080808", surface:"#111111", surfaceHi:"#161616",
  border:"#1e1e1e", borderHi:"#2a2a2a",
  lime:"#c8f542", white:"#f0f0f0", muted:"#444", mutedHi:"#777",
  font:"'Syne',sans-serif", body:"'DM Sans',sans-serif",
};

const scaleAccents = {
  "pss-10": "#ff6b6b",
  "gad-7":  "#a78bfa",
  "phq-9":  "#60a5fa",
  "isi":    "#fbbf24",
  "who-5":  "#c8f542",
};

const SourceCard = ({ scale, idx }) => {
  const [hovered, setHovered] = useState(null);
  const accent = scaleAccents[scale.id] || T.lime;

  return (
    <motion.div
      initial={{opacity:0,y:24}} animate={{opacity:1,y:0}}
      transition={{delay:idx*0.08,duration:0.55,ease:[0.16,1,0.3,1]}}
      style={{
        background:T.surface,border:`1px solid ${T.border}`,
        borderRadius:"8px",overflow:"hidden",
      }}>

      {/* Accent top line */}
      <div style={{height:"2px",background:accent}}/>

      <div style={{padding:"28px"}}>
        {/* Header */}
        <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:"20px"}}>
          <div style={{display:"flex",alignItems:"center",gap:"12px"}}>
            <div style={{
              width:"40px",height:"40px",borderRadius:"6px",
              border:`1px solid ${T.border}`,background:T.bg,
              display:"flex",alignItems:"center",justifyContent:"center",
            }}>
              <BookOpen size={16} color={accent}/>
            </div>
            <div>
              <div style={{fontFamily:T.body,fontSize:"9px",letterSpacing:"0.16em",textTransform:"uppercase",color:accent,marginBottom:"3px"}}>
                Validated Scale
              </div>
              <div style={{fontFamily:T.body,fontSize:"11px",color:T.muted,letterSpacing:"0.06em",textTransform:"uppercase"}}>
                {scale.id.toUpperCase()}
              </div>
            </div>
          </div>
          <span style={{
            fontFamily:T.body,fontSize:"9px",letterSpacing:"0.1em",textTransform:"uppercase",
            color:T.muted,border:`1px solid ${T.border}`,borderRadius:"4px",padding:"3px 8px",
          }}>
            0{idx+1}
          </span>
        </div>

        {/* Name */}
        <h2 style={{
          fontFamily:T.font,fontWeight:800,fontSize:"clamp(18px,2.5vw,22px)",
          color:T.white,lineHeight:1.05,letterSpacing:"-0.02em",marginBottom:"8px",
        }}>
          {scale.name}
        </h2>
        <p style={{fontFamily:T.body,fontSize:"13px",fontWeight:300,color:T.mutedHi,lineHeight:1.6,marginBottom:"22px"}}>
          Checks: <span style={{color:T.white}}>{scale.shortName}</span> symptoms over a recent period.
        </p>

        {/* Divider */}
        <div style={{borderTop:`1px solid ${T.border}`,paddingTop:"18px"}}>
          <div style={{fontFamily:T.body,fontSize:"10px",letterSpacing:"0.14em",textTransform:"uppercase",color:T.muted,marginBottom:"10px"}}>
            Official resources
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:"6px"}}>
            {scale.sourceLinks.map((link,i)=>(
              <a key={i} href={link.url} target="_blank" rel="noopener noreferrer"
                onMouseEnter={()=>setHovered(i)}
                onMouseLeave={()=>setHovered(null)}
                style={{
                  display:"flex",alignItems:"center",justifyContent:"space-between",
                  padding:"10px 14px",borderRadius:"6px",textDecoration:"none",
                  border:`1px solid ${hovered===i ? T.borderHi : T.border}`,
                  background:hovered===i ? T.surfaceHi : T.bg,
                  transition:"border-color .15s,background .15s",
                }}>
                <span style={{fontFamily:T.body,fontSize:"12px",color:hovered===i?T.white:T.mutedHi,transition:"color .15s",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",paddingRight:"12px"}}>
                  {link.text}
                </span>
                <ExternalLink size={12} color={hovered===i?T.lime:T.muted} style={{flexShrink:0,transition:"color .15s,transform .15s",transform:hovered===i?"rotate(0deg)":"rotate(0deg)"}}/>
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Sources = () => (
  <div style={{background:T.bg,minHeight:"100vh",position:"relative"}}>
    <div aria-hidden className="grid-texture"/>
    <div aria-hidden className="lime-glow"/>

    <div style={{
      position:"relative",zIndex:10,
      width:"100%",
      padding:"clamp(40px,5vw,72px) clamp(20px,4vw,48px)",
    }}>

      {/* Page header */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6}}
        style={{marginBottom:"56px"}}>
        <div style={{display:"flex",alignItems:"center",gap:"12px",marginBottom:"20px"}}>
          <div style={{width:"28px",height:"1px",background:T.lime}}/>
          <span style={{fontFamily:T.body,fontSize:"11px",letterSpacing:"0.18em",textTransform:"uppercase",color:T.lime,fontWeight:500}}>
            Methodology
          </span>
        </div>

        <h1 style={{
          fontFamily:T.font,fontWeight:800,margin:0,
          fontSize:"clamp(42px,7vw,80px)",
          lineHeight:0.9,letterSpacing:"-0.03em",color:T.white,marginBottom:"24px",
        }}>
          RESEARCH<br/>
          <span style={{color:"transparent",WebkitTextStroke:`2px ${T.lime}`}}>SOURCES.</span>
        </h1>

        <p style={{fontFamily:T.body,fontSize:"15px",fontWeight:300,color:T.mutedHi,maxWidth:"520px",lineHeight:1.75}}>
          MindMe is built entirely on validated, peer-reviewed screening tools used by clinicians worldwide.
          Every check has a published evidence base.
        </p>
      </motion.div>

      {/* Notice banner */}
      <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:0.2}}
        style={{
          display:"flex",alignItems:"flex-start",gap:"14px",
          background:"rgba(200,245,66,.05)",border:`1px solid rgba(200,245,66,.18)`,
          borderRadius:"8px",padding:"18px 22px",marginBottom:"40px",
        }}>
        <ShieldCheck size={16} color={T.lime} style={{flexShrink:0,marginTop:"1px"}}/>
        <p style={{fontFamily:T.body,fontSize:"13px",fontWeight:300,color:T.mutedHi,lineHeight:1.65,margin:0}}>
          MindMe uses only validated screening tools designed for{" "}
          <strong style={{color:T.lime,fontWeight:500}}>screening purposes only</strong>
          {" "}— results do not constitute a clinical diagnosis. Always consult a qualified professional.
        </p>
      </motion.div>

      {/* Cards grid */}
      <div style={{
        display:"grid",
        gridTemplateColumns:"repeat(auto-fill,minmax(min(100%,320px),1fr))",
        gap:"12px",
      }}>
        {scales.map((scale,idx)=>(
          <SourceCard key={scale.id} scale={scale} idx={idx}/>
        ))}
      </div>
    </div>
  </div>
);

export default Sources;