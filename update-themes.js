#!/usr/bin/env node
/**
 * Batch Theme Update Script
 * Updates all remaining pages with dark/light theme support
 */

const fs = require('fs');
const path = require('path');

// Color replacements for dark theme
const colorReplacements = [
  // Blue to Yellow (primary accent)
  { from: /bg-blue-600/g, to: 'bg-yellow-600 dark:bg-yellow-500' },
  { from: /bg-blue-50/g, to: 'bg-yellow-50 dark:bg-yellow-400/10' },
  { from: /bg-blue-100/g, to: 'bg-yellow-100 dark:bg-yellow-400/20' },
  { from: /text-blue-600/g, to: 'text-yellow-600 dark:text-yellow-400' },
  { from: /border-blue-/g, to: 'border-yellow-' },
  { from: /hover:bg-blue-700/g, to: 'hover:bg-yellow-700 dark:hover:bg-yellow-600' },
  { from: /hover:bg-blue-100/g, to: 'hover:bg-yellow-100 dark:hover:bg-yellow-400/30' },
  { from: /from-blue-600 to-orange-500/g, to: 'from-yellow-400 to-yellow-600' },
  { from: /from-purple-600 via-blue-600 to-orange-500/g, to: 'from-yellow-500 via-gray-600 to-gray-800 dark:from-yellow-400 dark:via-gray-500 dark:to-gray-700' },
  { from: /text-purple-600/g, to: 'text-yellow-600 dark:text-yellow-400' },
  
  // Background colors
  { from: /bg-gray-50(?![0-9])/g, to: 'bg-gray-50 dark:bg-black' },
  { from: /bg-white(?![^"]*dark:)/g, to: 'bg-white dark:bg-gray-800' },
  
  // Text colors
  { from: /text-gray-900(?![^"]*dark:)/g, to: 'text-gray-900 dark:text-white' },
  { from: /text-gray-700(?![^"]*dark:)/g, to: 'text-gray-700 dark:text-gray-300' },
  { from: /text-gray-600(?![^"]*dark:)/g, to: 'text-gray-600 dark:text-gray-400' },
  { from: /text-gray-500(?![^"]*dark:)/g, to: 'text-gray-500 dark:text-gray-400' },
  
  // Borders
  { from: /border-gray-200(?![^"]*dark:)/g, to: 'border-gray-200 dark:border-gray-700' },
  { from: /border-gray-300(?![^"]*dark:)/g, to: 'border-gray-300 dark:border-gray-600' },
  
  // Hover states
  { from: /hover:bg-gray-50(?![^"]*dark:)/g, to: 'hover:bg-gray-50 dark:hover:bg-gray-700' },
  { from: /hover:bg-gray-100(?![^"]*dark:)/g, to: 'hover:bg-gray-100 dark:hover:bg-gray-700' },
];

const filesToUpdate = [
  'src/app/outliers/page.tsx',
  'src/app/dashboard/student/page.tsx',
  'src/app/dashboard/mentor/page.tsx',
  'src/app/dashboard/admin/page.tsx',
];

console.log('🎨 Batch Theme Update Script');
console.log('=============================\n');

filesToUpdate.forEach(filePath => {
  const fullPath = path.join(process.cwd(), filePath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`❌ File not found: ${filePath}`);
    return;
  }
  
  let content = fs.readFileSync(fullPath, 'utf-8');
  let changed = false;
  
  colorReplacements.forEach(({ from, to }) => {
    if (content.match(from)) {
      content = content.replace(from, to);
      changed = true;
    }
  });
  
  if (changed) {
    fs.writeFileSync(fullPath, content, 'utf-8');
    console.log(`✅ Updated: ${filePath}`);
  } else {
    console.log(`⚠️  No changes needed: ${filePath}`);
  }
});

console.log('\n🎉 Batch update complete!');
console.log('Please check http://localhost:3001 to see the changes.');
