import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, ArrowUpRight, Zap, Heart, Smile, Sparkles } from "lucide-react";
import DisclaimerModal from "./DisclaimerModal";

const T = {
  bg: "#080808", surface: "#111111", border: "#1e1e1e", borderHi: "#2a2a2a",
  lime: "#c8f542", white: "#f0f0f0", muted: "#444", mutedHi: "#777",
  font: "'Syne', sans-serif", body: "'DM Sans', sans-serif",
};

const checks = [
  { icon: Zap,      label: "Stress",  sub: "PSS-10" },
  { icon: Heart,    label: "Anxiety", sub: "GAD-7"  },
  { icon: Smile,    label: "Mood",    sub: "WHO-5"  },
  { icon: Sparkles, label: "Sleep",   sub: "ISI"    },
];

const tickerItems = [
  "No login needed","Private by design","Research-backed","No data stored",
  "Free forever","PHQ-9 validated","GAD-7 validated","PSS-10 validated",
];

const Ticker = () => (
  <div style={{ borderTop:`1px solid ${T.border}`, borderBottom:`1px solid ${T.border}`, overflow:"hidden", padding:"11px 0" }}>
    <motion.div 
      animate={{ x: ["0%", "-50%"] }} 
      transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
      style={{ display: "flex", whiteSpace: "nowrap", width: "max-content" }}
    >
      {[...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
        <span key={i} style={{
          fontFamily: T.body, fontSize:"11px", letterSpacing:"0.14em",
          textTransform:"uppercase", color: i%2===0 ? T.mutedHi : T.lime, padding:"0 28px",
        }}>
          {i%2===0 ? "◆" : "○"}&nbsp;&nbsp;{item}
        </span>
      ))}
    </motion.div>
  </div>
);

const Counter = ({ end, suffix="", dur=1400 }) => {
  const [v, setV] = useState(0);
  useEffect(() => {
    let c=0; const step=end/(dur/16);
    const id=setInterval(()=>{ c+=step; if(c>=end){setV(end);clearInterval(id);}else setV(Math.floor(c)); },16);
    return ()=>clearInterval(id);
  },[end,dur]);
  return <>{v}{suffix}</>;
};

