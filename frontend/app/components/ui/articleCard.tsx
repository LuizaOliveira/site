import Image from "next/image";
import Link from "next/link";
import { Tag } from "@/app/lib/api";

interface ArticleCardProps {
  articleId: number;
  articleImg: string;
  articleTitle: string;
  tags?: Tag[];
}

export function ArticleCard({ articleId, articleImg, articleTitle, tags = [] }: ArticleCardProps) {
  return (
    <Link
      href={`/artigos/${articleId}`}
      className="bg-white hover:opacity-80 transition-opacity duration-300 block h-full"
    >
      <div className="p-0 max-w-72">
        <h4 className="text-xl font-bold text-primary mb-6 leading-snug hover:text-primary transition ">
          {articleTitle}
        </h4>

        {/* Tags do artigo */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={tag.id || index}
                className="inline-block text-sm text-gray-700 font-medium bg-gray-100 px-3 py-2 rounded-full whitespace-nowrap hover:bg-primary hover:text-white transition-colors"
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}

        {/* Fallback se não tiver tags */}
        {(!tags || tags.length === 0) && (
          <div className="flex flex-wrap gap-2">
            <span className="inline-block text-sm text-gray-500 italic bg-gray-50 px-3 py-2 rounded-full whitespace-nowrap">
              Sem tags
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}