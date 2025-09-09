import { RichTextBlock } from '@/types';

// Rich Text를 간단한 HTML 문자열로 변환하는 서버사이드 안전 함수
export const renderRichTextToHTML = (content: RichTextBlock[]): string => {
  if (!content || !Array.isArray(content)) {
    return '';
  }

  return content.map(block => {
    if (!block || !block.children) return '';
    
    const text = block.children
      .map((child: any) => {
        if (!child || !child.text) return '';
        
        let text = child.text;
        
        // 기본 마크업 적용
        if (child.marks && Array.isArray(child.marks)) {
          if (child.marks.includes('strong')) {
            text = `<strong>${text}</strong>`;
          }
          if (child.marks.includes('em')) {
            text = `<em>${text}</em>`;
          }
        }
        
        return text;
      })
      .join('');

    // 스타일에 따른 태그 적용
    const blockStyle = (block as any).style;
    const listItem = (block as any).listItem;
    
    if (listItem === 'bullet') {
      return `<li>${text}</li>`;
    } else if (listItem === 'number') {
      return `<li>${text}</li>`;
    } else if (blockStyle === 'h4') {
      return `<h4>${text}</h4>`;
    } else {
      return `<p>${text}</p>`;
    }
  }).join('');
};

// Rich Text를 간단한 문자열 배열로 변환 (기존 함수 개선)
export const richTextToPlainText = (content: RichTextBlock[]): string[] => {
  if (!content || !Array.isArray(content)) {
    return [];
  }

  return content.map(block => {
    if (!block || !block.children) return '';
    
    return block.children
      .map((child: any) => child?.text || '')
      .join('')
      .trim();
  }).filter(text => text.length > 0);
};

// Rich Text가 비어있는지 확인
export const isRichTextEmpty = (content: RichTextBlock[]): boolean => {
  if (!content || !Array.isArray(content) || content.length === 0) {
    return true;
  }
  
  return content.every(block => {
    if (!block || !block.children) return true;
    
    const text = block.children
      .map((child: any) => child?.text || '')
      .join('')
      .trim();
    
    return text.length === 0;
  });
};