const Landing = () => {
  const navigate = useNavigate();
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [hoveredCheck, setHoveredCheck] = useState(null);

  return (
    <div style={{ background:T.bg, minHeight:"100vh", display:"flex", flexDirection:"column", position:"relative", overflow:"hidden" }}>
      <div aria-hidden className="grid-texture" />
      <div aria-hidden className="lime-glow" />

      {showDisclaimer && (
        <DisclaimerModal onAccept={()=>navigate("/tests")} onDecline={()=>setShowDisclaimer(false)} />
      )}

      {/* Ticker */}
      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.1}} style={{position:"relative",zIndex:10}}>
        <Ticker />
      </motion.div>

      {/* Hero */}
      <div style={{
        position:"relative", zIndex:10, flex:1,
        display:"flex", flexDirection:"column", 
        justifyContent:"flex-start",
        padding:"clamp(30px, 4vw, 50px) clamp(24px,5vw,64px) 40px",
        width:"100%", boxSizing: "border-box"
      }}>

        {/* Edition label & Context Text */}
        <motion.div initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{delay:0.25,duration:0.6}}
          style={{marginBottom:"clamp(24px, 5vw, 36px)", maxWidth: "650px"}}>
          
          <div style={{display:"flex",alignItems:"flex-start",gap:"12px", marginBottom: "8px"}}>
            <div style={{width:"32px",height:"1px",background:T.lime, marginTop: "8px", flexShrink: 0}} />
            <span style={{
              fontFamily:T.body,
              fontSize:"clamp(11px, 3vw, 13px)", /* Scales dynamically, slightly larger */
              letterSpacing:"0.12em",
              textTransform:"uppercase",
              color:T.lime,
              fontWeight:600,
              lineHeight: 1.4
            }}>
              Mental clarity tools — research-backed
            </span>
          </div>

          <p style={{
            fontFamily:T.body, 
            fontSize:"clamp(10px, 2.5vw, 12px)", /* Smaller font to fit better */
            color:T.mutedHi, 
            lineHeight: 1.5, 
            margin: 0, 
            marginLeft: "clamp(0px, 5vw, 44px)" /* Replaced static 44px padding to prevent squishing on mobile */
          }}>
            This tool is built upon established web resources and validated assessments used by experts for baseline mental health checks.{" "}
            <span 
              onClick={() => navigate("/sources")} 
              style={{color: T.muted, cursor: "pointer", textDecoration: "underline", textUnderlineOffset: "3px", transition: "color 0.2s"}}
              onMouseEnter={(e) => e.target.style.color = T.lime}
              onMouseLeave={(e) => e.target.style.color = T.muted}
            >
              Click here to see the resources.
            </span>
          </p>

        </motion.div>

        {/* Main Two-Column Layout Container */}
        <div style={{
          display: "flex", 
          flexWrap: "wrap", 
          alignItems: "center", 
          justifyContent: "space-between", 
          gap: "clamp(40px, 6vw, 80px)"
        }}>
          
          {/* Left Side: Big headline */}
          <motion.div initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{delay:0.35,duration:0.75,ease:[0.16,1,0.3,1]}}
            style={{
              flex: "1 1 50%", 
              minWidth: "min(100%, 350px)", 
            }}>
            <h1 style={{
              fontFamily:T.font, fontWeight:800, margin:0,
              fontSize:"clamp(46px, 9vw, 120px)", 
              lineHeight:0.9, letterSpacing:"-0.03em", color:T.white,
            }}>
              CHECK<br />YOUR<br />
              <span style={{color:"transparent",WebkitTextStroke:`2px ${T.lime}`}}>MIND.</span>
            </h1>
          </motion.div>

          {/* Right Side: Content & Actions */}
          <div style={{
            display: "flex", flexDirection: "column", gap: "48px",
            flex: "1 1 40%", 
            minWidth: "min(100%, 400px)", 
            maxWidth: "600px",
            zIndex: 2
          }}>
            
            {/* Description & Check Chips */}
            <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.55,duration:0.6}}>
              <p style={{fontFamily:T.body,fontSize:"clamp(14px, 3vw, 18px)",fontWeight:300,color:T.white,lineHeight:1.6,marginBottom:"28px"}}>
                Understand your stress, mood, sleep, and anxiety in a focused,
                distraction-free space. <span style={{color: T.mutedHi}}>No account. No data stored. Everything stays on your device.</span>
              </p>

              <div style={{display:"flex",flexWrap:"wrap",gap:"10px"}}>
                {checks.map(({icon:Icon,label,sub},i)=>(
                  <motion.div key={label}
                    initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:0.65+i*0.07}}
                    onMouseEnter={()=>setHoveredCheck(label)}
                    onMouseLeave={()=>setHoveredCheck(null)}
                    style={{
                      display:"flex",alignItems:"center",gap:"8px",
                      border:`1px solid ${hoveredCheck===label?T.lime:T.border}`,
                      borderRadius:"6px",padding:"9px 14px",
                      background:hoveredCheck===label?"rgba(200,245,66,.06)":T.surface,
                      cursor:"default",transition:"border-color .2s,background .2s",
                    }}>
                    <Icon size={14} color={T.lime} strokeWidth={2.5}/>
                    <span style={{fontFamily:T.body,fontSize:"13px",fontWeight:500,color:T.white}}>{label}</span>
                    <span style={{fontFamily:T.body,fontSize:"11px",color:T.mutedHi,letterSpacing:"0.06em"}}>{sub}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Stats & Call to Actions */}
            <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.7,duration:0.6}}
              style={{display:"flex",flexDirection:"column",gap:"32px", paddingLeft: "clamp(0px, 3vw, 20px)", borderLeft: `1px solid ${T.border}`}}>
              
              {/* Stats */}
              <div style={{display:"flex",gap:"48px"}}>
                {[{end:5,suffix:"",label:"Checks available"},{end:100,suffix:"%",label:"Private"}].map(({end,suffix,label})=>(
                  <div key={label}>
                    <div style={{fontFamily:T.font,fontWeight:800,fontSize:"34px",color:T.white,lineHeight:1}}>
                      <Counter end={end} suffix={suffix}/>
                    </div>
                    <div style={{fontFamily:T.body,fontSize:"11px",color:T.muted,letterSpacing:"0.1em",textTransform:"uppercase",marginTop:"8px"}}>
                      {label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <div style={{display: "flex", alignItems: "center", gap: "24px", flexWrap: "wrap"}}>
                <motion.button whileHover={{scale:1.03}} whileTap={{scale:0.97}}
                  onClick={()=>setShowDisclaimer(true)}
                  style={{
                    display:"flex",alignItems:"center",justifyContent:"center",gap:"12px",
                    background:T.lime,color:T.bg,border:"none",borderRadius:"6px",
                    padding:"16px 30px",fontFamily:T.font,fontSize:"14px",
                    fontWeight:800,letterSpacing:"0.08em",textTransform:"uppercase",cursor:"pointer",
                    width: "clamp(200px, 100%, max-content)"
                  }}>
                  Start Your Check
                  <ArrowUpRight size={17} strokeWidth={2.5}/>
                </motion.button>
              </div>

            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom status bar */}
      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1}}
        style={{
          position:"relative",zIndex:10,
          borderTop:`1px solid ${T.border}`,
          display:"flex",alignItems:"center",justifyContent:"space-between",
          padding:"14px clamp(24px,5vw,64px)",flexWrap:"wrap",gap:"12px",
        }}>
        <div style={{display:"flex",alignItems:"center",gap:"7px"}}>
          <ShieldCheck size={14} color={T.lime}/>
          <span style={{fontFamily:T.body,fontSize:"12px",color:T.muted,letterSpacing:"0.08em"}}>
            All data stays on your device only
          </span>
        </div>
        <div style={{display:"flex",flexWrap: "wrap", gap:"20px"}}>
          {["PHQ-9","GAD-7","PSS-10","ISI","WHO-5"].map(s=>(
            <span key={s} style={{fontFamily:T.body,fontSize:"11px",color:T.muted,letterSpacing:"0.12em"}}>{s}</span>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Landing;