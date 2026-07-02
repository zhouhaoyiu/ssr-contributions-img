type PresetNumericInput = number | `${number}`;
type PresetWaveCenter = `${number}_${number}`;
type PresetFlatten = '0' | '1' | '2';
type PresetAnimation = 'fall' | 'wave' | 'mess' | 'spin' | 'fadeIn';

interface BasePresetConfig {
  gap: number;
  scale: number;
  weeks: number;
  dark?: boolean;
  theme?: string;
  strokeWidth?: PresetNumericInput;
  strokeColor?: string;
}

interface CalendarPresetConfig extends BasePresetConfig {
  chart: 'calendar';
}

interface Bar3dPresetConfig extends BasePresetConfig {
  chart: '3dbar';
  gradient?: boolean;
  flatten?: PresetFlatten;
  format?: '';
  quality?: number;
  animation?: PresetAnimation;
  animation_duration?: PresetNumericInput;
  animation_delay?: PresetNumericInput;
  animation_amplitude?: PresetNumericInput;
  animation_frequency?: PresetNumericInput;
  animation_wave_center?: PresetWaveCenter;
  animation_loop?: boolean;
  animation_reverse?: boolean;
}

export type PresetConfig = CalendarPresetConfig | Bar3dPresetConfig;

export const presets: ReadonlyArray<PresetConfig> = [
  {
    chart: 'calendar',
    gap: 0.6,
    scale: 2,
    weeks: 15,
    dark: false,
  },

  {
    chart: '3dbar',
    gap: 0.6,
    scale: 2,
    gradient: false,
    flatten: '0',
    format: '',
    quality: 1,
    weeks: 30,
    dark: false,
    theme: 'green',
    strokeWidth: 2,
    strokeColor: '222222',
  },

  {
    chart: '3dbar',
    gap: 0.6,
    scale: 2,
    gradient: false,
    flatten: '1',
    format: '',
    quality: 1,
    weeks: 30,
    dark: false,
    theme: 'green',
    strokeWidth: 2,
    strokeColor: '222222',
  },

  {
    chart: '3dbar',
    gap: 0.6,
    scale: 2,
    gradient: false,
    flatten: '2',
    animation: 'fall',
    animation_duration: '2',
    animation_delay: '0.005',
    weeks: 30,
    theme: 'green',
    strokeWidth: 2,
    strokeColor: '222222',
  },

  {
    chart: '3dbar',
    gap: 0.6,
    scale: 2,
    gradient: false,
    flatten: '1',
    animation: 'wave',
    animation_duration: '4',
    animation_delay: '0.06',
    animation_amplitude: 24,
    animation_frequency: '0.1',
    animation_wave_center: '0_3',
    weeks: 30,
    dark: true,
    theme: 'green',
    animation_loop: true,
    animation_reverse: false,
    strokeWidth: 2,
    strokeColor: '222222',
  },

  {
    chart: '3dbar',
    gap: 0.6,
    scale: 2,
    gradient: false,
    flatten: '1',
    animation: 'wave',
    animation_duration: '1',
    animation_delay: '0.05',
    animation_amplitude: '20',
    animation_frequency: '0.5',
    animation_wave_center: '0_0',
    weeks: 30,
    dark: true,
    theme: 'green',
    animation_loop: true,
    animation_reverse: false,
    strokeWidth: 2,
    strokeColor: '222222',
  },

  {
    chart: '3dbar',
    gap: 0.6,
    scale: 2,
    gradient: false,
    flatten: '2',
    animation: 'wave',
    animation_duration: '1',
    animation_delay: '0.05',
    animation_amplitude: '20',
    animation_frequency: '0.5',
    animation_wave_center: '10_0',
    weeks: 30,
    dark: false,
    theme: 'green',
    animation_loop: true,
    animation_reverse: false,
    strokeWidth: 2,
    strokeColor: '222222',
  },

  {
    chart: '3dbar',
    gap: 0.6,
    scale: 2,
    gradient: false,
    flatten: '1',
    animation: 'mess',
    animation_duration: '4',
    animation_delay: '0.06',
    animation_amplitude: 24,
    animation_frequency: '0.1',
    animation_wave_center: '0_3',
    weeks: 30,
    dark: true,
    theme: 'green',
    animation_loop: true,
    animation_reverse: false,
    strokeWidth: 2,
    strokeColor: '222222',
  },

  {
    chart: '3dbar',
    gap: 0.35,
    scale: 2.4,
    gradient: true,
    flatten: '0',
    animation: 'wave',
    animation_duration: '2.8',
    animation_delay: '0.035',
    animation_amplitude: 18,
    animation_frequency: '0.08',
    animation_wave_center: '12_3',
    weeks: 36,
    dark: true,
    theme: 'laser_grid',
    animation_loop: true,
    animation_reverse: false,
    strokeWidth: 1.4,
    strokeColor: '050817',
  },

  {
    chart: '3dbar',
    gap: 0.45,
    scale: 1.7,
    gradient: true,
    flatten: '2',
    animation: 'spin',
    animation_duration: '1.4',
    animation_delay: '0.01',
    weeks: 28,
    dark: true,
    theme: 'blacklight',
    animation_loop: false,
    animation_reverse: false,
    strokeWidth: 1.2,
    strokeColor: '09030f',
  },

  {
    chart: '3dbar',
    gap: 0.55,
    scale: 2,
    gradient: true,
    flatten: '1',
    animation: 'fadeIn',
    animation_duration: '1.8',
    animation_delay: '0.012',
    weeks: 32,
    dark: false,
    theme: 'prism_break',
    animation_loop: false,
    animation_reverse: false,
    strokeWidth: 1,
    strokeColor: 'ffffff',
  },

  {
    chart: '3dbar',
    gap: 0.25,
    scale: 2.8,
    gradient: false,
    flatten: '0',
    animation: 'fall',
    animation_duration: '1.2',
    animation_delay: '0.008',
    weeks: 40,
    dark: true,
    theme: 'matrix_rain',
    animation_loop: false,
    animation_reverse: false,
    strokeWidth: 1,
    strokeColor: '001a0d',
  },

  {
    chart: 'calendar',
    gap: 0.6,
    scale: 2,
    weeks: 40,
    dark: true,
    theme: 'solar_flare',
  },

  {
    chart: '3dbar',
    gap: 0.4,
    scale: 2.1,
    gradient: true,
    flatten: '2',
    animation: 'mess',
    animation_duration: '3',
    animation_delay: '0.04',
    animation_amplitude: 20,
    animation_frequency: '0.12',
    animation_wave_center: '8_3',
    weeks: 30,
    dark: true,
    theme: 'ocean_reactor',
    animation_loop: true,
    animation_reverse: true,
    strokeWidth: 1.4,
    strokeColor: '06111f',
  },
];
