const fs = require('fs');
const path = require('path');

const widgetsDir = path.join(__dirname, 'src', 'widgets');
const widgets = [
  'home', 'i18n', 'introduction', 'memoization', 'naming', 
  'reference', 'structure', 'styles', 'zod', 'creator', 'docs', 'fsd'
];

let updatedCount = 0;

widgets.forEach(widget => {
  const uiDir = path.join(widgetsDir, widget, 'ui');
  if (!fs.existsSync(uiDir)) return;
  
  const files = fs.readdirSync(uiDir).filter(f => f.endsWith('.tsx') && f !== 'index.ts' && f !== `${widget}.tsx`);
  
  files.forEach(file => {
    const filePath = path.join(uiDir, file);
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Check if it has export function
    const match = content.match(/export\s+function\s+([A-Z][a-zA-Z0-9_]*)\s*\(/);
    if (!match) return;
    
    const componentName = match[1];
    if(content.includes('withErrorBoundary')) return; // already wrapped
    
    // insert import
    const importStmt = `import { withErrorBoundary } from "@/shared/ui";`;
    const lines = content.split('\n');
    let lastImportIndex = -1;
    for(let i=0; i<lines.length; i++){
       if(lines[i].startsWith('import ')) lastImportIndex = i;
    }
    if(lastImportIndex !== -1) {
       lines.splice(lastImportIndex + 1, 0, importStmt);
    } else {
       lines.splice(1, 0, importStmt); // after "use client"
    }
    
    content = lines.join('\n');
    
    // replace `export function Name(` with `function NameComponent(`
    content = content.replace(
      new RegExp(`export\\s+function\\s+${componentName}\\s*\\(`),
      `function ${componentName}Component(`
    );
    
    // Replace the last `}` with `}\n\nexport const Name = withErrorBoundary(NameComponent);`
    const lastBraceIndex = content.lastIndexOf('}');
    if (lastBraceIndex !== -1) {
       // remove trailing newlines before replacing if any
       content = content.substring(0, lastBraceIndex) + `}\n\nexport const ${componentName} = withErrorBoundary(${componentName}Component);\n`;
       fs.writeFileSync(filePath, content, 'utf-8');
       console.log(`Updated ${widget}/ui/${file}`);
       updatedCount++;
    }
  });
});

console.log(`Total updated: ${updatedCount}`);
