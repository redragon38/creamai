const fs = require('fs');
const path = require('path');

console.log('🔨 Post-build script running...');

// Ensure public/data directory exists
const dataDir = path.join(process.cwd(), 'public', 'data');
const toolsFile = path.join(dataDir, 'tools.json');

if (!fs.existsSync(dataDir)) {
  console.log('📁 Creating public/data directory...');
  fs.mkdirSync(dataDir, { recursive: true });
}

// Check if tools.json exists, if not create default
if (!fs.existsSync(toolsFile)) {
  console.log('⚠️  tools.json not found, creating default...');
  const defaultTools = [];
  fs.writeFileSync(toolsFile, JSON.stringify(defaultTools, null, 2));
  console.log('✅ Default tools.json created');
} else {
  console.log('✅ tools.json found');
}

console.log('✨ Post-build script completed!');
