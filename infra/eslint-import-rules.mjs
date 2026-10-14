// 1. Define all your system features and explicitly declare what they are allowed to look at
const features = [
  { name: 'auth', allowedFeatures: [] },
  { name: 'ideas', allowedFeatures: ['auth'] },
  { name: 'profile', allowedFeatures: ['auth'] },
  // Next time you clone this boilerplate, just add your new features here:
  // { name: 'billing', allowedFeatures: ['auth'] },
];

// 2. Base structural constraints (Shared utilities and App directory limits)
const baseZones = [
  {
    target: [
      './src/components/**',
      './src/config/**',
      './src/hooks/**',
      './src/lib/**',
      './src/stores/**',
      './src/types/**',
      './src/utils/**',
    ],
    from: ['./src/features/**', './src/app/**'],
    message: 'Shared utilities should not import from features or app directories.',
  },
  {
    target: './src/features/**',
    from: './src/app/**',
    message: 'Features should not import from app directory.',
  },
];

// 3. Dynamically generate the restriction zones so you don't have to write them manually
const featureNames = features.map((f) => f.name);

const featureZones = features.flatMap((feature) => {
  // Find features that this specific feature is NOT allowed to import from
  const forbiddenFeatures = featureNames.filter(
    (name) => name !== feature.name && !feature.allowedFeatures.includes(name),
  );

  if (forbiddenFeatures.length === 0) return [];

  return [
    {
      target: `./src/features/${feature.name}/**`,
      from: forbiddenFeatures.map((name) => `./src/features/${name}/**`),
      message: `The "${feature.name}" feature is only allowed to depend on: [${feature.allowedFeatures.join(', ') || 'none'}].`,
    },
  ];
});

// Combine everything into a unified array export
export const importRules = [...baseZones, ...featureZones];
