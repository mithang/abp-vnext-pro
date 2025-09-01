import { extendTheme } from 'native-base';

// Enterprise Color Palette
const colors = {
  primary: {
    50: '#e3f2fd',
    100: '#bbdefb',
    200: '#90caf9',
    300: '#64b5f6',
    400: '#42a5f5',
    500: '#2196f3', // Main primary
    600: '#1e88e5',
    700: '#1976d2',
    800: '#1565c0',
    900: '#0d47a1',
  },
  secondary: {
    50: '#f3e5f5',
    100: '#e1bee7',
    200: '#ce93d8',
    300: '#ba68c8',
    400: '#ab47bc',
    500: '#9c27b0',
    600: '#8e24aa',
    700: '#7b1fa2',
    800: '#6a1b9a',
    900: '#4a148c',
  },
  success: {
    50: '#e8f5e8',
    100: '#c8e6c9',
    200: '#a5d6a7',
    300: '#81c784',
    400: '#66bb6a',
    500: '#4caf50',
    600: '#43a047',
    700: '#388e3c',
    800: '#2e7d32',
    900: '#1b5e20',
  },
  warning: {
    50: '#fff8e1',
    100: '#ffecb3',
    200: '#ffe082',
    300: '#ffd54f',
    400: '#ffca28',
    500: '#ffc107',
    600: '#ffb300',
    700: '#ffa000',
    800: '#ff8f00',
    900: '#ff6f00',
  },
  error: {
    50: '#ffebee',
    100: '#ffcdd2',
    200: '#ef9a9a',
    300: '#e57373',
    400: '#ef5350',
    500: '#f44336',
    600: '#e53935',
    700: '#d32f2f',
    800: '#c62828',
    900: '#b71c1c',
  },
  gray: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#eeeeee',
    300: '#e0e0e0',
    400: '#bdbdbd',
    500: '#9e9e9e',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
  enterprise: {
    background: '#f8f9fa',
    surface: '#ffffff',
    border: '#e9ecef',
    text: {
      primary: '#212529',
      secondary: '#6c757d',
      muted: '#adb5bd',
    },
    shadow: 'rgba(0, 0, 0, 0.1)',
  },
};

// Typography Scale
const fontSizes = {
  '2xs': 10,
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
  '5xl': 48,
  '6xl': 60,
};

const fontWeights = {
  hairline: 100,
  thin: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
};

// Spacing Scale
const space = {
  px: '1px',
  0: 0,
  0.5: 2,
  1: 4,
  1.5: 6,
  2: 8,
  2.5: 10,
  3: 12,
  3.5: 14,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  9: 36,
  10: 40,
  12: 48,
  16: 64,
  20: 80,
  24: 96,
  32: 128,
  40: 160,
  48: 192,
  56: 224,
  64: 256,
};

// Border Radius
const radii = {
  none: 0,
  sm: 2,
  base: 4,
  md: 6,
  lg: 8,
  xl: 12,
  '2xl': 16,
  '3xl': 24,
  full: 9999,
};

// Shadows
const shadows = {
  0: 'none',
  1: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  2: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  },
  3: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  4: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  5: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
};

// Component Themes
const components = {
  Button: {
    baseStyle: {
      borderRadius: 'md',
      _text: {
        fontWeight: 'semibold',
      },
    },
    variants: {
      solid: {
        bg: 'primary.500',
        _pressed: {
          bg: 'primary.600',
        },
        _hover: {
          bg: 'primary.600',
        },
      },
      outline: {
        borderColor: 'primary.500',
        borderWidth: 1,
        _text: {
          color: 'primary.500',
        },
        _pressed: {
          bg: 'primary.50',
        },
      },
      ghost: {
        _text: {
          color: 'primary.500',
        },
        _pressed: {
          bg: 'primary.50',
        },
      },
    },
    sizes: {
      sm: {
        px: 3,
        py: 2,
        _text: {
          fontSize: 'sm',
        },
      },
      md: {
        px: 4,
        py: 3,
        _text: {
          fontSize: 'md',
        },
      },
      lg: {
        px: 6,
        py: 4,
        _text: {
          fontSize: 'lg',
        },
      },
    },
    defaultProps: {
      variant: 'solid',
      size: 'md',
    },
  },
  Input: {
    baseStyle: {
      borderRadius: 'md',
      borderColor: 'gray.300',
      bg: 'white',
      _focus: {
        borderColor: 'primary.500',
        bg: 'white',
      },
      _invalid: {
        borderColor: 'error.500',
      },
    },
    sizes: {
      sm: {
        px: 3,
        py: 2,
        fontSize: 'sm',
      },
      md: {
        px: 4,
        py: 3,
        fontSize: 'md',
      },
      lg: {
        px: 4,
        py: 4,
        fontSize: 'lg',
      },
    },
    defaultProps: {
      size: 'md',
    },
  },
  FormControl: {
    baseStyle: {
      _label: {
        fontSize: 'sm',
        fontWeight: 'medium',
        color: 'gray.700',
        mb: 1,
      },
      _errorMessage: {
        fontSize: 'xs',
        color: 'error.500',
        mt: 1,
      },
      _helperText: {
        fontSize: 'xs',
        color: 'gray.500',
        mt: 1,
      },
    },
  },
  Box: {
    baseStyle: {},
    variants: {
      card: {
        bg: 'white',
        borderRadius: 'lg',
        shadow: 2,
        p: 4,
      },
      surface: {
        bg: 'enterprise.surface',
        borderRadius: 'md',
        borderWidth: 1,
        borderColor: 'enterprise.border',
      },
    },
  },
};

export const enterpriseTheme = extendTheme({
  colors,
  fontSizes,
  fontWeights,
  space,
  radii,
  shadows,
  components,
});

export default enterpriseTheme;