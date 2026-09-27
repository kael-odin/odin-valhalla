import { getName } from "@data/personal";
import { CYAN } from "@/constants/theme";
import {
   AVATAR_SIZE,
   CARD_FILL,
   DISC_DIAMETER,
   HAIRLINE,
   MONOGRAM_SIZE,
} from "./devAvatarData";

/** 统一标识用 Kael（英文名），跳过中文名词。 */
const toInitials = (name: string) => {
   const asciiWords = name.match(/[A-Za-z]+/g);
   if (asciiWords?.length) return asciiWords[0];
   return name.trim().split(/\s+/)[0] ?? name;
};

/**
 * Static flat disc with the initials in the hero's display face and accent.
 * Nothing here moves; the ring in DevAvatar carries the only motion.
 */
const AvatarMonogram = () => {
   const initials = toInitials(getName());

   return (
      <div
         style={{
            position: "absolute",
            inset: (AVATAR_SIZE - DISC_DIAMETER) / 2,
            borderRadius: "50%",
            background: CARD_FILL,
            border: `1px solid ${HAIRLINE}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
         }}
      >
         <span
            className="display-heading"
            style={{ fontSize: MONOGRAM_SIZE, lineHeight: 1, color: CYAN }}
         >
            {initials}
         </span>
      </div>
   );
};

export default AvatarMonogram;
