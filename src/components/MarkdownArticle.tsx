// MarkdownArticle.tsx
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './MarkdownArticle.css';

interface MarkdownArticleProps {
  markdownFilePath: string;
}

const MarkdownArticle: React.FC<MarkdownArticleProps> = ({ markdownFilePath }) => {
  const [markdownContent, setMarkdownContent] = useState<string>('');

  useEffect(() => {
    const fetchMarkdown = async () => {
      try {
        const response = await fetch(markdownFilePath);
        const text = await response.text();
        setMarkdownContent(text);
      } catch (error) {
        console.error('Error fetching markdown:', error);
      }
    };

    fetchMarkdown();
  }, [markdownFilePath]);

  const renderers = {
    img: ({ src, alt }: { src?: string; alt?: string }) => {
      return (
        <div className="float-left floating-image">
          <img src={src} alt={alt} loading="lazy" />
          {alt && <p className="caption">{alt}</p>}
        </div>
      );
    },
  };

  return (
    <div className="markdown-article flex-1 p-10">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={renderers}>
        {markdownContent}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownArticle;