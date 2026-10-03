type IconProps = { className?: string };

export function PhoneIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7.2 3.8h2.1l1.2 3-1.5 1a12.4 12.4 0 0 0 5.2 5.2l1-1.5 3 1.2v2.1c0 .8-.6 1.5-1.4 1.6A15.2 15.2 0 0 1 5.6 5.2c.1-.8.8-1.4 1.6-1.4Z"
      />
    </svg>
  );
}

export function PhoneMark({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="#1877F2" />
      <path
        fill="#fff"
        d="M8.1 6.6h2l1.1 2.6-1.4.9a10.8 10.8 0 0 0 4.5 4.5l.9-1.3 2.6 1.1v1.9c0 .7-.5 1.3-1.2 1.4A13.2 13.2 0 0 1 6.7 7.8c.1-.7.7-1.2 1.4-1.2Z"
      />
    </svg>
  );
}

export function WhatsAppIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M12.04 3.2A8.7 8.7 0 0 0 4.5 16.7L3.4 20.6l4-1.05A8.7 8.7 0 1 0 12.04 3.2Zm0 1.6a7.1 7.1 0 0 1 6.05 10.8 7.1 7.1 0 0 1-9.9 2.3l-.3-.18-2.37.62.63-2.3-.2-.32A7.1 7.1 0 0 1 12.04 4.8Zm-2.9 3.15c-.16 0-.42.06-.64.3-.22.25-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.72 4.2 3.7 2.08.82 2.5.66 2.95.62.45-.04 1.45-.6 1.65-1.17.2-.58.2-1.07.14-1.17-.06-.1-.22-.16-.46-.28-.24-.12-1.45-.71-1.67-.8-.22-.08-.38-.12-.54.12-.16.25-.62.8-.76.96-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.02-.37.1-.49.12-.12.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.46-.4-.4-.54-.4h-.46Z" />
    </svg>
  );
}

export function WhatsAppMark({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="#25D366" />
      <path
        fill="#fff"
        d="M12.02 5.2A6.7 6.7 0 0 0 6.2 15.5l-.85 3 3.1-.81A6.7 6.7 0 1 0 12.02 5.2Zm3.9 9.45c-.16.46-.96.88-1.34.94-.36.05-1.16.1-2.7-.58-1.97-.86-3.23-2.97-3.33-3.11-.1-.14-.82-1.1-.82-2.1 0-1 .52-1.49.7-1.69.18-.2.4-.25.53-.25h.39c.12 0 .29 0 .44.34.16.36.55 1.33.6 1.43.05.1.08.21 0 .34-.08.12-.12.2-.24.31l-.24.26c-.08.08-.17.17-.07.34.1.16.44.73 1.03 1.2.74.6 1.36.79 1.55.88.19.09.3.07.41-.05.11-.11.48-.56.61-.75.13-.19.26-.16.44-.09.18.06 1.14.54 1.34.64.2.1.33.15.38.23.05.08.05.47-.11.93Z"
      />
    </svg>
  );
}

export function CalendarIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7">
      <rect x="3.8" y="5.2" width="16.4" height="15" rx="2.6" />
      <path strokeLinecap="round" d="M3.8 9.8h16.4M8.2 3.2v3.6M15.8 3.2v3.6" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m9.2 15 2 2 3.8-3.8" />
    </svg>
  );
}

export function ArrowIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function MenuIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function ChevronLeftIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 6 9 12l6 6" />
    </svg>
  );
}

export function ChevronRightIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path strokeLinecap="round" strokeLinejoin="round" d="m9 6 6 6-6 6" />
    </svg>
  );
}

export function PinIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21s7-6.1 7-11.2A7 7 0 0 0 5 9.8C5 14.9 12 21 12 21Z"
      />
      <circle cx="12" cy="9.8" r="2.2" />
    </svg>
  );
}

export function PinMark({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#EA4335" d="M12 2.4a7.1 7.1 0 0 0-7.1 7.1c0 5.3 7.1 12.1 7.1 12.1s7.1-6.8 7.1-12.1A7.1 7.1 0 0 0 12 2.4Z" />
      <circle cx="12" cy="9.5" r="2.4" fill="#fff" />
    </svg>
  );
}

export function CloseIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path strokeLinecap="round" d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}
