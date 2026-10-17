import PropTypes from "prop-types";
import { productType } from "../types/product";
import { useState } from "react";
import Icon from "./Icon";

function ToyArt({ kind }) {
  return (
    <svg viewBox="0 0 220 220" className="toy-art" aria-hidden="true">
      <ellipse cx="110" cy="183" rx="70" ry="8" fill="#344b5a" opacity=".08" />
      {kind === "bear" ? (
        <g fill="#b58a64">
          <circle cx="72" cy="61" r="22" />
          <circle cx="148" cy="61" r="22" />
          <ellipse cx="110" cy="139" rx="49" ry="49" />
          <ellipse
            cx="63"
            cy="143"
            rx="18"
            ry="33"
            transform="rotate(25 63 143)"
          />
          <ellipse
            cx="157"
            cy="143"
            rx="18"
            ry="33"
            transform="rotate(-25 157 143)"
          />
          <ellipse cx="77" cy="179" rx="24" ry="16" />
          <ellipse cx="143" cy="179" rx="24" ry="16" />
          <circle cx="110" cy="90" r="48" />
          <ellipse cx="110" cy="106" rx="23" ry="18" fill="#e9c8a4" />
          <circle cx="92" cy="83" r="4" fill="#35302e" />
          <circle cx="128" cy="83" r="4" fill="#35302e" />
          <path d="m103 101 7 7 7-7Z" fill="#35302e" />
          <ellipse cx="110" cy="146" rx="25" ry="30" fill="#d9b28e" />
        </g>
      ) : kind === "rainbow" ? (
        <g fill="none" strokeWidth="16" strokeLinecap="round">
          <path d="M39 166v-43a71 71 0 0 1 142 0v43" stroke="#ce795d" />
          <path d="M57 166v-43a53 53 0 0 1 106 0v43" stroke="#e5b760" />
          <path d="M75 166v-43a35 35 0 0 1 70 0v43" stroke="#88a599" />
          <path d="M93 166v-43a17 17 0 0 1 34 0v43" stroke="#91b3bd" />
        </g>
      ) : kind === "train" ? (
        <g>
          <rect x="28" y="121" width="69" height="40" rx="5" fill="#567f82" />
          <rect x="48" y="88" width="43" height="44" rx="3" fill="#d5a456" />
          <rect x="56" y="96" width="26" height="23" fill="#dce8e2" />
          <rect x="30" y="102" width="13" height="25" fill="#c87457" />
          <path d="M43 88h53" stroke="#385d62" strokeWidth="7" />
          <rect x="108" y="121" width="75" height="40" rx="5" fill="#c87457" />
          <path d="M95 151h17" stroke="#675448" strokeWidth="6" />
          {[45, 80, 124, 168].map((x) => (
            <circle key={x} cx={x} cy="166" r="13" fill="#565650" />
          ))}
        </g>
      ) : kind === "puzzle" ? (
        <g>
          <rect x="38" y="47" width="144" height="135" rx="13" fill="#53628b" />
          <circle cx="112" cy="109" r="30" fill="#e1ad68" />
          <ellipse
            cx="112"
            cy="109"
            rx="56"
            ry="12"
            transform="rotate(-25 112 109)"
            fill="none"
            stroke="#d5c2af"
            strokeWidth="9"
          />
          <circle cx="65" cy="73" r="4" fill="#fff" />
          <circle cx="161" cy="147" r="3" fill="#fff" />
          <path
            d="M110 47v27m0 77v31M38 114h35m77 0h32"
            stroke="#ffffff40"
            strokeWidth="2"
          />
        </g>
      ) : kind === "dolphin" ? (
        <g fill="#72a9be">
          <path d="M40 128c2-51 79-84 117-42l32 2-25 17c-4 45-58 63-93 42l-31 25 9-32-25-13Z" />
          <path d="m103 80 17-32 16 36M105 135l-9 38 31-26" />
          <circle cx="151" cy="96" r="3" fill="#203d50" />
          <path
            d="M153 112q-14 9-25 5"
            fill="none"
            stroke="#396c83"
            strokeWidth="3"
          />
        </g>
      ) : kind === "art" ? (
        <g>
          {["#cc745c", "#e0b256", "#88a38b", "#6693ad", "#a18eae"].map(
            (color, i) => (
              <g key={color} transform={`rotate(${(i - 2) * 9} 110 170)`}>
                <path d={`M${66 + i * 18} 61l6-17 6 17Z`} fill="#d7b899" />
                <rect
                  x={66 + i * 18}
                  y="61"
                  width="12"
                  height="111"
                  rx="2"
                  fill={color}
                />
              </g>
            ),
          )}
          <path d="M48 137h137l-12 48H60Z" fill="#c99b71" />
        </g>
      ) : (
        <g>
          <rect x="38" y="122" width="61" height="60" rx="4" fill="#c97b5d" />
          <rect x="102" y="122" width="64" height="60" rx="4" fill="#d8b45f" />
          <rect x="71" y="60" width="64" height="60" rx="4" fill="#73968b" />
          <path d="m71 60 32-25 32 25Z" fill="#527c7b" />
          <path d="M38 122h61M102 122h64" stroke="#ffffff55" strokeWidth="4" />
          <text
            x="69"
            y="164"
            textAnchor="middle"
            fill="#fff7e9"
            fontSize="30"
            fontFamily="serif"
          >
            A
          </text>
          <circle cx="134" cy="151" r="15" fill="#f7e7bf" />
        </g>
      )}
    </svg>
  );
}

export default function Cover({ product, className = "", eager = false }) {
  const [failed, setFailed] = useState(false);
  if (product.type === "toy")
    return (
      <div
        className={`product-cover toy-cover ${className}`}
        style={{ background: product.color }}
      >
        <ToyArt kind={product.illustration} />
      </div>
    );
  return (
    <div
      className={`product-cover ${className}`}
      style={{ "--cover-color": product.color || "#4c7783" }}
    >
      <div
        className="cover-fallback"
        aria-hidden={Boolean(product.image && !failed)}
      >
        <span className="cover-publisher">DOLPHIN LIBRARY</span>
        <strong>{product.title}</strong>
        <Icon name="sparkles" size={38} />
        <span>{product.author}</span>
      </div>
      {product.image && !failed && (
        <img
          src={product.image}
          alt={product.title}
          loading={eager ? "eager" : "lazy"}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}

ToyArt.propTypes = { kind: PropTypes.string };
Cover.propTypes = {
  product: productType.isRequired,
  className: PropTypes.string,
  eager: PropTypes.bool,
};
