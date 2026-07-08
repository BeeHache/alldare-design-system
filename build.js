const StyleDictionary = require('style-dictionary');
const fs = require('fs');
const path = require('path');
const s2v = require('svg2vectordrawable');

// Register custom transform to append px unit to size/spacing/borders
StyleDictionary.registerTransform({
  name: 'size/px',
  type: 'value',
  matcher: function(token) {
    return token.path && (
      (token.path[0] === 'font' && token.path[1] === 'size') ||
      token.path[0] === 'spacing' ||
      (token.path[0] === 'border' && token.path[1] === 'radius') ||
      (token.path[0] === 'border' && token.path[1] === 'width')
    );
  },
  transformer: function(token) {
    return token.value + 'px';
  }
});

// Register custom transform to append ms unit to durations
StyleDictionary.registerTransform({
  name: 'duration/ms',
  type: 'value',
  matcher: function(token) {
    return token.path && token.path[0] === 'duration';
  },
  transformer: function(token) {
    return token.value + 'ms';
  }
});

// Register custom format for Compose Object
StyleDictionary.registerFormat({
  name: 'compose/custom-object',
  formatter: function({ dictionary, file, options }) {
    let output = `package online.alldare.mobile.shared.theme

object DesignTokens {
`;
    dictionary.allTokens.forEach(token => {
      const name = token.path.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join('');
      if (token.path && token.path[0] === 'color') {
        const hex = token.value.replace('#', '').toUpperCase();
        const argb = hex.length === 6 ? `FF${hex}` : hex;
        output += `  val ${name} = 0x${argb}L\n`;
      } else if (token.path && token.path[0] === 'font' && token.path[1] === 'size') {
        output += `  val ${name} = ${token.value}.0f\n`;
      } else if (token.path && token.path[0] === 'font' && token.path[1] === 'family') {
        output += `  val ${name} = "${token.value}"\n`;
      } else if (token.path && token.path[0] === 'spacing') {
        output += `  val ${name} = ${token.value}.0f\n`;
      } else if (token.path && token.path[0] === 'border' && token.path[1] === 'radius') {
        output += `  val ${name} = ${token.value}.0f\n`;
      } else if (token.path && token.path[0] === 'border' && token.path[1] === 'width') {
        output += `  val ${name} = ${token.value}.0f\n`;
      } else if (token.path && token.path[0] === 'duration') {
        output += `  val ${name} = ${token.value}\n`;
      } else if (token.path && token.path[0] === 'string') {
        output += `  val ${name} = "${token.value}"\n`;
      }
    });

    output += `}\n`;
    return output;
  }
});

const config = {
  source: ['tokens/**/*.json'],
  platforms: {
    web: {
      transforms: ['attribute/cti', 'name/cti/kebab', 'color/css', 'size/px', 'duration/ms'],
      buildPath: '../alldare-frontend/src/assets/',
      files: [{
        destination: 'design-tokens.css',
        format: 'css/variables'
      }]
    },
    compose: {
      transforms: ['name/cti/kebab'],
      buildPath: '../alldare-mobile/shared/src/commonMain/kotlin/online/alldare/mobile/shared/theme/',
      files: [{
        destination: 'DesignTokens.kt',
        format: 'compose/custom-object'
      }]
    }
  }
};

console.log('Compiling Design Tokens...');
const sd = StyleDictionary.extend(config);
sd.buildAllPlatforms();

// Visual Assets Compilation Task
async function compileVisualAssets() {
  console.log('Compiling Visual Assets...');
  const svgsDir = path.join(__dirname, 'assets', 'svgs');
  const webDestDir = path.join(__dirname, '..', 'alldare-frontend', 'src', 'assets', 'icons');
  const mobileDestDir = path.join(__dirname, '..', 'alldare-mobile', 'androidApp', 'src', 'main', 'res', 'drawable');

  fs.mkdirSync(webDestDir, { recursive: true });
  fs.mkdirSync(mobileDestDir, { recursive: true });

  if (fs.existsSync(svgsDir)) {
    const files = fs.readdirSync(svgsDir);
    for (const file of files) {
      if (path.extname(file) === '.svg') {
        const srcPath = path.join(svgsDir, file);
        const svgContent = fs.readFileSync(srcPath, 'utf8');

        // Copy to Web
        const webDestPath = path.join(webDestDir, file);
        fs.writeFileSync(webDestPath, svgContent);
        console.log(`✔︎ Web SVG Asset: ${file}`);

        // Compile and write to Mobile
        try {
          const xmlContent = await s2v(svgContent);
          const xmlFileName = `ic_${path.basename(file, '.svg')}.xml`;
          const mobileDestPath = path.join(mobileDestDir, xmlFileName);
          fs.writeFileSync(mobileDestPath, xmlContent);
          console.log(`✔︎ Android Vector Asset: ${xmlFileName}`);
        } catch (err) {
          console.error(`✖ Failed to convert SVG to vector: ${file}`, err);
        }
      }
    }
  } else {
    console.log('No SVGs folder found. Skipping vector graphic compilation.');
  }
}

compileVisualAssets().catch(err => {
  console.error('Failed compiling assets', err);
  process.exit(1);
});
