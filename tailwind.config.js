/** @type {import('tailwindcss').Config} */
export const content = ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './globalComponents/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}', './features/**/*.{js,ts,jsx,tsx,mdx}']
export const darkMode = ['class']
export const plugins = []
export const theme = {
  extend: {
    boxShadow: {
      custom: '6.5px 13px 13px hsl(0deg 0% 0% / 0.3)',
    },
    fontFamily: {
      // sans: ['var(--roboto)'],
      lobster: ['var(--lobster)'],
    },
    colors: {
      // MAIN PROJECT COLORS
      opposite: 'var(--background-opposite)',
      background: 'var(--background)',
      backgroundDarker: 'var(--background-darker)',
      // backgroundDarker: 'var(--background-cream)',
      backgroundLighter: 'var(--background-lighter)',
      primary: 'var(--primary)',
      accentOne: 'var(--accentOne)',
      accentTwo: 'var(--accentTwo)',
      border: 'var(--accentTwo)',
      focusColor: 'var(--border-focus)',
      // buttonBorder: 'var(--accentTwo)',
      // MAIN PROJECT COLORS

      // input is ToggleMode border color
      input: 'var(--input)',
      ring: 'var(--ring)',

      // Text Color
      textColor: 'var(--textColor)',
      textHover: 'var(--textHover)',

      // SHADCN FORM SELECTOR HIGLIGHT BG COLOR
      oppositeSelector: 'var(--background-opposite-selector)',

      // Shadcn Component Colors
      warning: 'var(--warning)',
      warningForeground: 'var(--warning-foreground)',

      card: {
        DEFAULT: 'var(--card)',
        foreground: 'var(--card-foreground)',
      },
      neutral: 'var(--neutral)',

      popover: {
        DEFAULT: 'var(--background-new)',
        foreground: 'var(--strongWhite)',
      },

      primary: {
        DEFAULT: 'var(--primary)',
        foreground: 'var(--primary-foreground)',
      },

      secondary: {
        DEFAULT: 'var(--secondary)',
        foreground: 'var(--secondary-foreground)',
      },

      muted: {
        DEFAULT: 'var(--muted)',
        foreground: 'var(--muted-foreground)',
      },

      accent: {
        DEFAULT: 'var(--accent)',
        foreground: 'var(--accent-foreground)',
      },

      destructive: {
        DEFAULT: 'var(--destructive)',
        foreground: 'var(--destructive-foreground)',
      },
    },
  },
}
