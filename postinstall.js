import { execSync } from 'child_process';
import { platform, arch } from "os";

const dependencies = {
  'darwin-arm64': '@rollup/rollup-darwin-arm64',
  'darwin-x64': '@rollup/rollup-darwin-x64',
  'linux-arm64': '@rollup/rollup-linux-arm64-gnu',
  'linux-x64': '@rollup/rollup-linux-x64-gnu',
  // Add other platform-specific dependencies as needed
};

const key = `${platform()}-${arch()}`;
if (dependencies[key]) {
  try {
    execSync(`npm install ${dependencies[key]}`, { stdio: 'inherit' });
  } catch (error) {
    console.error(`Failed to install ${dependencies[key]}`, error);
  }
} else {
  console.log(`No platform-specific dependency for ${key}`);
}