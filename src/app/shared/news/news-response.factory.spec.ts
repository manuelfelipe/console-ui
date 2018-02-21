import { TestBed } from '@angular/core/testing';
import { NewsResponseFactory } from './news-response.factory';
import { News } from './news';
import { NEWS_RESPONSE } from './news.data';

describe('NewsResponseFactory Tests', () => {
  let responseFactory: NewsResponseFactory;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NewsResponseFactory,
      ],
    });
  });

  beforeEach(() => {
    responseFactory = new NewsResponseFactory();
  });

  it('should be instantiable', () => {
    expect(responseFactory).toBeDefined();
  });

  describe('toNews', () => {
    it('should return null when null is passed', () => {
      const response = responseFactory.toNews(null);
      expect(response).toBeNull();
    });

    it('should return correct response', () => {
      const EXPECTED: News = { /* tslint:disable max-line-length */
        id: 'news_id_1',
        title: 'Bubbles, bubbles everywhere!',
        synopsis: 'After a long time, bubbles are finally back in the water distribution machine.',
        text: 'After a long time, bubbles are finally back in the water distribution machine. After a long time, bubbles are finally back in the water distribution machine. After a long time, bubbles are finally back in the water distribution machine.',
        createdAt: new Date('2017-05-10T16:09:02.488Z'),
      };

      const response = responseFactory.toNews(NEWS_RESPONSE[0]);
      expect(response).toEqual(EXPECTED);
    });
  });

  describe('toManyNews', () => {
    it('should return [] when null is passed', () => {
      const response = responseFactory.toManyNews(null);
      expect(response).toEqual([]);
    });

    it('should return correct response', () => {
      const EXPECTED: News[] = [
        {
          id: 'news_id_1',
          title: 'Bubbles, bubbles everywhere!',
          synopsis: 'After a long time, bubbles are finally back in the water distribution machine.',
          text: 'After a long time, bubbles are finally back in the water distribution machine. After a long time, bubbles are finally back in the water distribution machine. After a long time, bubbles are finally back in the water distribution machine.',
          createdAt: new Date('2017-05-10T16:09:02.488Z')
        },
        {
          id: 'news_id_2',
          title: 'Nordelec Movement',
          synopsis: 'In November, everyone will have moved to Nordelec. Start packing!',
          text: 'In November, everyone will have moved to Nordelec. Start packing! In November, everyone will have moved to Nordelec. Start packing! In November, everyone will have moved to Nordelec. Start packing!',
          createdAt: new Date('2017-05-08T16:09:02.488Z')
        },
        {
          id: 'news_id_3',
          title: 'New TheCloud Console Coming Soon',
          synopsis: 'Same great platform, brand new user experience!',
          text: 'Same great platform, brand new user experience!',
          createdAt: new Date('2017-05-12T16:09:02.488Z')
        },
        {
          id: 'news_id_4',
          title: 'Minimum Code Coverage soon required',
          synopsis: 'In a very near future, a minimum code coverage of 70% will be required to deploy on TheCloud',
          text: 'In a very near future, a minimum code coverage of 70% will be required to deploy on TheCloud. In a very near future, a minimum code coverage of 70% will be required to deploy on TheCloud. In a very near future, a minimum code coverage of 70% will be required to deploy on TheCloud.',
          createdAt: new Date('2017-05-11T16:09:02.488Z')
        },
      ];

      const response = responseFactory.toManyNews(NEWS_RESPONSE);
      expect(response).toEqual(EXPECTED);
    });
  });

});
