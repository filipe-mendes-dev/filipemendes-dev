import { ImageResponse } from "next/og";

import { personData } from "../data/site/person.data";
import { siteMetadata } from "../data/site/site.metadata";

export const alt = `${personData.name} portfolio preview`;
export const contentType = "image/png";
export const size = {
  width: 1200,
  height: 630,
};

const OpenGraphImage = (): ImageResponse => {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          padding: "56px",
          background:
            "linear-gradient(135deg, rgb(11 17 32) 0%, rgb(23 37 84) 45%, rgb(15 118 110) 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            border: "1px solid rgba(255, 255, 255, 0.18)",
            borderRadius: "28px",
            padding: "40px",
            background: "rgba(10, 15, 30, 0.28)",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: "28px",
              opacity: 0.82,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            {siteMetadata.description}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              maxWidth: "820px",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: "72px",
                fontWeight: 700,
                lineHeight: 1.05,
              }}
            >
              {personData.name}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: "32px",
                lineHeight: 1.35,
                color: "rgba(255, 255, 255, 0.84)",
              }}
            >
              Frontend systems, mobile product work, and implementation-focused
              case studies.
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: "24px",
              color: "rgba(255, 255, 255, 0.8)",
            }}
          >
            <div style={{ display: "flex" }}>{personData.currentStatus}</div>
            <div style={{ display: "flex" }}>filipe-mendes.dev</div>
          </div>
        </div>
      </div>
    ),
    size
  );
};

export default OpenGraphImage;
