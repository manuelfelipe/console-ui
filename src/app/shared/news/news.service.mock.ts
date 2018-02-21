import { Observable } from 'rxjs/Observable';
import { NewsService } from './news.service';
import { BaseRequest } from '../base-service/base-request';
import { NewsResponse } from './news-response';

class NewsServiceMock {

  getNews(request: BaseRequest): Observable<NewsResponse[]> {
    throw new Error('NewsServiceMock.getNews unimplemented');
  }

}

export const NEWS_SERVICE_MOCK_PROVIDER = {
  provide: NewsService,
  useClass: NewsServiceMock,
};
