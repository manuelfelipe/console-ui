import { News } from './news';
import { NewsResponse } from './news-response';

export class NewsResponseFactory {
  toNews(newsResponse: NewsResponse): News {
    if (!newsResponse) {
      return null;
    }

    return {
      id: newsResponse._id,
      title: newsResponse.title,
      synopsis: newsResponse.synopsis,
      text: newsResponse.text,
      createdAt: new Date(newsResponse.createdAt),
    };
  };

  toManyNews(news: NewsResponse[]): News[] {
    if (!news) {
      return [];
    }

    return news.map(one => this.toNews(one));
  };
}
