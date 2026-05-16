import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Check, ChevronLeft } from "lucide-react";
import { scales } from "../data/scales";

const T = {
  bg:"#080808", surface:"#111111", border:"#1e1e1e", borderHi:"#2a2a2a",
  lime:"#c8f542", white:"#f0f0f0", muted:"#444", mutedHi:"#777",
  font:"'Syne',sans-serif", body:"'DM Sans',sans-serif",
};

const Questionnaire = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [scale, setScale] = useState(null);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    const found = scales.find(s => s.id === id);
    if (found) { setScale(found); setAnswers(new Array(found.questions.length).fill(null)); }
    else navigate("/tests");
  }, [id, navigate]);

  if (!scale) return null;

  const progress = ((current + 1) / scale.questions.length) * 100;

  const handleSelect = (value) => {
    if (locked) return;
    setLocked(true);
    const next = [...answers];
    next[current] = value;
    setAnswers(next);
    setTimeout(() => {
      setLocked(false);
      if (current < scale.questions.length - 1) setCurrent(c => c + 1);
      else navigate("/result", { state: { scaleId: scale.id, answers: next } });
    }, 320);
  };

  const goBack = () => {
    if (current > 0) setCurrent(c => c - 1);
    else navigate("/tests");
  };

  return (
    <div style={{
      background: T.bg,
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",   /* ← key: no page scroll at all */
      position: "relative",
    }}>
      <div aria-hidden className="grid-texture" />
      <div aria-hidden className="lime-glow" />

      {/* ── Progress bar (2px at very top) ── */}
      <div style={{ width:"100%", height:"2px", background:T.border, flexShrink:0, position:"relative", zIndex:20 }}>
        <motion.div
          animate={{ width:`${progress}%` }}
          transition={{ duration:0.45, ease:"easeInOut" }}
          style={{ height:"100%", background:T.lime }}
        />
      </div>

      {/* ── Meta bar ── */}
      <div style={{
        position:"relative", zIndex:10, flexShrink:0,
        display:"flex", alignItems:"center", justifyContent:"space-between",
        padding:"12px 32px",
        borderBottom:`1px solid ${T.border}`,
      }}>
        {/* Back */}
        <button onClick={goBack}
          style={{
            background:"none", border:`1px solid ${T.border}`, borderRadius:"6px",
            width:"32px", height:"32px", cursor:"pointer", color:T.mutedHi,
            display:"flex", alignItems:"center", justifyContent:"center",
            transition:"border-color .2s,color .2s",
          }}
          onMouseEnter={e=>{e.currentTarget.style.borderColor=T.borderHi;e.currentTarget.style.color=T.white;}}
          onMouseLeave={e=>{e.currentTarget.style.borderColor=T.border;e.currentTarget.style.color=T.mutedHi;}}>
          <ChevronLeft size={14}/>
        </button>

        {/* Center: scale name + counter */}
        <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
          <span style={{ fontFamily:T.body, fontSize:"11px", letterSpacing:"0.16em", textTransform:"uppercase", color:T.lime }}>
            {scale.shortName}
          </span>
          <span style={{ width:"1px", height:"12px", background:T.border }}/>
          <span style={{ fontFamily:T.body, fontSize:"11px", color:T.muted, letterSpacing:"0.1em" }}>
            {current + 1} / {scale.questions.length}
          </span>
        </div>

        {/* Dot stepper */}
        <div style={{ display:"flex", gap:"4px", alignItems:"center" }}>
          {scale.questions.map((_, i) => (
            <div key={i} style={{
              width: i === current ? "16px" : "5px",
              height:"5px", borderRadius:"3px",
              background: i <= current ? T.lime : T.border,
              opacity: i > current ? 0.35 : 1,
              transition:"width .3s,background .3s",
            }}/>
          ))}
        </div>
      </div>

      {/* ── Main content: question + answers, fills remaining height ── */}
      <div style={{
        position:"relative", zIndex:10,
        flex:1, minHeight:0,          /* shrinks to fit, no overflow */
        display:"flex",
        padding:"0 32px",
      }}>
        <AnimatePresence mode="wait">
          <motion.div key={current}
            initial={{ opacity:0, x:24 }}
            animate={{ opacity:1, x:0 }}
            exit={{ opacity:0, x:-24 }}
            transition={{ duration:0.25, ease:"easeInOut" }}
            style={{
              width:"100%",
              display:"flex",
              flexDirection:"column",
              justifyContent:"center",
              gap:"0",
              paddingTop:"20px",
              paddingBottom:"12px",
            }}>

            {/* Question label */}
            <div style={{
              fontFamily:T.body, fontSize:"10px", letterSpacing:"0.16em",
              textTransform:"uppercase", color:T.muted, marginBottom:"10px",
            }}>
              Question {current + 1}
            </div>

            {/* Question text — deliberately smaller so answers stay in view */}
            <h2 style={{
              fontFamily:T.font, fontWeight:800,
              fontSize:"clamp(17px, 2.2vw, 28px)",
              lineHeight:1.15, letterSpacing:"-0.02em",
              color:T.white,
              marginBottom:"clamp(14px,2vh,24px)",
              maxWidth:"720px",
            }}>
              {scale.questions[current]}
            </h2>

            {/* Answers — compact rows */}
            <div style={{ display:"flex", flexDirection:"column", gap:"6px", width:"100%" }}>
              {scale.options.map((option, idx) => {
                const isPicked = answers[current] === option.value && !locked;
                const isJustPicked = answers[current] === option.value && locked;
                const active = isPicked || isJustPicked;
                return (
                  <motion.button key={idx}
                    whileTap={{ scale:0.99 }}
                    onClick={() => handleSelect(option.value)}
                    style={{
                      width:"100%", textAlign:"left", cursor:"pointer",
                      background: active ? "rgba(200,245,66,.07)" : "transparent",
                      border:`1px solid ${active ? T.lime : T.border}`,
                      borderRadius:"6px",
                      padding:"clamp(10px,1.5vh,14px) 18px",
                      display:"flex", alignItems:"center", justifyContent:"space-between",
                      transition:"border-color .12s,background .12s",
                      fontFamily:T.body,
                    }}
                    onMouseEnter={e=>{
                      if(!active){
                        e.currentTarget.style.borderColor=T.borderHi;
                        e.currentTarget.style.background=T.surface;
                      }
                    }}
                    onMouseLeave={e=>{
                      if(!active){
                        e.currentTarget.style.borderColor=T.border;
                        e.currentTarget.style.background="transparent";
                      }
                    }}>
                    <span style={{
                      fontSize:"clamp(13px,1.5vw,15px)", fontWeight:300,
                      color: active ? T.lime : T.mutedHi,
                      transition:"color .12s",
                    }}>
                      {option.text}
                    </span>
                    <div style={{
                      width:"20px", height:"20px", borderRadius:"4px", flexShrink:0,
                      border:`1px solid ${active ? T.lime : T.border}`,
                      background: active ? T.lime : "transparent",
                      display:"flex", alignItems:"center", justifyContent:"center",
                      transition:"background .12s,border-color .12s",
                    }}>
                      {active && <Check size={11} color={T.bg} strokeWidth={3}/>}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Bottom privacy strip ── */}
      <div style={{
        position:"relative", zIndex:10, flexShrink:0,
        borderTop:`1px solid ${T.border}`,
        padding:"10px 32px",
        display:"flex", alignItems:"center", justifyContent:"center", gap:"6px",
      }}>
        <Shield size={11} color={T.muted}/>
        <span style={{ fontFamily:T.body, fontSize:"10px", color:T.muted, letterSpacing:"0.08em" }}>
          Your answers stay on this device only — nothing is sent anywhere
        </span>
      </div>
    </div>
  );
};

export default Questionnaire;