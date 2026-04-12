// MarkdownArticle.tsx
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import remarkDirective from 'remark-directive';
import { visit } from 'unist-util-visit';
import YAML from 'yaml';
import './MarkdownArticle.css';

interface MarkdownArticleProps {
  markdownFilePath: string;
}

type HeroAlign = 'left' | 'center' | 'right';

interface MarkdownHero {
  src?: string;
  alt?: string;
  width?: number;
  align?: HeroAlign;
}

interface MarkdownFrontmatter {
  title?: string;
  subtitle?: string;
  hero?: MarkdownHero;
}

function parseFrontmatter(text: string): { frontmatter: MarkdownFrontmatter; content: string } {
  const lines = text.split(/\r?\n/);
  if (lines[0]?.trim() !== '---') {
    return { frontmatter: {}, content: text };
  }

  const end = lines.slice(1).findIndex((l) => l.trim() === '---');
  if (end === -1) {
    return { frontmatter: {}, content: text };
  }

  const endIndex = end + 1; // account for slice(1)
  const yamlText = lines.slice(1, endIndex).join('\n');
  const content = lines.slice(endIndex + 1).join('\n');

  try {
    const frontmatter = (YAML.parse(yamlText) ?? {}) as MarkdownFrontmatter;
    return { frontmatter, content };
  } catch {
    return { frontmatter: {}, content: text };
  }
}

// Supports blocks like:
// :::split{img="foo.png" side="left" width="260" alt=""}
// ...markdown...
// :::
function remarkSplitDirective() {
  return (tree: any) => {
    visit(tree, (node: any) => node?.type === 'containerDirective' && node?.name === 'split', (node: any) => {
      const attrs = node.attributes || {};
      const side = (attrs.side || 'left') as string;
      const img = (attrs.img || attrs.src || '') as string;
      const width = (attrs.width || attrs.imgWidth || '') as string;
      const alt = (attrs.alt || '') as string;

      const data = node.data || (node.data = {});
      data.hName = 'div';
      data.hProperties = {
        className: ['md-split', side === 'right' ? 'md-split--right' : 'md-split--left'],
        'data-split-img': img,
        'data-split-width': width,
        'data-split-alt': alt,
      };
    });
  };
}

const MarkdownArticle: React.FC<MarkdownArticleProps> = ({ markdownFilePath }) => {
  const [frontmatter, setFrontmatter] = useState<MarkdownFrontmatter>({});
  const [markdownContent, setMarkdownContent] = useState<string>('');

  useEffect(() => {
    const fetchMarkdown = async () => {
      try {
        const response = await fetch(markdownFilePath);
        const text = await response.text();
        const parsed = parseFrontmatter(text);
        setFrontmatter(parsed.frontmatter ?? {});
        setMarkdownContent(parsed.content ?? '');
      } catch (error) {
        console.error('Error fetching markdown:', error);
      }
    };

    fetchMarkdown();
  }, [markdownFilePath]);

  const hero = frontmatter?.hero;
  const heroAlign: HeroAlign = hero?.align ?? 'center';

  const renderers = {
    // Unwrap <p><img /></p> which commonly happens when raw HTML <img> is embedded
    // inside markdown and gets treated as “phrasing content”.
    p: ({ children, node }: { children?: React.ReactNode; node?: any }) => {
      const first = node?.children?.[0];
      const isOnlyChild = (node?.children?.length ?? 0) === 1;
      const isImg = first?.type === 'element' && first?.tagName === 'img';

      if (isOnlyChild && isImg) return <>{children}</>;
      return <p>{children}</p>;
    },

    // Render the :::split container directive as a side-by-side block.
    div: ({ children, className, ...props }: any) => {
      const cn = Array.isArray(className) ? className.join(' ') : (className ?? '');
      const img = props?.['data-split-img'] as string | undefined;
      if (cn.includes('md-split') && img) {
        const widthRaw = props?.['data-split-width'] as string | undefined;
        const alt = (props?.['data-split-alt'] as string | undefined) ?? '';
        const widthNum = widthRaw ? Number(widthRaw) : undefined;

        const style = (widthNum && Number.isFinite(widthNum))
          ? ({ ['--md-split-img-width' as any]: `${widthNum}px` } as React.CSSProperties)
          : undefined;

        return (
          <div className={cn} style={style}>
            <img className="md-split-image" src={img} alt={alt} loading="lazy" />
            <div className="md-split-content">{children}</div>
          </div>
        );
      }

      return (
        <div className={cn}>
          {children}
        </div>
      );
    },

    img: ({ src, alt }: { src?: string; alt?: string }) => {
      return (
        <div className="markdown-image">
          <img src={src} alt={alt} loading="lazy" />
          {alt && <p className="caption">{alt}</p>}
        </div>
      );
    },
  };

  return (
    <div className="markdown-article flex-1 p-10">
      {hero?.src && (
        <div className={`md-hero md-hero--${heroAlign}`}>
          <img src={hero.src} alt={hero.alt ?? ''} width={hero.width} />
        </div>
      )}

      {frontmatter?.title && <h1 className="md-title">{frontmatter.title}</h1>}
      {frontmatter?.subtitle && <p className="md-subtitle">{frontmatter.subtitle}</p>}

      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkDirective, remarkSplitDirective]}
        rehypePlugins={[rehypeRaw]}
        components={renderers}
      >
        {markdownContent}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownArticle;