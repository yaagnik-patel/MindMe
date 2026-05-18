import React from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { AlertTriangle, HandHeart, X } from "lucide-react";

const T = {
  bg: "#080808",
  surface: "#111111",
  border: "#1e1e1e",
  borderHi: "#2a2a2a",
  lime: "#c8f542",
  white: "#f0f0f0",
  muted: "#444",
  mutedHi: "#777",
  danger: "#ff4d4d",
  dangerBg: "rgba(255,77,77,.07)",
  dangerBorder: "rgba(255,77,77,.2)",
  font: "'Syne',sans-serif",
  body: "'DM Sans',sans-serif",
};

const DisclaimerModal = ({ onAccept, onDecline }) =>
  createPortal(
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999 /* FIX: Jacked up the z-index to guarantee it sits above the footer */,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        background: "rgba(0,0,0,0.75)",
        backdropFilter: "blur(10px)",
        overflowY:
          "auto" /* FIX: Allows the modal itself to scroll on very small mobile screens */,
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background: T.surface,
          border: `1px solid ${T.borderHi}`,
          borderRadius: "10px",
          maxWidth: "580px",
          width: "100%",
          position: "relative",
          overflow: "hidden",
          margin: "auto" /* Helps keep it centered if scrolling kicks in */,
        }}
      >
        {/* Lime top accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "2px",
            background: T.lime,
          }}
        />

        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "32px 32px 24px",
            borderBottom: `1px solid ${T.border}`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "8px",
                border: `1px solid ${T.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: T.bg,
              }}
            >
              <HandHeart size={18} color={T.lime} />
            </div>
            <div>
              <div
                style={{
                  fontFamily: T.body,
                  fontSize: "10px",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: T.mutedHi,
                  marginBottom: "4px",
                }}
              >
                Before we begin
              </div>
              <h2
                style={{
                  fontFamily: T.font,
                  fontWeight: 800,
                  fontSize: "20px",
                  color: T.white,
                  margin: 0,
                  letterSpacing: "-0.02em",
                }}
              >
                Important notice
              </h2>
            </div>
          </div>

          <button
            onClick={onDecline}
            style={{
              background: "none",
              border: `1px solid ${T.border}`,
              borderRadius: "6px",
              width: "32px",
              height: "32px",
              cursor: "pointer",
              color: T.mutedHi,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "border-color .2s,color .2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = T.borderHi;
              e.currentTarget.style.color = T.white;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = T.border;
              e.currentTarget.style.color = T.mutedHi;
            }}
          >
            <X size={14} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: "28px 32px 0" }}>
          <p
            style={{
              fontFamily: T.body,
              fontSize: "14px",
              fontWeight: 300,
              color: T.mutedHi,
              lineHeight: 1.75,
              marginBottom: "20px",
            }}
          >
            MindMe provides digital self-assessment tools for general wellness
            and self-awareness purposes only.
          </p>

          {/* Warning block */}
          <div
            style={{
              background: T.dangerBg,
              border: `1px solid ${T.dangerBorder}`,
              borderRadius: "6px",
              padding: "16px 18px",
              display: "flex",
              alignItems: "flex-start",
              gap: "12px",
              marginBottom: "20px",
            }}
          >
            <AlertTriangle
              size={16}
              color={T.danger}
              style={{ flexShrink: 0, marginTop: "1px" }}
            />
            <p
              style={{
                fontFamily: T.body,
                fontSize: "13px",
                color: "#ffaaaa",
                lineHeight: 1.65,
                fontWeight: 400,
                margin: 0,
              }}
            >
              This is{" "}
              <strong style={{ color: T.danger }}>not a substitute</strong> for
              professional medical advice, diagnosis, or treatment. Never
              disregard professional medical advice or delay seeking it because
              of something you read here.
            </p>
          </div>

          <p
            style={{
              fontFamily: T.body,
              fontSize: "13px",
              fontWeight: 300,
              color: T.mutedHi,
              lineHeight: 1.7,
              marginBottom: "28px",
            }}
          >
            By continuing, you acknowledge that this platform does not provide
            medical services. Your data remains strictly local on your device —
            nothing is sent anywhere.
          </p>
        </div>

        {/* Actions */}
        <div
          style={{
            padding: "20px 32px 28px",
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            justifyContent: "flex-end",
            borderTop: `1px solid ${T.border}`,
          }}
        >
          <button
            onClick={onDecline}
            style={{
              background: "none",
              border: `1px solid ${T.border}`,
              borderRadius: "6px",
              padding: "10px 22px",
              fontFamily: T.body,
              fontSize: "13px",
              color: T.mutedHi,
              cursor: "pointer",
              transition: "border-color .2s,color .2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = T.borderHi;
              e.currentTarget.style.color = T.white;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = T.border;
              e.currentTarget.style.color = T.mutedHi;
            }}
          >
            I Disagree
          </button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onAccept}
            style={{
              background: T.lime,
              color: T.bg,
              border: "none",
              borderRadius: "6px",
              padding: "10px 24px",
              fontFamily: T.font,
              fontSize: "12px",
              fontWeight: 800,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            I Understand & Agree
          </motion.button>
        </div>
      </motion.div>
    </div>,
    document.body,
  );

export default DisclaimerModal;
