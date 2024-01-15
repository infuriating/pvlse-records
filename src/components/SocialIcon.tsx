import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faSoundcloud } from "@fortawesome/free-brands-svg-icons";
import React from "react";

export default function SocialIcon({ social }: { social: string }) {
  return (
    <div className="bg-muted hover:bg-muted-foreground transition-all border h-12 aspect-square rounded-full flex justify-center items-center">
      {social.includes("twitter") && (
        <FontAwesomeIcon icon={faXTwitter} className="h-6 w-6" />
      )}
      {social.includes("instagram") && (
        <FontAwesomeIcon icon={faInstagram} className="h-6 w-6" />
      )}
      {social.includes("soundcloud") && (
        <FontAwesomeIcon icon={faSoundcloud} className="h-6 w-6" />
      )}
    </div>
  );
}
