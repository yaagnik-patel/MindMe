import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Menu, X } from "lucide-react";

const T = {
  bg:"#080808", border:"#1e1e1e", borderHi:"#2a2a2a",
  lime:"#c8f542", white:"#f0f0f0", muted:"#444", mutedHi:"#777",
  font:"'Syne',sans-serif", body:"'DM Sans',sans-serif",
};

const navLinks = [
  { label: "Checks",  to: "/tests"   },
  { label: "Sources", to: "/sources" },
];

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => setMenuOpen(false), [location.pathname]);

  const backTarget = location.pathname.startsWith("/test/") ? "/tests" : "/";

  return (
    <>
      <nav style={{
        position:"sticky", top:0, zIndex:50, width:"100%",
        background: scrolled ? "rgba(8,8,8,0.94)" : T.bg,
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom:`1px solid ${T.border}`,
        transition:"background .3s",
      }}>
        <div style={{
          width:"100%",
          padding:"0 clamp(20px,4vw,48px)",
          height:"58px", display:"flex", alignItems:"center", justifyContent:"space-between",
        }}>

          {/* Left: back + logo */}
          <div style={{display:"flex",alignItems:"center",gap:"14px"}}>
            <AnimatePresence>
              {!isHome && (
                <motion.div initial={{opacity:0,x:-8}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-8}} transition={{duration:0.18}}>
                  <Link to={backTarget} className="nav-back-btn"
                    style={{
                      display:"flex",alignItems:"center",justifyContent:"center",
                      width:"32px",height:"32px",border:`1px solid ${T.border}`,
                      borderRadius:"6px",color:T.mutedHi,textDecoration:"none",
                      transition:"border-color .2s,color .2s",
                    }}
                    onMouseEnter={e=>{e.currentTarget.style.borderColor=T.lime;e.currentTarget.style.color=T.lime;}}
                    onMouseLeave={e=>{e.currentTarget.style.borderColor=T.border;e.currentTarget.style.color=T.mutedHi;}}>
                    <ArrowLeft size={15}/>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>

            <Link to="/" style={{textDecoration:"none"}}>
              <span style={{fontFamily:T.font,fontWeight:800,fontSize:"17px",letterSpacing:"-0.02em",color:T.white}}>
                MIND<span style={{color:T.lime}}>ME</span>
              </span>
            </Link>
          </div>

          {/* Desktop links */}
          <div className="nav-desktop" style={{display:"flex",alignItems:"center",gap:"32px"}}>
            {navLinks.map(({label,to})=>(
              <Link key={to} to={to}
                style={{
                  fontFamily:T.body,fontSize:"12px",letterSpacing:"0.09em",textTransform:"uppercase",
                  color:location.pathname===to?T.white:T.mutedHi,
                  textDecoration:"none",transition:"color .2s",fontWeight:400,
                }}
                onMouseEnter={e=>e.currentTarget.style.color=T.white}
                onMouseLeave={e=>e.currentTarget.style.color=location.pathname===to?T.white:T.mutedHi}>
                {label}
              </Link>
            ))}
            <Link to="/tests" style={{textDecoration:"none"}}>
              <motion.div whileHover={{scale:1.03}} whileTap={{scale:0.97}}
                style={{
                  background:T.lime, color:T.bg, fontFamily:T.font,
                  fontWeight:800, fontSize:"11px", letterSpacing:"0.1em",
                  textTransform:"uppercase", padding:"8px 18px", borderRadius:"4px", cursor:"pointer",
                }}>
                Start Check
              </motion.div>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button className="nav-mobile"
            onClick={()=>setMenuOpen(o=>!o)}
            style={{
              background:"none",border:`1px solid ${T.border}`,borderRadius:"6px",
              width:"36px",height:"36px",display:"none",alignItems:"center",
              justifyContent:"center",cursor:"pointer",color:T.mutedHi,
            }}>
            {menuOpen ? <X size={16}/> : <Menu size={16}/>}
          </button>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}}
              exit={{height:0,opacity:0}} transition={{duration:0.22}}
              style={{overflow:"hidden",borderTop:`1px solid ${T.border}`,background:T.bg}}>
              <div style={{padding:"20px clamp(20px,4vw,48px)",display:"flex",flexDirection:"column",gap:"18px"}}>
                {navLinks.map(({label,to})=>(
                  <Link key={to} to={to} style={{fontFamily:T.body,fontSize:"15px",color:T.mutedHi,textDecoration:"none",letterSpacing:"0.04em"}}>
                    {label}
                  </Link>
                ))}
                <Link to="/tests" style={{
                  background:T.lime,color:T.bg,fontFamily:T.font,fontWeight:800,
                  fontSize:"12px",letterSpacing:"0.1em",textTransform:"uppercase",
                  padding:"12px 20px",borderRadius:"4px",textDecoration:"none",
                  display:"inline-block",width:"fit-content",
                }}>
                  Start Check
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <style>{`
        @media (max-width:640px) {
          .nav-desktop { display:none !important; }
          .nav-mobile  { display:flex !important; }
        }
      `}</style>
    </>
  );
};

export default Navbar;