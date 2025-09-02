const fs = require('fs');
const path = require('path');

// GitHub Pages Jekyll이 _next 디렉토리를 무시하는 문제 해결
// _next 디렉토리를 assets으로 변경하여 정적 파일 서빙 가능하게 함

function renameNextToAssets() {
  const outDir = path.join(process.cwd(), 'out');
  const nextDir = path.join(outDir, '_next');
  const assetsDir = path.join(outDir, 'assets');
  
  try {
    // _next 디렉토리가 존재하는지 확인
    if (fs.existsSync(nextDir)) {
      console.log('🔄 _next 디렉토리를 assets로 변경 중...');
      
      // _next를 assets로 이름 변경
      fs.renameSync(nextDir, assetsDir);
      console.log('✅ _next → assets 디렉토리명 변경 완료');
      
      // HTML 파일들에서 _next 경로를 assets로 변경
      updateHtmlFiles(outDir);
      
      console.log('🎉 GitHub Pages Jekyll 우회 처리 완료!');
    } else {
      console.log('❌ _next 디렉토리를 찾을 수 없습니다.');
    }
  } catch (error) {
    console.error('❌ 오류 발생:', error.message);
  }
}

// HTML 파일들에서 _next 경로를 assets로 변경
function updateHtmlFiles(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // 하위 디렉토리 재귀 처리
      updateHtmlFiles(filePath);
    } else if (file.endsWith('.html') || file.endsWith('.txt')) {
      // HTML/TXT 파일에서 _next 경로를 assets로 변경
      let content = fs.readFileSync(filePath, 'utf8');
      const originalContent = content;
      
      // _next 경로를 assets로 전체 변경
      content = content.replace(/\/_next\//g, '/assets/');
      
      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`📝 ${file} 파일의 경로 업데이트 완료`);
      }
    }
  });
}

// 스크립트 실행
renameNextToAssets();
