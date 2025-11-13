// Generate unique avatar SVG based on name
export const generateAvatar = (name, size = 100) => {
  const colors = [
    ['#667eea', '#764ba2'], // Purple gradient
    ['#f093fb', '#f5576c'], // Pink gradient
    ['#4facfe', '#00f2fe'], // Blue gradient
    ['#43e97b', '#38f9d7'], // Green gradient
    ['#fa709a', '#fee140'], // Orange gradient
    ['#30cfd0', '#330867'], // Teal gradient
    ['#a8edea', '#fed6e3'], // Light gradient
    ['#ff9a9e', '#fecfef'], // Pastel gradient
  ];

  // Generate consistent color based on name
  const nameValue = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const colorPair = colors[nameValue % colors.length];
  
  // Get initials
  const initials = name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return `data:image/svg+xml,${encodeURIComponent(`
    <svg width="${size}" height="${size}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad-${nameValue}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${colorPair[0]};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${colorPair[1]};stop-opacity:1" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="50" fill="url(#grad-${nameValue})" />
      <text x="50" y="50" text-anchor="middle" dy=".35em" font-family="Arial, sans-serif" font-size="40" font-weight="bold" fill="white">
        ${initials}
      </text>
    </svg>
  `)}`;
};

// Predefined avatars for famous personalities with proper gender styling
export const celebrityAvatars = {
  'Virat Kohli': 'https://api.dicebear.com/7.x/avataaars/svg?seed=ViratKohli&backgroundColor=1e40af&gender=male',
  'Shah Rukh Khan': 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShahRukhKhan&backgroundColor=dc2626&gender=male',
  'Rohit Sharma': 'https://api.dicebear.com/7.x/avataaars/svg?seed=RohitSharma&backgroundColor=0891b2&gender=male',
  'MS Dhoni': 'https://api.dicebear.com/7.x/avataaars/svg?seed=MSDhoni&backgroundColor=eab308&gender=male',
  'Ranveer Singh': 'https://api.dicebear.com/7.x/avataaars/svg?seed=RanveerSingh&backgroundColor=c026d3&gender=male',
  'Deepika Padukone': 'https://api.dicebear.com/7.x/avataaars/svg?seed=DeepikaPadukone&backgroundColor=ec4899&gender=female',
  'Alia Bhatt': 'https://api.dicebear.com/7.x/avataaars/svg?seed=AliaBhatt&backgroundColor=f97316&gender=female',
  'Amitabh Bachchan': 'https://api.dicebear.com/7.x/avataaars/svg?seed=AmitabhBachchan&backgroundColor=475569&gender=male',
  'Priyanka Chopra': 'https://api.dicebear.com/7.x/avataaars/svg?seed=PriyankaChopra&backgroundColor=a855f7&gender=female',
  'Sachin Tendulkar': 'https://api.dicebear.com/7.x/avataaars/svg?seed=SachinTendulkar&backgroundColor=059669&gender=male',
};

export default generateAvatar;
