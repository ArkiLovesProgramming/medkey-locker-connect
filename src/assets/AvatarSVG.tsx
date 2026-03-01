import React from 'react';

interface AvatarSVGProps {
  name: string;
  size?: number;
  className?: string;
  colors?: {
    background: string;
    text: string;
  };
}

/**
 * AvatarSVG Component
 * Generates a consistent SVG avatar based on a name string
 */
export const AvatarSVG: React.FC<AvatarSVGProps> = ({
  name,
  size = 100,
  className = '',
  colors,
}) => {
  // Generate consistent colors from name
  const getColors = (nameStr: string) => {
    const colorPalettes = [
      { background: '#0D9488', text: '#FFFFFF' }, // Teal
      { background: '#DC2626', text: '#FFFFFF' }, // Red
      { background: '#2563EB', text: '#FFFFFF' }, // Blue
      { background: '#16A34A', text: '#FFFFFF' }, // Green
      { background: '#EA580C', text: '#FFFFFF' }, // Orange
      { background: '#9333EA', text: '#FFFFFF' }, // Purple
      { background: '#DB2777', text: '#FFFFFF' }, // Pink
      { background: '#0891B2', text: '#FFFFFF' }, // Cyan
    ];

    let hash = 0;
    for (let i = 0; i < nameStr.length; i++) {
      hash = nameStr.charCodeAt(i) + ((hash << 5) - hash);
    }

    const index = Math.abs(hash) % colorPalettes.length;
    return colorPalettes[index];
  };

  const selectedColors = colors || getColors(name);

  // Get initials
  const getInitials = (nameStr: string) => {
    const parts = nameStr.trim().split(/\s+/);
    if (parts.length === 1) {
      return parts[0].substring(0, 2).toUpperCase();
    }
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const initials = getInitials(name);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background circle */}
      <circle cx="50" cy="50" r="50" fill={selectedColors.background} />

      {/* Optional decorative elements based on name hash */}
      {(() => {
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
          hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }
        const pattern = Math.abs(hash) % 5;

        switch (pattern) {
          case 1:
            return (
              <>
                <circle cx="25" cy="25" r="8" fill={selectedColors.text} opacity="0.1" />
                <circle cx="75" cy="75" r="12" fill={selectedColors.text} opacity="0.1" />
              </>
            );
          case 2:
            return (
              <>
                <rect x="15" y="15" width="20" height="20" rx="4" fill={selectedColors.text} opacity="0.1" />
                <rect x="65" y="65" width="25" height="25" rx="4" fill={selectedColors.text} opacity="0.1" />
              </>
            );
          case 3:
            return (
              <>
                <path
                  d="M 20 80 L 50 20 L 80 80 Z"
                  fill={selectedColors.text}
                  opacity="0.1"
                />
              </>
            );
          case 4:
            return (
              <>
                <circle cx="50" cy="30" r="15" fill={selectedColors.text} opacity="0.1" />
                <circle cx="30" cy="70" r="10" fill={selectedColors.text} opacity="0.1" />
                <circle cx="70" cy="70" r="10" fill={selectedColors.text} opacity="0.1" />
              </>
            );
          default:
            return null;
        }
      })()}

      {/* Initials text */}
      <text
        x="50"
        y="58"
        textAnchor="middle"
        fill={selectedColors.text}
        fontSize="40"
        fontWeight="bold"
        fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
      >
        {initials}
      </text>
    </svg>
  );
};

/**
 * AvatarWithImage Component
 * Falls back to AvatarSVG if image fails to load
 */
interface AvatarWithImageProps extends Omit<AvatarSVGProps, 'name'> {
  imageUrl?: string;
  alt: string;
}

export const AvatarWithImage: React.FC<AvatarWithImageProps> = ({
  imageUrl,
  alt,
  ...avatarProps
}) => {
  const [imageError, setImageError] = React.useState(false);

  if (!imageUrl || imageError) {
    return <AvatarSVG {...avatarProps} name={alt} />;
  }

  return (
    <img
      src={imageUrl}
      alt={alt}
      className={avatarProps.className}
      style={{
        width: avatarProps.size,
        height: avatarProps.size,
        objectFit: 'cover',
        borderRadius: '50%',
      }}
      onError={() => setImageError(true)}
    />
  );
};

// Pre-made avatar components for family members
export const SarahAvatar: React.FC<{ size?: number; className?: string }> = ({ size, className }) => (
  <AvatarSVG name="Sarah Jenkins" size={size} className={className} />
);

export const DavidAvatar: React.FC<{ size?: number; className?: string }> = ({ size, className }) => (
  <AvatarSVG name="David Jenkins" size={size} className={className} />
);

export const LilyAvatar: React.FC<{ size?: number; className?: string }> = ({ size, className }) => (
  <AvatarSVG name="Lily Jenkins" size={size} className={className} />
);

export const AllMembersAvatar: React.FC<{ size?: number; className?: string }> = ({ size, className }) => (
  <AvatarSVG name="All" size={size} className={className} />
);

export default AvatarSVG;
