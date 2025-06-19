/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 3s linear infinite",
        "bounce-slow": "bounce 3s infinite",
        "pulse-slow": "pulse 3s infinite",
        "loader-fill": "loader-fill 3s ease-in-out",
        "split-left": "split-left 0.8s ease-in-out",
        "split-right": "split-right 0.8s ease-in-out",
        "form-l-vertical": "form-l-vertical 1s ease-in-out",
        "form-l-horizontal": "form-l-horizontal 1s ease-in-out",
        "zoom-in": "zoom-in 1s ease-in-out",
        "fade-in-up": "fade-in-up 0.8s ease-out",
        "zoom-vertical-focus": "zoom-vertical-focus 1.7s ease-in-out",
        "zoom-vertical-glow": "zoom-vertical-glow 1.7s ease-in-out",
        "fade-out-horizontal": "fade-out-horizontal 1.7s ease-in-out",
        "zoom-particles": "zoom-particles 1.7s ease-out",
        "zoom-overlay": "zoom-overlay 1.7s ease-in-out",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "loader-fill": {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
        "split-left": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-25%)" },
        },
        "split-right": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(25%)" },
        },
        "form-l-vertical": {
          "0%": { transform: "translateX(-25%) rotate(0deg)" },
          "100%": { transform: "translateX(-25%) rotate(-90deg) translateY(-100%) translateX(50%)" },
        },
        "form-l-horizontal": {
          "0%": { transform: "translateX(25%) rotate(0deg)" },
          "100%": { transform: "translateX(25%) translateY(100%) translateX(-50%)" },
        },
        "zoom-in": {
          "0%": { transform: "scale(1)", opacity: "1" },
          "100%": { transform: "scale(20)", opacity: "0" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "zoom-vertical-focus": {
          "0%": {
            transform: "translateX(-50%) translateY(-50%) scale(1)",
            opacity: "1",
          },
          "70%": {
            transform: "translateX(-50%) translateY(-50%) scale(3)",
            opacity: "1",
          },
          "100%": {
            transform: "translateX(-50%) translateY(-50%) scale(15)",
            opacity: "0",
          },
        },
        "zoom-vertical-glow": {
          "0%": {
            transform: "scale(1)",
            opacity: "0.5",
          },
          "50%": {
            transform: "scale(4)",
            opacity: "0.8",
          },
          "100%": {
            transform: "scale(20)",
            opacity: "0",
          },
        },
        "fade-out-horizontal": {
          "0%": {
            opacity: "1",
            transform: "translateX(-50%) translateY(-50%) translateY(24px) scale(1)",
          },
          "30%": {
            opacity: "0.3",
            transform: "translateX(-50%) translateY(-50%) translateY(24px) scale(0.8)",
          },
          "100%": {
            opacity: "0",
            transform: "translateX(-50%) translateY(-50%) translateY(24px) scale(0.5)",
          },
        },
        "zoom-particles": {
          "0%": {
            transform: "translateY(-20px) scale(0)",
            opacity: "0",
          },
          "20%": {
            transform: "translateY(-20px) scale(1)",
            opacity: "1",
          },
          "100%": {
            transform: "translateY(-200px) scale(0)",
            opacity: "0",
          },
        },
        "zoom-overlay": {
          "0%": {
            opacity: "0",
            transform: "scale(1)",
          },
          "70%": {
            opacity: "0.3",
            transform: "scale(1.2)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(2)",
          },
        },
      },
    },
  },
  plugins: [],
}
