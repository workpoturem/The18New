'use strict';

const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const buildRoot = path.join(projectRoot, 'build');
const publicRoot = path.join(projectRoot, 'public');
const siteRoot = path.resolve(projectRoot, '..', 'the18_site');

// These files are referenced by the generated HTML/manifest but are not copied by webpack.
// The source asset keeps its original filename, while the deployed filename stays canonical.
const publicFiles = [
  { source: 'apple-touch-icon.png', destination: 'apple-touch-icon.png' },
  { source: 'google-touch-icon.png.png', destination: 'google-touch-icon.png' },
  { source: 'manifest.json', destination: 'manifest.json' },
  { source: 'paddle-checkout.js', destination: 'paddle-checkout.js' },
  { source: 'preview.png', destination: 'preview.png' },
];

const protectedRootEntries = new Set(['1preview', 'studio', '.htaccess']);
let copiedBuildFileCount = 0;

function fail(message) {
  throw new Error(`[deploy] ${message}`);
}

function assertDirectory(directory, description) {
  let stats;

  try {
    stats = fs.lstatSync(directory);
  } catch (error) {
    if (error.code === 'ENOENT') {
      fail(`${description} not found: ${directory}.`);
    }

    throw error;
  }

  if (!stats.isDirectory() || stats.isSymbolicLink()) {
    fail(`${description} must be a real directory: ${directory}.`);
  }
}

function assertNotProtected(relativePath) {
  const normalizedPath = relativePath.split(path.sep).join('/');
  const firstEntry = normalizedPath.split('/')[0];

  if (normalizedPath === '.htaccess' || protectedRootEntries.has(firstEntry)) {
    fail(`refusing to write protected hosting path: ${normalizedPath}`);
  }
}

function ensureDestinationDirectory(directory) {
  const relativeDirectory = path.relative(siteRoot, directory);
  assertNotProtected(relativeDirectory);

  if (fs.existsSync(directory)) {
    const stats = fs.lstatSync(directory);

    if (!stats.isDirectory() || stats.isSymbolicLink()) {
      fail(`destination is not a safe directory: ${directory}.`);
    }

    return;
  }

  const parent = path.dirname(directory);

  if (parent !== directory) {
    ensureDestinationDirectory(parent);
  }

  fs.mkdirSync(directory);
}

function copyFile(source, destination, relativePath) {
  assertNotProtected(relativePath);

  if (fs.existsSync(destination)) {
    const destinationStats = fs.lstatSync(destination);

    if (destinationStats.isSymbolicLink() || !destinationStats.isFile()) {
      fail(`destination is not a safe file: ${destination}.`);
    }
  }

  ensureDestinationDirectory(path.dirname(destination));
  fs.copyFileSync(source, destination);
}

function copyBuildFiles(sourceDirectory, relativeDirectory = '') {
  const entries = fs.readdirSync(sourceDirectory, { withFileTypes: true });

  for (const entry of entries) {
    const relativePath = relativeDirectory ? path.join(relativeDirectory, entry.name) : entry.name;
    const sourcePath = path.join(sourceDirectory, entry.name);
    const destinationPath = path.join(siteRoot, relativePath);

    assertNotProtected(relativePath);

    if (entry.isDirectory()) {
      ensureDestinationDirectory(destinationPath);
      copyBuildFiles(sourcePath, relativePath);
    } else if (entry.isFile()) {
      copyFile(sourcePath, destinationPath, relativePath);
      copiedBuildFileCount += 1;
    } else {
      fail(`unsupported build entry (only regular files/directories are allowed): ${sourcePath}`);
    }
  }
}

assertDirectory(buildRoot, 'production build directory');
assertDirectory(publicRoot, 'public directory');
assertDirectory(siteRoot, 'hosting site directory');

copyBuildFiles(buildRoot);

for (const { source, destination } of publicFiles) {
  const sourcePath = path.join(publicRoot, source);
  const destinationPath = path.join(siteRoot, destination);

  if (!fs.existsSync(sourcePath)) {
    fail(`required public file not found: ${sourcePath}.`);
  }

  const sourceStats = fs.lstatSync(sourcePath);

  if (!sourceStats.isFile() || sourceStats.isSymbolicLink()) {
    fail(`required public asset must be a regular file: ${sourcePath}.`);
  }

  copyFile(sourcePath, destinationPath, destination);
}

console.log(`[deploy] copied ${copiedBuildFileCount} build file(s) and ${publicFiles.length} public file(s) to ${siteRoot}`);
console.log('[deploy] existing hosting-only files and directories were preserved');
