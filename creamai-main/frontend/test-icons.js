// Test pour vérifier les icônes disponibles
const lucide = require('lucide-react');

const iconsToTest = [
  'Grid3X3',
  'Grid3x3', 
  'Grid2X2',
  'Grid2x2',
  'Grid',
  'LayoutGrid',
  'Grip'
];

console.log('Testing lucide-react icons:');
iconsToTest.forEach(iconName => {
  if (lucide[iconName]) {
    console.log(`✓ ${iconName} exists`);
  } else {
    console.log(`✗ ${iconName} NOT FOUND`);
  }
});

console.log('\nAll available Grid-related icons:');
Object.keys(lucide).filter(key => key.toLowerCase().includes('grid')).forEach(key => {
  console.log(`  - ${key}`);
});
